class CommunitiesController < ApplicationController
  ##
  # Communities Controller Constructor
  def initialize
    @community_model = Community.new
    @member_model = Member.new
  end

  ##
  # Create community
  #
  # @return [Response]
  def create
    validation_result = validate(params, {
      'name' => 'required|max_len:50',
      'description' => 'required|max_len:150',
    })

    if !validation_result['status']
      return error(validation_result['message'])
    end

    if !check_community_name_is_available(params['name'])
      return error(I18n.t('errors.community_exists'))
    end

    created_community = @community_model.create({
      'user_id' => request.env['user_id'], 
      'name' => params['name'], 
      'description' => params['description'], 
      'members_count' => 0, 
      'logo' => '', 
      'is_closed' => false, 
    }, true)

    log("A new community (#{created_community['id']}) was created by (#{request.env['user_id']})")

    ok(CommunityResource::format(created_community), I18n.t('messages.success.create'))
  end

  ##
  # Update community
  #
  # @return [Response]
  def update
    validation_result = validate(params, {
      'community_id' => 'required',
      'name' => 'max_len:50',
      'description' => 'max_len:150',
    })

    if !validation_result['status']
      return error(validation_result['message'])
    end

    community = @community_model.query({
      'id' => params['community_id'],
      'user_id' => request.env['user_id'],
      'is_closed' => false,
    }).first

    if !community
      return error(I18n.t('errors.model_not_found'))
    end

    community_data = {}

    if params.has_key?('name')
      if !check_community_name_is_available(params['name'])
        return error(I18n.t('errors.community_exists'))
      end

      community_data['name'] = params['name']
    end

    if params.has_key?('description')
      community_data['description'] = params['description']
    end

    updated_community = @community_model.update(
      params['community_id'], 
      community_data,
      true
    )

    log("Community (#{updated_community['id']}) was updated by (#{request.env['user_id']})")

    ok(CommunityResource::format(updated_community), I18n.t('messages.success.update'))
  end

  ##
  # Delete community
  #
  # @return [Response]
  def delete
    validation_result = validate(params, {
      'community_id' => 'required',
    })

    if !validation_result['status']
      return error(validation_result['message'])
    end

    community = @community_model.query({
      'id' => params['community_id'],
      'user_id' => request.env['user_id'],
      'is_closed' => false,
    }).first

    if !community
      return error(I18n.t('errors.model_not_found'))
    end

    deleted_community = @community_model.update(
      params['community_id'], 
      {'is_closed' => true}
    )

    log("Community (#{params['community_id']}) was deleted by (#{request.env['user_id']})")

    ok({}, I18n.t('messages.success.delete'))
  end

  ##
  # Join community
  #
  # @return [Response]
  def join
    validation_result = validate(params, {
      'community_id' => 'required',
    })

    if !validation_result['status']
      return error(validation_result['message'])
    end

    community = @community_model.find(params['community_id'])

    if !community
      return error(I18n.t('errors.model_not_found'))
    end

    if community['user_id'] == request.env['user_id']
      return error(I18n.t('errors.user_is_community_master'))
    end

    if community['is_closed']
      return error(I18n.t('errors.community_closed'))
    end
    
    member = @member_model.query({
      'community_id' => params['community_id'],
      'user_id' => request.env['user_id'],
    }).first

    if member
      return error(I18n.t('errors.user_already_member'))
    end

    created_member = @member_model.create({
      'community_id' => params['community_id'],
      'user_id' => request.env['user_id'],
    })

    update_community_members_count = @community_model.update(
      params['community_id'], 
      {'members_count' => community['members_count'].to_i + 1}
    )

    log("User (#{request.env['user_id']}) joined community (#{params['community_id']})")

    ok({}, I18n.t('messages.communities.join'))
  end

  ##
  # Leave community
  #
  # @return [Response]
  def leave
    validation_result = validate(params, {
      'community_id' => 'required',
    })

    if !validation_result['status']
      return error(validation_result['message'])
    end

    community = @community_model.find(params['community_id'])

    if !community
      return error(I18n.t('errors.model_not_found'))
    end
    
    if community['user_id'] == request.env['user_id']
      return error(I18n.t('errors.user_is_community_master'))
    end

    if community['is_closed']
      return error(I18n.t('errors.community_closed'))
    end
    
    member = @member_model.query({
      'community_id' => params['community_id'],
      'user_id' => request.env['user_id'],
    }).first

    if !member
      return error(I18n.t('errors.user_not_member'))
    end

    deleted_member = @member_model.destroy(member['id'])

    update_community_members_count = @community_model.update(
      params['community_id'], 
      {'members_count' => community['members_count'].to_i - 1}
    )

    log("User (#{request.env['user_id']}) left community (#{params['community_id']})")

    ok({}, I18n.t('messages.communities.leave'))
  end

  private

  ##
  # Check if community name is already used
  #
  # @param  [string] name
  # @return [bool] 
  def check_community_name_is_available(name)
    return @community_model.findBy('name', name).first == nil
  end
end
