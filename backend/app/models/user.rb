class User < BaseModel
  ##
  # User Model Constructor
  def initialize
    super(:users, [
      'name',
      'email',
      'password',
      'location',
      'work',
      'birth_date',
      'bio',
      'avatar',
      'is_validated',
      'is_active',
    ])
  end

  ##
  # Get posts
  #
  # @return [array]
  def posts(id)
    return has(Post, 'user_id', id)
  end

  ##
  # Get comments
  #
  # @return [array]
  def comments(id)
    return has(Comment, 'user_id', id)
  end
  
  ##
  # Get communities
  #
  # @return [array]
  def communities(id)
    return has(Community, 'user_id', id)
  end
end
