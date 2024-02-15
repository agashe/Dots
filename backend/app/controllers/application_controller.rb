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
end
