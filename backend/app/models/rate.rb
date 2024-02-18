class Rate < BaseModel
  ##
  # Rate Model Constructor
  def initialize
    super(:rates, [
      'entity',
      'entity_id',
      'user_id',
      'value',
    ])
  end
end
