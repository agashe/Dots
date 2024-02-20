#!/usr/bin/ruby

# Create new MongoDB client
client = Mongo::Client.new(['localhost:' + ENV["MONGO_DB_PORT"]],
  user: ENV["MONGO_DB_USERNAME"],
  password: ENV["MONGO_DB_PASSWORD"],
  database: ENV["MONGO_DB_NAME"],
  auth_mech: :scram,
  auth_source: 'admin'
)

# Define collections
collections = [
  'assets',
  'comments',
  'communities',
  'pages',
  'posts',
  'sessions',
  'tags',
  'users',
  'members',
  'rates',
  'logs',
]

# Create collections
collections.each do|collection|
  client.database.command(:create => collection)
end

# Print Done
puts "\033[92mAll migration completed successfully\033[0m"
