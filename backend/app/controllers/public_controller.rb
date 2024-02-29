class PublicController < ApplicationController
  ##
  # Public Controller Constructor
  def initialize
    @page_model = Page.new
    @community_model = Community.new
    @post_model = Post.new
    @tag_model = Tag.new
  end

  ##
  # Homepage
  #
  # @return [Response]
  def home
    validation_result = validate(params, {
      'page' => 'required|number|min:1',
    })
    
    if !validation_result['status']
      return error(validation_result['message'])
    end

    tags = []
    posts = []
    per_page = 10
    top_posts = []
    list_items_count = 5
    popular_communities = []

    # timeline
    posts_query = {
      'is_published' => true,
      'deleted_at' => nil
    }
    
    total_pages = (@post_model.count(posts_query).to_f / per_page).ceil()
    posts = @post_model.paginate(params['page'], per_page, posts_query)

    # top posts
    top_posts = @post_model.sort(
      list_items_count, 
      'comments_count', 
      false, 
      posts_query
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
    tags = @tag_model.get_fields(['name'])

    ok({
      'posts' => posts,
      'current_page' => params['page'],
      'per_page' => per_page,
      'pages' => total_pages,
      'top_posts' => top_posts,
      'popular_communities' => popular_communities,
      'tags' => tags,
    }, I18n.t('messages.success.load'))
  end

  ##
  # Search in posts, users and communities
  #
  # @return [Response]
  def search
    ok({}, "Data was loaded successfully")
  end

  ##
  # Load content page
  #
  # @return [Response]
  def page
    ok(@page_model.findBy('name', params['name']), I18n.t('messages.success.load'))
  end
end
