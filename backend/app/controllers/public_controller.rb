class PublicController < ApplicationController
  ##
  # Public Controller Constructor
  def initialize
    # pass
  end

  ##
  # Homepage
  #
  # @return [Response]
  def home
    ok({}, "Homepage Data was loaded successfully")
  end

  ##
  # Search in posts, users and communities
  #
  # @return [Response]
  def search
    ok({}, "Data was loaded successfully")
  end

  ##
  # Load content page
  #
  # @return [Response]
  def page
    ok(params[:title], "Data was loaded successfully")
  end
end
