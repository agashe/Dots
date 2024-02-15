class CommunitiesController < ApplicationController
  ##
  # Communities Controller Constructor
  def initialize
    # pass
  end

  ##
  # Create community
  #
  # @return [Response]
  def create
    ok({}, "Data was loaded successfully")
  end

  ##
  # Update community
  #
  # @return [Response]
  def update
    ok({}, "Data was loaded successfully")
  end

  ##
  # Delete community
  #
  # @return [Response]
  def delete
    ok(params[:title], "Data was loaded successfully")
  end

  ##
  # Join community
  #
  # @return [Response]
  def join
    ok({}, "Data was loaded successfully")
  end

  ##
  # Leave community
  #
  # @return [Response]
  def leave
    ok({}, "Data was loaded successfully")
  end

  ##
  # Update community's logo
  #
  # @return [Response]
  def update_logo
    ok(params[:title], "Data was loaded successfully")
  end

  ##
  # Delete community's logo
  #
  # @return [Response]
  def delete_logo
    ok(params[:title], "Data was loaded successfully")
  end
end
