class ApplicationController < ActionController::API
  ##
  # Return ok response
  #
  # @param  [mixed]  data
  # @param  [string] message 
  # @param  [int]    code
  # @param  [bool]   status
  # @return [Response]
  def ok(data, message = '', code = 200, status = true)  
    render json: {
      "status"  => status,
      "message" => message,
      "data"    => data
    }
  end

  ##
  # Return error response
  #
  # @param  [string] message 
  # @param  [int]    code
  # @return [Response]
  def error(message = '', code = 400)  
    render json: {
      "status"  => false,
      "message" => message,
      "data"    => ''
    },
    status: code
  end

  ##
  # Validate parameters
  #
  # @param  [HashMap] params
  # @param  [HashMap] rules
  # @return [HashMap]
  def validate(params, rules)
    error = ''
    all_good = true
    
    rules.each do |field, rule|
      conditions = rule.split("|")
      
      conditions.each do |condition|
        if condition == "required"
          if !params.has_key?(field)
            all_good = false
            error = I18n.t('errors.validation.required', field: field)
            break
          end
        elsif condition == "email"
          if !(params[field] =~ %r{^\S+@\S+\.\S+$}xi).present?
            all_good = false
            error = I18n.t('errors.validation.email')
            break
          end
        elsif condition.include? "min_len"
          # we take the length => min_len:X 
          min_len = condition.split(":")[1].to_i
          
          if params[field].length < min_len
            all_good = false
            error = I18n.t('errors.validation.min_len', 
              field: field, count: min_len)
            break
          end
        elsif condition.include? "max_len"
          # we take the length => max_len:X 
          max_len = condition.split(":")[1].to_i
          
          if params[field].length > max_len
            all_good = false
            error = I18n.t('errors.validation.max_len', 
              field: field, count: max_len)
            break
          end
        elsif condition.include? "min"
          # we take the number => min:X 
          min = condition.split(":")[1].to_i
          
          if params[field] < min
            all_good = false
            error = I18n.t('errors.validation.min', field: field, number: min)
            break
          end
        elsif condition.include? "max"
          # we take the number => max:X 
          max = condition.split(":")[1].to_i
          
          if params[field] > max
            all_good = false
            error = I18n.t('errors.validation.max', field: field, number: max)
            break
          end
        end
      end

      if !all_good
        break
      end
    end

    return {
      'status' => all_good,
      'message' => error,
    }
  end

  ##
  # Log event
  #
  # @param  [string] event 
  # @return [nil]
  def log(event)
    log_model = Log.new
    log_model.create({'event' => event})
  end
end
