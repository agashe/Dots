class AssetsController < ApplicationController
  ##
  # Assets Controller Constructor
  def initialize    
    @asset_model = Asset.new
    @user_model = User.new
    @community_model = Community.new
    @post_model = Post.new
  end

  ##
  # Upload file
  #
  # @return [Response]
  def upload
    # validation
    validation_result = validate(params, {
      'entity' => 'required',
      'entity_id' => 'required',
      'type' => 'required',
      'meta.name' => 'required',
      'meta.size' => 'required',
      'meta.mime' => 'required',
      'file' => 'required',
    })

    if !validation_result['status']
      return error(validation_result['message'])
    end

    model = check_entity_exists(params['entity'], params['entity_id'])
    
    if !model
      return error(I18n.t('errors.model_not_found'))
    end

    if !check_user_can_upload_to_entity(params['entity'], model)
      return error(I18n.t('errors.unauthorized'))
    end
    
    if !check_asset_type_is_valid_to_entity(params['entity'], params['type'])
      return error(I18n.t('errors.invalid_operation'))
    end

    # decode the asset and save the file
    begin
      path = get_file_save_path(params)
      save_base64_file(params['file'], path)
    rescue
      return error(I18n.t('errors.operation_failed'))
    end

    # save asset
    asset = @asset_model.query({
      'entity' => params['entity'],
      'entity_id' => params['entity_id'],
      'asset_type' => params['type']
    }).first

    asset_id = ''

    if !asset
      asset_id = @asset_model.create({
        'entity' => params['entity'],
        'entity_id' => params['entity_id'],
        'asset_type' => params['type'],
        'asset_name' => params['meta']['name'],
        'asset_size' => params['meta']['size'],
        'asset_mime' => params['meta']['mime'],
        'path' => path,
      })
    else
      begin
        delete_file(asset['path'])
      rescue
        return error(I18n.t('errors.operation_failed'))
      end

      asset_id = @asset_model.update(asset['id'], {
        'asset_name' => params['meta']['name'],
        'asset_size' => params['meta']['size'],
        'asset_mime' => params['meta']['mime'],
        'path' => path,
      })
    end

    # remove "public" from web route
    path = path.sub('public/', '')
    
    updated_model = update_model_data(
      params['entity'],
      params['entity_id'],
      params['type'],
      url(path)
    )

    log("A new file (#{asset_id}) was uploaded by (#{request.env['user_id']})")

    ok({
      'id' => asset_id,
      'path' => url(path),
    }, I18n.t('messages.assets.upload'))
  end

  ##
  # Delete file
  #
  # @return [Response]
  def delete
    # validation
    validation_result = validate(params, {
      'entity' => 'required',
      'entity_id' => 'required',
      'type' => 'required',
    })

    if !validation_result['status']
      return error(validation_result['message'])
    end

    model = check_entity_exists(params['entity'], params['entity_id'])
    
    if !model
      return error(I18n.t('errors.model_not_found'))
    end

    if !check_user_can_upload_to_entity(params['entity'], model)
      return error(I18n.t('errors.unauthorized'))
    end
    
    if !check_asset_type_is_valid_to_entity(params['entity'], params['type'])
      return error(I18n.t('errors.invalid_operation'))
    end

    # save asset
    asset = @asset_model.query({
      'entity' => params['entity'],
      'entity_id' => params['entity_id'],
      'asset_type' => params['type'],
    }).first

    if !asset
      return error(I18n.t('errors.model_not_found'))
    end

    # since the model will be deleted :)
    asset_id = asset['id']
    path = asset['path']

    begin
      delete_file(path)
    rescue
      return error(I18n.t('errors.operation_failed'))
    end

    deleted_asset = @asset_model.destroy(asset['id'])

    updated_model = update_model_data(
      params['entity'],
      params['entity_id'],
      params['type'],
      ''
    )

    log("A file (#{asset_id}) was deleted by (#{request.env['user_id']})")

    ok({}, I18n.t('messages.assets.delete'))
  end

  private

  ##
  # Check if the model the user requested is exists
  #
  # @param  [string] entity
  # @param  [string] entity_id
  # @return [Object] or [nil] 
  def check_entity_exists(entity, entity_id)
    if entity == 'user'
      model = @user_model.find(entity_id)
    elsif entity == 'community'
      model = @community_model.find(entity_id)
    elsif entity == 'post' 
      model = @post_model.find(entity_id)
    end

    return model != nil ? model : nil
  end

  ##
  # Check if the asset type is valid for the entity
  # so you can't for example upload logo for user profile !
  #
  # @param  [string] entity
  # @param  [string] type
  # @return [bool] 
  def check_asset_type_is_valid_to_entity(entity, type)
    valid = true

    if entity == 'user'
      if !['avatar'].include? type
        valid = false
      end
    elsif entity == 'community'
      if !['logo'].include? type
        valid = false
      end
    elsif entity == 'post' 
      if !['banner'].include? type
        valid = false
      end
    else
      valid = false
    end

    return valid
  end
  
  ##
  # Check if the user has the right to upload to the model
  #
  # @param  [string] entity
  # @param  [Object] model
  # @return [bool] 
  def check_user_can_upload_to_entity(entity, model)
    field_to_check = 'user_id'

    if entity == 'user'
      field_to_check = 'id'
    end

    return (model[field_to_check] == request.env['user_id'])
  end
  
  ##
  # Get file save path
  #
  # @param  [Hashmap] info
  # @return [string]
  def get_file_save_path(info)
    path = 'public/assets/uploads'
    file_name = info['meta']['name'] + '_' + Time.now.to_i.to_s

    if info['entity'] == 'user'
      if info['type'] == 'avatar'
        path += '/avatars'
      end
    elsif info['entity'] == 'community'
      if info['type'] == 'logo'
        path += '/logos'
      end
    elsif info['entity'] == 'post'
      if info['type'] == 'banner'
        path += '/banners'
      end
    end    

    return path + "/" + file_name + "." + info['meta']['mime'].split('/').last
  end

  ##
  # Convert base64 data into file and save it
  #
  # @param  [string] data
  # @param  [string] path
  # @return [void]
  def save_base64_file(data, path)
    File.open(path, 'wb') do |f|
      f.write(Base64.decode64(data))
    end
  end

  ##
  # Delete file
  #
  # @param  [string] path
  # @return [void]
  def delete_file(path)
    File.delete(path) if File.exist?(path)
  end

  ##
  # Update asset path on model
  #
  # @param  [string] entity
  # @param  [string] entity_id
  # @param  [string] asset_type
  # @param  [string] asset_path
  # @return [bool] 
  def update_model_data(entity, entity_id, asset_type, asset_path)
    if entity == 'user'
      model = @user_model.update(entity_id, {asset_type => asset_path})
    elsif entity == 'community'
      model = @community_model.update(entity_id, {asset_type => asset_path})
    elsif entity == 'post' 
      model = @post_model.update(entity_id, {asset_type => asset_path})
    end

    return model
  end
end
