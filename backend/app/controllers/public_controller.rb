class PublicController < ApplicationController
  ##
  # Public Controller Constructor
  def initialize
    @page_model = Page.new
    @community_model = Community.new
    @post_model = Post.new
    @tag_model = Tag.new
    @user_model = User.new
    @common_data_service = CommonDataService.new
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
    popular_communities = []
    current_page = params['page'].to_i

    # timeline
    posts_query = {
      'is_published' => true,
      'deleted_at' => nil
    }
    
    total_pages = (@post_model.count(posts_query).to_f / per_page).ceil()
    posts = @post_model.paginate(current_page, per_page, posts_query)
    top_posts, popular_communities, tags = @common_data_service.get_homepage_data

    ok({
      'posts' => PostResource::format_array(posts),
      'popular_communities' => CommunityResource::format_array(popular_communities),
      'top_posts' => PostResource::format_array(top_posts),
      'tags' => TagResource::format_array(tags),
      'current_page' => current_page,
      'per_page' => per_page,
      'pages' => total_pages,
    }, I18n.t('messages.success.load'))
  end

  ##
  # Search in posts, users and communities
  #
  # @return [Response]
  def search
    validation_result = validate(params, {
      'entity' => 'required',
      'keyword' => 'required',
      'page' => 'required|number|min:1',
    })
    
    if !validation_result['status']
      return error(validation_result['message'])
    end

    results = []
    per_page = 10
    current_page = params['page'].to_i

    # search results
    if params['entity'] == 'post'
      posts_query = {
        'is_published' => true,
        'deleted_at' => nil,
        'title' => {'$regex' => params['keyword']}
      }
      
      total_pages = (@post_model.count(posts_query).to_f / per_page).ceil()
      posts = @post_model.paginate(current_page, per_page, posts_query)
      results = PostResource::format_array(posts)
    elsif params['entity'] == 'user'
      user_query = {
        'is_active' => true,
        'name' => {'$regex' => params['keyword']}
      }
      
      total_pages = (@user_model.count(user_query).to_f / per_page).ceil()
      users = @user_model.paginate(current_page, per_page, user_query)
      results = UserResource::format_array(users)
    elsif params['entity'] == 'community'
      communities_query = {
        'is_closed' => false,
        'name' => {'$regex' => params['keyword']}
      }
      
      total_pages = (@community_model.count(communities_query).to_f / per_page).ceil()
      communities = @community_model.paginate(current_page, per_page, communities_query)
      results = CommunityResource::format_array(communities)
    else
      return error(I18n.t('errors.invalid_operation'))
    end
    
    top_posts, popular_communities, tags = @common_data_service.get_homepage_data

    ok({
      'entity' => params['entity'],
      'results' => results,
      'current_page' => current_page,
      'per_page' => per_page,
      'pages' => total_pages,
      'popular_communities' => CommunityResource::format_array(popular_communities),
      'top_posts' => PostResource::format_array(top_posts),
      'tags' => TagResource::format_array(tags),
    }, I18n.t('messages.success.load'))
  end

  ##
  # Load content page
  #
  # @return [Response]
  def page
    ok(
      PageResource::format(@page_model.findBy('name', params['name']).first),
      I18n.t('messages.success.load')
    )
  end
end
