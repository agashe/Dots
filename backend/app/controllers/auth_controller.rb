class AuthController < ApplicationController
  ##
  # Auth Controller Constructor
  def initialize
    @user_model = User.new
    @session_model = Session.new
  end

  ##
  # Sign in user
  #
  # @return [Response] 
  def sign_in
    # validation
    validation_result = validate(params, {
      'email' => 'required|email',
      'password' => 'required',
    })

    if !validation_result['status']
      return error(validation_result['message'])
    end

    # check if account is exists
    user = @user_model.findBy('email', params[:email]).first    

    if !user
      return error(I18n.t('errors.email_not_registered'))
    end

    if user[:password] != BCrypt::Password.new(user[:password])
      return error(I18n.t('errors.invalid_credentials'))
    end

    token = generate_secure_token(user['id'])

    log("New sign-in was successfully made by email : #{params[:email]}")

    ok({
      'id' => user['id'],
      'name' => user['name'],
      'email' => user['email'],
      'token' => token,
    }, I18n.t('messages.auth.sign_up'))
  end

  ##
  # Sign up new account
  #
  # @return [Response] 
  def sign_up
    # validation
    validation_result = validate(params, {
      'name' => 'required',
      'email' => 'required|email',
      'password' => 'required|min_len:8',
      'confirm' => 'required',
    })

    if !validation_result['status']
      return error(validation_result['message'])
    end

    if params[:password] != params[:confirm]
      return error(I18n.t('errors.password_not_confirmed'))
    end

    # check is not already exists
    user_exists = @user_model.findBy('email', params[:email]).first

    if user_exists
      return error(I18n.t('errors.email_exists'))
    end

    created = @user_model.create({
      'name' => params[:name],
      'email' => params[:email],
      'password' => BCrypt::Password.create(params[:password]),
    })

    id = @user_model.findBy('email', params[:email]).first['id']
    token = generate_secure_token(id)

    log("New account was successfully created by email : #{params[:email]}")

    ok({
      'id' => id,
      'name' => params[:name],
      'email' => params[:email],
      'token' => token,
    }, I18n.t('messages.auth.sign_up'))
  end

  private

  ##
  # Generate JWT token and save it into session
  #
  # @param  [int] user_id
  # @return [string] 
  def generate_secure_token(user_id)
    exp = Time.now.to_i + 4 * 3600
    payload = {'user_id' => user_id, 'exp' => exp}
    secret_key = Rails.application.credentials.secret_key_base
    token = JWT.encode(payload, secret_key, 'HS256')

    session = @session_model.findBy('user_id', user_id).first
    
    if session != nil
      updated = @session_model.update(user_id, {
        'token' => token,
      })
    else
      created = @session_model.create({
        'user_id' => user_id,
        'token' => token,
      })
    end

    return token
  end
end
