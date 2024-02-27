class CommentsController < ApplicationController
  ##
  # Comments Controller Constructor
  def initialize
    @comment_model = Comment.new
    @post_model = Post.new
    @rate_model = Rate.new
  end

  ##
  # Create comment
  #
  # @return [Response] 
  def create
    validation_result = validate(params, {
      'post_id' => 'required',
      'user_id' => 'required',
      'text' => 'required|max_len:200',
    })

    if !validation_result['status']
      return error(validation_result['message'])
    end

    post = @post_model.query({
      'id' => params['post_id'],
      'deleted_at' => nil,
      'is_published' => true,
    }).first

    if !post
      return error(I18n.t('errors.model_not_found'))
    end

    if params.has_key?('comment_id') && !params['comment_id'].empty?
      comment = @comment_model.query({
        'id' => params['comment_id'],
        'deleted_at' => nil,
        'is_reported' => false,
      }).first

      if !comment
        return error(I18n.t('errors.model_not_found'))
      end
    end

    created_comment = @comment_model.create({
      'post_id' => params['post_id'],
      'comment_id' => params['comment_id'],
      'user_id' => request.env['user_id'],
      'text' => params['text'],
      'rate' => 0,
      'is_reported' => false,
    })

    log("A new comment (#{created_comment}) was created by (#{request.env['user_id']})")

    ok({
      'id' => created_comment
    }, I18n.t('messages.success.create'))
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
    }).first
    end

    updated_comment = @comment_model.update(params['comment_id'], {
      'rate' => comment['rate'] + params['value'],
    })

    log("Comment (#{updated_comment['id']}) was rated by (#{request.env['user_id']})")

    ok({}, I18n.t('messages.success.rate'))
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
