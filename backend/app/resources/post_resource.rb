class PostResource < BaseResource
  ##
  # Format data to be suitable for API response
  #
  # @param  [HashMap] data
  # @return [HashMap]
  def self.format(data)
    community_model = Community.new
    user_model = User.new 
    rate_model = Rate.new 

    community = community_model.find(data['community_id'])
    user = user_model.find(data['user_id'])

    return {
      'id' => data['id'],
      'community' => CommunityResource.format(community),
      'user' => UserResource.format(user),
      'title' => data['title'],
      'text' => data['text'],
      'rate' => data['rate'],
      'tags' => data['tags'],
      'comments_count' => data['comments_count'],
      'banner' => data['banner'],
      'user_rate' => data['user_rate'],
      'is_reported' => data['is_reported'],
      'created_at' => Date.parse(data['created_at']).to_fs(:rfc822),
    }
  end
end