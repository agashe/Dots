class Community < BaseModel
  ##
  # Community Model Constructor
  def initialize
    super(:communities, [
      'user_id',
      'name',
      'description',
      'members_count',
    ])
  end
end
