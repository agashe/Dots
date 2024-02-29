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
  # @param  [string] id
  # @return [array]
  def posts(id)
    return has(Post, 'user_id', id)
  end

  ##
  # Get comments
  #
  # @param  [string] id
  # @return [array]
  def comments(id)
    return has(Comment, 'user_id', id)
  end
  
  ##
  # Get communities
  #
  # @param  [string] id
  # @return [array]
  def communities(id)
    return has(Community, 'user_id', id)
  end
  
  ##
  # Get communities that the user is a member in
  #
  # @param  [string] id
  # @return [array]
  def joined_communities(id)
    return has(Member, 'user_id', id)
  end
end
