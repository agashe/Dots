class Member < BaseModel
  ##
  # Member Model Constructor
  def initialize
    super(:members, [
      'community_id',
      'user_id',
    ])
  end
end
