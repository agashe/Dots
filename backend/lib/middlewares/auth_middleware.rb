module Middlewares
  class AuthMiddleware
    def initialize(app)
      @app = app
      @session_model = Session.new
      @user_id = nil
    end
  
    def call(env)
      request = ActionDispatch::Request.new(env)      

      # skip public and auth controllers
      if (request.fullpath.include? 'pages') || 
         (request.fullpath.include? 'sign') ||
         (request.fullpath.include? 'assets') ||
         (request.fullpath.include? 'posts/list') ||
         (request.fullpath.include? 'posts/show') ||
         (request.fullpath.include? 'search') ||
         (request.fullpath.include? 'home')
        return @app.call(env)
      end

      begin
        if !validate_secure_token(request.headers['Authorization'].split(' ').last)
          return [
            401, 
            {'Content-Type' => 'application/json'}, 
            [I18n.t('errors.unauthorized').to_json]
          ]
        end
      rescue
        return [
          401, 
          {'Content-Type' => 'application/json'}, 
          [I18n.t('errors.unauthorized').to_json]
        ]
      end

      env['user_id'] = @user_id
      @app.call(env)
    end

    private

    ##
    # Validate JWT token
    #
    # @param  [string] token
    # @return [bool] 
    def validate_secure_token(token)
      secret_key = Rails.application.credentials.secret_key_base
      data = JWT.decode(token, secret_key, 'HS256')

      session = @session_model.findBy('user_id', data[0]['user_id']).first

      if session != nil
        @user_id = data[0]['user_id']
      end

      return @user_id
    end
  end
end