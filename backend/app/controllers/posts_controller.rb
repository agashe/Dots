class PostsController < ApplicationController
  ##
  # Posts Controller Constructor
  def initialize
    @community_model = Community.new
    @post_model = Post.new
    @tag_model = Tag.new
    @member_model = Member.new
    @rate_model = Rate.new
    @comment_model = Comment.new
    @user_model = User.new
    @common_data_service = CommonDataService.new
  end

  ##
  # Show post
  #
  # @return [Response]
  def show
    validation_result = validate(params, {
      'post_id' => 'required',
      'page' => 'required|number|min:1',
    })
    
    if !validation_result['status']
      return error(validation_result['message'])
    end

    per_page = 50
    post = @post_model.find(params['post_id'])
    top_posts, popular_communities, tags = @common_data_service.get_homepage_data

    if !post
      return error(I18n.t('errors.model_not_found'))
    end

    # load parent comments (comment_id == nil)
    comments_query = {
      'post_id' => params['post_id'],
      'comment_id' =>nil
    }

    total_pages = (@comment_model.count(comments_query).to_f / per_page).ceil()
    comments = @comment_model.paginate(params['page'], per_page, comments_query)

    # show if user is among raters , obviously by fetching all raters
    # ids and send them along each comment , then the front check 
    # if user id among them

    posts_query = {
      'is_published' => true,
      'deleted_at' => nil
    }

    # check user rate
    if request.env['user_id'] != nil
      rate = @rate_model.query({
        'entity' => 'post',
        'entity_id' => post['id'],
        'user_id' => request.env['user_id'],
      }).first

      if rate != nil
        post['user_rate'] = rate['value']
      end
    end

    ok({
      'post' => PostResource::format(post), 
      'comments' => CommentResource::format_array(comments),
      'popular_communities' => CommunityResource::format_array(popular_communities),
      'top_posts' => PostResource::format_array(top_posts),
      'current_page' => params['page'],
      'per_page' => per_page,
      'pages' => total_pages,
    }, I18n.t('messages.success.load')
    )
  end
  
  ##
  # list posts based on some criteria 
  #
  # @return [Response]
  def list
    validation_result = validate(params, {
      'entity' => 'required',
      'entity_id' => 'required',
      'page' => 'required|number|min:1',
    })
    
    if !validation_result['status']
      return error(validation_result['message'])
    end

    posts = []
    entity = {}
    per_page = 10
    top_posts = []
    popular_communities = []

    posts_query = {
      'is_published' => true,
      'deleted_at' => nil
    }
    
    if params['entity'] == 'user'
      posts_query['user_id'] = params['entity_id']
      entity = UserResource::format(@user_model.find(params['entity_id']))
    elsif params['entity'] == 'community'
      community =  @community_model.findBy('name', params['entity_id']).first

      if request.env['user_id'] != nil
        community['is_member'] = false
        
        member = @member_model.query({
          'community_id' => community['id'],
          'user_id' => request.env['user_id'],
        }).first

        if member
          community['is_member'] = true
        end
      end

      entity = CommunityResource::format(community)
      posts_query['community_id'] = entity['id']
    elsif params['entity'] == 'tag'
      posts_query['tags'] = params['entity_id']
      entity = TagResource::format(
        @tag_model.findBy('name', params['entity_id']).first
      )
    else
      return error(I18n.t('errors.invalid_operation'))
    end
    
    total_pages = (@post_model.count(posts_query).to_f / per_page).ceil()
    posts = @post_model.paginate(params['page'], per_page, posts_query)
    top_posts, popular_communities, tags = @common_data_service.get_homepage_data

    ok({
      'posts' => PostResource::format_array(posts),
      'entity' => entity,
      'popular_communities' => CommunityResource::format_array(popular_communities),
      'top_posts' => PostResource::format_array(top_posts),
      'tags' => TagResource::format_array(tags),
      'current_page' => params['page'],
      'per_page' => per_page,
      'pages' => total_pages,
    }, I18n.t('messages.success.load'))
  end

  ##
  # Create post
  #
  # @return [Response]
  def create
    validation_result = validate(params, {
      'community_id' => 'required',
      'title' => 'required|max_len:100',
      'text' => 'required|max_len:500',
      'tags' => 'required',
    })

    if !validation_result['status']
      return error(validation_result['message'])
    end

    if !check_user_can_post_on_community(params['community_id'])
      return error(I18n.t('errors.invalid_operation'))
    end

    created_post = @post_model.create({
      'community_id' => params['community_id'],
      'user_id' => request.env['user_id'],
      'title' => params['title'],
      'text' => params['text'],
      'rate' => 0,
      'tags' => params['tags'],
      'comments_count' => 0,
      'banner' => '',
      'is_reported' => false,
      'is_published' => true,
    }, true)

    log("A new post (#{created_post['id']}) was created by (#{request.env['user_id']})")

    ok(PostResource::format(created_post), I18n.t('messages.success.create'))
  end

  ##
  # Update post
  #
  # @return [Response]
  def update
    validation_result = validate(params, {
      'post_id' => 'required',
      'title' => 'required|max_len:100',
      'text' => 'required|max_len:500',
      'tags' => 'required',
    })

    if !validation_result['status']
      return error(validation_result['message'])
    end

    post = @post_model.query({
      'id' => params['post_id'],
      'user_id' => request.env['user_id'],
      'deleted_at' => nil,
    }).first

    if !post
      return error(I18n.t('errors.model_not_found'))
    end

    updated_post = @post_model.update(params['post_id'], {
      'title' => params['title'],
      'text' => params['text'],
      'tags' => params['tags'],
    }, true)

    log("Post (#{updated_post['id']}) was updated by (#{request.env['user_id']})")

    ok(PostResource::format(updated_post), I18n.t('messages.success.update'))
  end

  ##
  # Delete post
  #
  # @return [Response]
  def delete
    validation_result = validate(params, {
      'post_id' => 'required'
    })

    if !validation_result['status']
      return error(validation_result['message'])
    end

    post = @post_model.query({
      'id' => params['post_id'],
      'user_id' => request.env['user_id'],
      'deleted_at' => nil,
    }).first

    if !post
      return error(I18n.t('errors.model_not_found'))
    end

    deleted_post = @post_model.delete(params['post_id'])

    log("Post (#{params['id']}) was deleted by (#{request.env['user_id']})")

    ok({}, I18n.t('messages.success.delete'))
  end

  ##
  # Rate post
  #
  # @return [Response]
  def rate
    validation_result = validate(params, {
      'post_id' => 'required',
      'value' => 'required',
    })

    if !validation_result['status']
      return error(validation_result['message'])
    end

    if (params['value'] != 1) && (params['value'] != -1)
      return error(I18n.t('errors.invalid_rate_value'))
    end

    post = @post_model.query({
      'id' => params['post_id'],
      'deleted_at' => nil,
      'is_published' => true,
    }).first

    if !post
      return error(I18n.t('errors.model_not_found'))
    end

    rate = @rate_model.query({
      'entity' => 'post',
      'entity_id' => post['id'],
      'user_id' => request.env['user_id'],
    }).first

    if rate
      return error(I18n.t('errors.already_rated'))
    else
      created_rate = @rate_model.create({
        'entity' => 'post',
        'entity_id' => post['id'],
        'user_id' => request.env['user_id'],
        'value' => params['value']
      }, true)
    end

    updated_post = @post_model.update(params['post_id'], {
      'rate' => post['rate'] + params['value'],
    }, true)

    log("Post (#{updated_post['id']}) was rated by (#{request.env['user_id']})")

    ok({
      'user_rate' => created_rate['value'],
      'post_rate' => updated_post['rate']
    }, I18n.t('messages.success.rate'))
  end

  ##
  # Report post
  #
  # @return [Response]
  def report
    # coming soon
    ok({}, "Data was loaded successfully")
  end

  ##
  # Fetch all tags
  #
  # @return [Response]
  def tags
    ok(@tag_model.sort(
      @tag_model.count, 
      'name', 
      true, 
      {
        'deleted_at' => nil
      }
    ), I18n.t('messages.success.load'))
  end

  private

  ##
  # Check if user can post on community :
  # 1- check if community exists
  # 2- check that community is not closed
  # 3- check that the user is a member/master of that community
  #
  # @param  [string] name
  # @return [bool] 
  def check_user_can_post_on_community(community_id)
    community = @community_model.query({
      'id' => community_id,
      'is_closed' => false
    }).first

    if !community
      return false
    end

    if @member_model.query({
      'community_id' => community_id,
      'user_id' => request.env['user_id']
    }).first == nil
      if community['user_id'] == request.env['user_id']
        return true
      end

      return false
    end

    return true
  end
end
