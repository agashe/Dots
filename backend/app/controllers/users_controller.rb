class UsersController < ApplicationController
  ##
  # Users Controller Constructor
  def initialize    
    @asset_model = Asset.new
    @user_model = User.new
  end

  ##
  # Load user's profile
  #
  # @return [Response]
  def profile
    user = @user_model.find(request.env['user_id'])
    
    ok({
      'id' => user['id'],
      'name' => user['name'],
      'name' => user['email'],
      'location' => user['location'],
      'work' => user['work'],
      'birth_date' => user['birth_date'],
      'bio' => user['bio'],
      'avatar' => url_for('storage/uploads/avatars/avatar2_1708844140.jpeg'),
      'data' => {
        'posts' => @user_model.posts(user['id']),
        'comments' => @user_model.comments(user['id']),
        'communities' => @user_model.communities(user['id']),
      }
    }, I18n.t('messages.users.load_profile'))
  end

  ##
  # Update user's profile
  #
  # @return [Response]
  def update_profile
    # validation
    validation_result = validate(params, {
      'name' => 'required',
      'password' => 'min_len:8',
    })

    if !validation_result['status']
      return error(validation_result['message'])
    end

    updated_data = {
      'name' => params['name'],
      'location' => params['location'],
      'work' => params['work'],
      'birth_date' => params['birth_date'],
      'bio' => params['bio'],
    }
    
    # update password 
    if params['current'] != '' && params['password'] != '' && params['confirm'] != ''
      if params['current'] != BCrypt::Password.new(user['password'])
        return error(I18n.t('errors.invalid_credentials'))
      end
      
      if params['password'] != params['confirm']
        return error(I18n.t('errors.password_not_confirmed'))
      end

      updated_data['password'] = BCrypt::Password.create(params['password'])
    end

    updated_user = @user_model.update(request.env['user_id'], updated_data, true)

    # format birth date

    ok({
      'id' => updated_user['id'],
      'name' => updated_user['name'],
      'name' => updated_user['email'],
      'location' => updated_user['location'],
      'work' => updated_user['work'],
      'birth_date' => updated_user['birth_date'],
      'bio' => updated_user['bio'],
      'avatar' => updated_user['avatar'],
    }, I18n.t('messages.users.update_profile'))
  end

  ##
  # Load user's notifications
  #
  # @return [Response]
  def notifications
    ok({}, I18n.t('messages.users.load_notifications'))
  end

  ##
  # Load communities that the user has joined
  #
  # @return [Response]
  def communities
    ok({}, I18n.t('messages.users.load_communities'))
  end

  ##
  # Load user's timeline
  #
  # @return [Response]
  def home
    ok({}, I18n.t('messages.users.load_home'))
  end
end
