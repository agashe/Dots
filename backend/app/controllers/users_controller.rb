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
  end

  ##
  # Load user's profile
  #
  # @return [Response]
  def profile
    user = @user_model.find(request.env['user_id'])
    
    ok({
      'id' => user['id'],
      'name' => user['name'],
      'email' => user['email'],
      'location' => user['location'],
      'work' => user['work'],
      'birth_date' => user['birth_date'],
      'bio' => user['bio'],
      'avatar' => url_for('storage/uploads/avatars/avatar2_1708844140.jpeg'),
      'data' => {
        'posts' => @user_model.posts(user['id']),
        'comments' => @user_model.comments(user['id']),
        'communities' => @user_model.communities(user['id']),
      }
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

    updated_user = @user_model.update(request.env['user_id'], updated_data, true)

    # format birth date

    ok({
      'id' => updated_user['id'],
      'name' => updated_user['name'],
      'email' => updated_user['email'],
      'location' => updated_user['location'],
      'work' => updated_user['work'],
      'birth_date' => updated_user['birth_date'],
      'bio' => updated_user['bio'],
      'avatar' => updated_user['avatar'],
    }, I18n.t('messages.success.update'))
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
    ok(get_user_communities(), I18n.t('messages.success.load'))
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

    tags = []
    posts = []
    per_page = 10
    top_posts = []
    list_items_count = 5
    popular_communities = []

    posts_query = {
      'is_published' => true,
      'deleted_at' => nil,
    }

    # timeline posts
    timeline_posts_query = posts_query.clone
    timeline_posts_query['community_id'] = {'$in' => get_user_communities(true)}
    total_pages = (@post_model.count(timeline_posts_query).to_f / per_page).ceil()
    posts = @post_model.paginate(params['page'], per_page, timeline_posts_query)

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

  private

  ##
  # Get communities created/joined by user
  #
  # @param  [bool] ids_only
  # @return [array]
  def get_user_communities(ids_only = false)
    communities = []
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

    @community_model.in('id', communities_ids).each do |community|
      if community['is_closed']
        next
      end

      communities.push(community)
    end

    return communities
  end
end
