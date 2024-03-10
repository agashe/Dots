class CommunityResource < BaseResource
  ##
  # Format data to be suitable for API response
  #
  # @param  [HashMap] data
  # @return [HashMap]
  def self.format(data)
    return {
      'id' => data['id'],
      'name' => data['name'],
      'description' => data['description'],
      'members_count' => data['members_count'],
      'logo' => data['logo'],
      'is_closed' => data['is_closed'],
      'is_member' => data['is_member'],
    }
  end
end