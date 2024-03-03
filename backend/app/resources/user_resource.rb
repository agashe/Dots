class UserResource < BaseResource
  ##
  # Format data to be suitable for API response
  #
  # @param  [HashMap] data
  # @return [HashMap]
  def self.format(data)
    return {
      'id' => data['id'],
      'name' => data['name'],
      'email' => data['email'],
      'location' => data['location'],
      'work' => data['work'],
      'birth_date' => data['birth_date'],
      'bio' => data['bio'],
      'avatar' => data['avatar'],
      'is_verified' => data['is_verified'],
      'is_active' => data['is_active'],
      'joined_at' => Date.parse(data['created_at']).to_fs(:rfc822),
    }
  end
end