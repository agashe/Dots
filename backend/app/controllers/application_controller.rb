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
    validator = ValidationService.new
    return validator.validate(params, rules)
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
  
  ##
  # Return full url
  #
  # @param  [string] event 
  # @return [string] or [nil]
  def url(path)
    return path != nil ? request.protocol + request.host_with_port + '/' + path : nil
  end
end
