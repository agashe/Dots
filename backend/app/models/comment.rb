class Comment < BaseModel
  ##
  # Comment Model Constructor
  def initialize
    super(:comments, [
      'post_id',
      'comment_id',
      'user_id',
      'text',
      'rate',
      'is_reported',
    ])
  end
end
