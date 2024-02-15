class AuthController < ApplicationController
  ##
  # Auth Controller Constructor
  def initialize
    # pass
  end

  ##
  # Sign in user
  #
  # @return [Response] 
  def sign_in
    ok({}, "Data was loaded successfully")
  end

  ##
  # Sign up new account
  #
  # @return [Response] 
  def sign_up

    ok(params[:title], "Data was loaded successfully")
  end

  private

  ##
  # Generate JWT token and save it into session
  #
  # @return [Response] 
  def generate_secure_token
  end

  ##
  # Validate JWT token
  #
  # @return [Response] 
  def validate_secure_token
  end
end
