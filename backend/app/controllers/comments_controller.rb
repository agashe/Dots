class CommentsController < ApplicationController
  ##
  # Comments Controller Constructor
  def initialize
    @comment_model = Comment.new
    @post_model = Post.new
    @rate_model = Rate.new
    @filters = ['popular', 'latest', 'oldest', 'unpopular']
  end

  ##
  # list comments for a post 
  #
  # @return [Response]
  def list
    validation_result = validate(params, {
      'post_id' => 'required',
      'page' => 'required|number|min:1',
    })
    
    if !validation_result['status']
      return error(validation_result['message'])
    end

    comments_sort = {'rate' => -1}
    if params['filter'] 
      if !@filters.include? params['filter']
        return error(I18n.t('errors.invalid_comments_filter', filter: params['filter']))
      end
      puts params['filter']
      case params['filter']
        when 'popular' 
          comments_sort = {'rate' => -1}
        when 'latest' 
          comments_sort = {'_id' => -1}
        when 'oldest' 
          comments_sort = {'_id' => 1}
        when 'unpopular'
          comments_sort = {'rate' => 1}
      end
    end

    comments = []
    per_page = 50
    current_page = params['page'].to_i

    # load parent comments (comment_id == nil)
    comments_query = {
      'post_id' => params['post_id'],
      'comment_id' => nil
    }

    if params['comment_id']
      comments_query['comment_id'] = params['comment_id']
    end

    total_pages = (@comment_model.count(comments_query).to_f / per_page).ceil()
    comments = @comment_model.paginate(
      current_page, 
      per_page, 
      comments_query,
      comments_sort
    )

    if request.env['user_id'] != nil
      comments_with_rates = []
      
      comments.each do |comment|
        rate = @rate_model.query({
          'entity' => 'comment',
          'entity_id' => comment['id'],
          'user_id' => request.env['user_id'],
        }).first
  
        if rate != nil
          comment['user_rate'] = rate['value']
        end

        comments_with_rates.push(comment)
      end

      comments = comments_with_rates
    end

    ok({
      'comments' => CommentResource::format_array(comments),
      'current_page' => current_page,
      'per_page' => per_page,
      'pages' => total_pages,
    }, I18n.t('messages.success.load'))
  end

  ##
  # Create comment
  #
  # @return [Response] 
  def create
    validation_result = validate(params, {
      'post_id' => 'required',
      'text' => 'required',
    })

    if !validation_result['status']
      return error(validation_result['message'])
    end

    comment_max_length = 200
    if ActionController::Base.helpers.strip_tags(params['text']).length > comment_max_length
      return error(I18n.t('errors.validation.max_len', field: 'text', count: comment_max_length))
    end

    post = @post_model.query({
      'id' => params['post_id'],
      'deleted_at' => nil,
      'is_published' => true,
    }).first

    if !post
      return error(I18n.t('errors.model_not_found'))
    end

    comment_id = nil
    if params.has_key?('comment_id') && !params['comment_id'].empty?
      comment = @comment_model.query({
        'id' => params['comment_id'],
        'deleted_at' => nil,
        'is_reported' => false,
      }).first

      if !comment
        return error(I18n.t('errors.model_not_found'))
      else
        comment_id = comment['id']
      end
    end

    created_comment = @comment_model.create({
      'post_id' => params['post_id'],
      'comment_id' => comment_id,
      'user_id' => request.env['user_id'],
      'text' => params['text'],
      'rate' => 0,
      'is_reported' => false,
    }, true)

    updated_post = @post_model.update(post['id'], {
      'comments_count' => post['comments_count'].to_i + 1
    })

    log("A new comment (#{created_comment['id']}) was created by (#{request.env['user_id']})")

    ok(CommentResource::format(created_comment), I18n.t('messages.success.create'))
  end

  ##
  # Rate comment
  #
  # @return [Response]
  def rate
    validation_result = validate(params, {
      'comment_id' => 'required',
      'value' => 'required',
    })

    if !validation_result['status']
      return error(validation_result['message'])
    end

    if (params['value'] != 1) && (params['value'] != -1)
      return error(I18n.t('errors.invalid_rate_value'))
    end

    comment = @comment_model.query({
      'id' => params['comment_id'],
      'deleted_at' => nil,
    }).first

    if !comment
      return error(I18n.t('errors.model_not_found'))
    end

    rate = @rate_model.query({
      'entity' => 'comment',
      'entity_id' => comment['id'],
      'user_id' => request.env['user_id'],
    }).first

    if rate
      return error(I18n.t('errors.already_rated'))
    else
      created_rate = @rate_model.create({
        'entity' => 'comment',
        'entity_id' => comment['id'],
        'user_id' => request.env['user_id'],
        'value' => params['value']
      }, true)
    end

    updated_comment = @comment_model.update(params['comment_id'], {
      'rate' => comment['rate'] + params['value'],
    }, true)

    log("Comment (#{updated_comment['id']}) was rated by (#{request.env['user_id']})")

    ok({
      'user_rate' => created_rate['value'],
      'comment_rate' => updated_comment['rate']
    }, I18n.t('messages.success.rate'))
  end

  ##
  # Delete comment
  #
  # @return [Response]
  def delete
    validation_result = validate(params, {
      'comment_id' => 'required'
    })

    if !validation_result['status']
      return error(validation_result['message'])
    end

    comment = @comment_model.query({
      'id' => params['comment_id'],
      'user_id' => request.env['user_id'],
      'deleted_at' => nil,
    }).first

    if !comment
      return error(I18n.t('errors.model_not_found'))
    end

    deleted_comment = @comment_model.delete(params['comment_id'])

    log("Comment (#{params['id']}) was deleted by (#{request.env['user_id']})")

    ok({}, I18n.t('messages.success.delete'))
  end

  ##
  # Report comment
  #
  # @return [Response]
  def report
    ok(params[:title], "Data was loaded successfully")
  end
end
