class CommonDataService
  ##
  # Common Data Service Constructor
  def initialize
    @community_model = Community.new
    @post_model = Post.new
    @tag_model = Tag.new
  end

  ##
  # Fetch homepage common data like (top posts , tags ... etc)
  #
  # @param  [int]  list_items_count
  # @return [array]
  def get_homepage_data(list_items_count = 5)
    # top posts
    top_posts = @post_model.sort(
      list_items_count, 
      'rate', 
      false, 
      {
        'is_published' => true,
        'deleted_at' => nil
      }
    )

    # popular communities
    popular_communities = @community_model.sort(
      list_items_count, 
      'members_count', 
      false, 
      {
        'is_closed' => false
      }
    )

    # tags    
    tags = @tag_model.sort(
      @tag_model.count, 
      'name', 
      true, 
      {
        'deleted_at' => nil
      }
    )

    return [
      top_posts,
      popular_communities,
      tags
    ]
  end
end