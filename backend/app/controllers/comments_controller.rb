class CommentsController < ApplicationController
  ##
  # Comments Controller Constructor
  def initialize
    # pass
  end

  ##
  # Create comment
  #
  # @return [Response] 
  def create
    ok({}, "Data was loaded successfully")
  end

  ##
  # Rate comment
  #
  # @return [Response]
  def rate
    ok({}, "Data was loaded successfully")
  end

  ##
  # Delete comment
  #
  # @return [Response]
  def delete
    ok(params[:title], "Data was loaded successfully")
  end

  ##
  # Report comment
  #
  # @return [Response]
  def report
    ok(params[:title], "Data was loaded successfully")
  end
end
