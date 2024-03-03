class PageResource < BaseResource
  ##
  # Format data to be suitable for API response
  #
  # @param  [HashMap] data
  # @return [HashMap]
  def self.format(data)
    return {
      'title' => data['title'],
      'text' => data['text'],
    }
  end
end