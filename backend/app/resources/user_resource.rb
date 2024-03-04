class UserResource < BaseResource
  ##
  # Format data to be suitable for API response
  #
  # @param  [HashMap] data
  # @return [HashMap]
  def self.format(data)
    post_model = Post.new
    posts_count = post_model.count({
      'is_published' => true,
      'user_id' => data['id']
    })

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
      'posts_count' => posts_count,
      'joined_at' => Date.parse(data['created_at']).to_fs(:rfc822),
    }
  end
end