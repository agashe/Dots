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
      'is_reported',
    ])
  end
end
