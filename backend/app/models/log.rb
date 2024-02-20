class Log < BaseModel
  ##
  # Log Model Constructor
  def initialize
    super(:logs, [
      'event',
    ])
  end
end
