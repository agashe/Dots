class Asset < BaseModel
  ##
  # Asset Model Constructor
  def initialize
    super(:assets, [
      'entity',
      'entity_id',
      'asset_name',
      'asset_type',
      'asset_size',
      'asset_mime',
      'path',
    ])
  end
end
