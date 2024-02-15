class Page < BaseModel
  ##
  # Page Model Constructor
  def initialize
    super(:communities, [
      'title',
      'text',
    ])
  end
end
