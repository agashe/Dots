class UsersController < ApplicationController
  ##
  # Users Controller Constructor
  def initialize    
    # pass
  end

  ##
  # Load user's profile
  #
  # @return [Response]
  def profile
    ok({}, "Profile was loaded successfully")
  end

  ##
  # Update user's profile
  #
  # @return [Response]
  def update_profile
    ok({}, "Data was loaded successfully")
  end

  ##
  # Load user's notifications
  #
  # @return [Response]
  def notifications
    ok(params[:title], "Data was loaded successfully")
  end

  ##
  # Load communities that the user has joined
  #
  # @return [Response]
  def communities
    ok({}, "Data was loaded successfully")
  end

  ##
  # Update user's avatar
  #
  # @return [Response]
  def update_avatar
    ok(params[:title], "Data was loaded successfully")
  end

  ##
  # Delete user's avatar
  #
  # @return [Response]
  def delete_avatar
    ok(params[:title], "Data was loaded successfully")
  end
end
