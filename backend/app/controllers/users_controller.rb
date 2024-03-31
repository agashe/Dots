class UsersController < ApplicationController
  ##
  # Users Controller Constructor
  def initialize    
    @asset_model = Asset.new
    @user_model = User.new
    @community_model = Community.new
    @member_model = Member.new
    @post_model = Post.new
    @tag_model = Tag.new
    @common_data_service = CommonDataService.new
  end

  ##
  # Load user's profile
  #
  # @return [Response]
  def profile
    user = @user_model.find(request.env['user_id'])
    posts = @user_model.posts(user['id'])
    comments = @user_model.comments(user['id'])
    communities = @user_model.communities(user['id'])

    ok({
      'user' => UserResource::format(user),
      'posts' => PostResource::format_array(posts),
      'comments' => CommentResource::format_array(comments),
      'communities' => CommunityResource::format_array(communities),
    }, I18n.t('messages.success.load'))
  end

  ##
  # Update user's profile
  #
  # @return [Response]
  def update_profile
    # validation
    validation_result = validate(params, {
      'name' => 'required',
      'password' => 'min_len:8',
    })

    if !validation_result['status']
      return error(validation_result['message'])
    end

    updated_data = {
      'name' => params['name'],
      'location' => params['location'],
      'work' => params['work'],
      'birth_date' => params['birth_date'],
      'bio' => params['bio'],
    }
    
    # update password 
    if params['current'] != '' && params['password'] != '' && params['confirm'] != ''
      if params['current'] != BCrypt::Password.new(user['password'])
        return error(I18n.t('errors.invalid_credentials'))
      end
      
      if params['password'] != params['confirm']
        return error(I18n.t('errors.password_not_confirmed'))
      end

      updated_data['password'] = BCrypt::Password.create(params['password'])
    end
    
    # format birth date
    if params.has_key?('birth_date')
      updated_data['birth_date'] = Date.parse(params['birth_date']).to_fs(:rfc822)
    end

    updated_user = @user_model.update(request.env['user_id'], updated_data, true)

    ok(UserResource::format(updated_user), I18n.t('messages.success.update'))
  end

  ##
  # Load user's notifications
  #
  # @return [Response]
  def notifications
    ok({}, I18n.t('messages.success.load'))
  end

  ##
  # Load communities that the user has joined or created
  #
  # @return [Response]
  def communities
    ok(
      CommunityResource::format_array(get_user_communities()),
      I18n.t('messages.success.load')
    )
  end

  ##
  # Load user's timeline
  #
  # @return [Response]
  def timeline
    validation_result = validate(params, {
      'page' => 'required|number|min:1',
    })
    
    if !validation_result['status']
      return error(validation_result['message'])
    end

    posts = []
    per_page = 10
    current_page = params['page'].to_i

    timeline_posts_query = {
      'is_published' => true,
      'deleted_at' => nil,
      # 'community_id' => {'$in' => get_user_communities(true)},
    }

    # timeline posts
    total_pages = (@post_model.count(timeline_posts_query).to_f / per_page).ceil()
    posts = @post_model.paginate(current_page, per_page, timeline_posts_query)
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

  private

  ##
  # Get communities created/joined by user
  #
  # @param  [bool] ids_only
  # @return [array]
  def get_user_communities(ids_only = false)
    communities_ids = []
      
    @member_model.findBy('user_id', request.env['user_id']).each do |member|
      communities_ids.push(member['community_id'])
    end

    @community_model.query({
      'user_id' => request.env['user_id'],
      'is_closed' => false
    }).each do |community|
      communities_ids.push(community['id'])
    end

    if ids_only
      return communities_ids
    end

    return @community_model.sort(
      communities_ids.length, 
      'name', 
      true, 
      {
        'is_closed' => false,
        'id' => {'$in': communities_ids}
      }
    )
  end
end
