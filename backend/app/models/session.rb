class Session < BaseModel
  ##
  # Session Model Constructor
  def initialize
    super(:sessions, [
      'user_id',
      'token',
    ])
  end
end
