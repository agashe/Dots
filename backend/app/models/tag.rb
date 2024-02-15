class Tag < BaseModel
  ##
  # Tag Model Constructor
  def initialize
    super(:tags, [
      'name',
    ])
  end
end
