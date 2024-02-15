class PostsController < ApplicationController
  ##
  # Posts Controller Constructor
  def initialize
    # pass
  end

  ##
  # Show post
  #
  # @return [Response]
  def show
    ok({}, "Data was loaded successfully")
  end

  ##
  # Create post
  #
  # @return [Response]
  def create
    ok({}, "Data was loaded successfully")
  end

  ##
  # Update post
  #
  # @return [Response]
  def update
    ok({}, "Data was loaded successfully")
  end

  ##
  # Delete post
  #
  # @return [Response]
  def delete
    ok(params[:title], "Data was loaded successfully")
  end

  ##
  # Lists posts by filter type (user , community or tag)
  #
  # @return [Response]
  def list
    ok({}, "Data was loaded successfully")
  end

  ##
  # Rate post
  #
  # @return [Response]
  def rate
    ok({}, "Data was loaded successfully")
  end

  ##
  # Report post
  #
  # @return [Response]
  def report
    ok(params[:title], "Data was loaded successfully")
  end

  ##
  # Fetch all tags
  #
  # @return [Response]
  def tags
    ok(params[:title], "Data was loaded successfully")
  end
  
  ##
  # Update post's banner
  #
  # @return [Response]
  def update_banner
    ok(params[:title], "Data was loaded successfully")
  end

  ##
  # Delete post's banner
  #
  # @return [Response]
  def delete_banner
    ok(params[:title], "Data was loaded successfully")
  end
end
