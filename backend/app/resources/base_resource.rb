class BaseResource
  ##
  # Format data to be suitable for API response
  #
  # @param  [HashMap] data
  # @return [HashMap]
  def self.format(data)
    raise NotImplementedError, 'The method - format - should be implemented in the resource class'
  end

  ##
  # Format array of data objects  to be suitable for API response
  #
  # @param  [array] objects
  # @return [array]
  def self.format_array(objects)
    results = []

    objects.each do |object|
      results.push(self.format(object))
    end

    return results
  end
end