module Middlewares
  class AuthMiddleware
    def initialize(app)
      @app = app
      @session_model = Session.new
    end
  
    def call(env)
      request = ActionDispatch::Request.new(env)

      if !validate_secure_token(request.headers['Authorization'].split(' ').last)
        return [401, {}, [I18n.t('errors.unauthorized')]]
      end
  
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

      return (session != nil)
    end
  end
end