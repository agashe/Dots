class Page < BaseModel
  ##
  # Page Model Constructor
  def initialize
    super(:pages, [
      'name',
      'title',
      'text',
    ])
  end
end
