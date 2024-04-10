class CommentResource < BaseResource
  ##
  # Format data to be suitable for API response
  #
  # @param  [HashMap] data
  # @return [HashMap]
  def self.format(data)
    user_model = User.new 
    user = user_model.find(data['user_id'])
    
    post_model = Post.new
    post = post_model.find(data['post_id'])

    return {
      'id' => data['id'],
      'post_id' => data['post_id'],
      'parent_comment' => data['comment_id'],
      'post_title' => post['title'],
      'user' => UserResource.format(user),
      'text' => (data['deleted_at'] != nil) ? '' : data['text'],
      'rate' => data['rate'],
      'is_reported' => data['is_reported'],
      'is_deleted' => (data['deleted_at'] != nil),
      'sub_comments' => [],
      'user_rate' => data['user_rate'],
      'created_at' => Date.parse(data['created_at']).to_fs(:rfc822),
    }
  end
end