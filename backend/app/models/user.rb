class User < BaseModel
  ##
  # User Model Constructor
  def initialize
    super(:users, [
      'name',
      'email',
      'password',
      'location',
      'work',
      'birth_date',
      'bio',
      'is_validated',
      'is_active',
    ])
  end
end
