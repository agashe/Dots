class Post < BaseModel
  ##
  # Post Model Constructor
  def initialize
    super(:posts, [
      'community_id',
      'user_id',
      'title',
      'text',
      'rate',
      'tags',
      'comments_count',
      'banner',
      'is_reported',
      'is_published',
    ])
  end
end
