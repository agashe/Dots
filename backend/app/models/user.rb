class User < BaseModel
  ##
  # User Model Constructor
  def initialize
    super(:users, [
      'name',
      'email',
      'password',
      'location',
      'work',
      'birth_date',
      'bio',
      'is_validated',
      'is_active',
    ])

    @asset_model = Asset.new
  end

  ##
  # Get avatar
  #
  # @return [string] or [nil]
  def avatar(id)
    image = @asset_model.query({
      'entity' => 'user',
      'entity_id' => id,
      'asset_type' => 'avatar',
    }).first

    return image ? image['path'] : nil
  end

  ##
  # Get posts
  #
  # @return [array]
  def posts(id)
    # image = has(Asset, 'entity_id', id).first
    # return image ? image['path'] : nil
  end
end
