#!/usr/bin/ruby

# Seed users collection
user_model = User.new 

(1..5000).each do |user|
  user_model.create({
    'name' => Faker::Name.name,
    'email' => Faker::Internet.email,
    'password' => Faker::Internet.password(min_length: 8),
    'location' => Faker::Address.country,
    'work' => Faker::Job.title,
    'birth_date' => Faker::Date.birthday(min_age: 18, max_age: 99),
    'bio' => Faker::Lorem.sentences(number: 1),
    'avatar' => '',
    'is_validated' => Faker::Boolean.boolean(true_ratio: 0.9),
    'is_active' => Faker::Boolean.boolean(true_ratio: 0.9),
  })
end

puts "\033[93mSeed users completed successfully\033[0m"

# Seed communities collection
community_model = Community.new

(1..500).each do |community|
  community_model.create({
    'user_id' => user_model.random(1).first[:id],
    'name' => Faker::String.random(length: 3..12),
    'description' => Faker::Lorem.sentences(number: 1),
    'members_count' => 0,
    'logo' => '',
    'is_closed' => Faker::Boolean.boolean(true_ratio: 0.9),
  })
end

puts "\033[93mSeed communities completed successfully\033[0m"

# Seed members collection
# for each community we select random number of members
# then we fetch this number of users and attach them as members
member_model = Member.new

community_model.all.each do |community|
  user_model.random(rand(1..1000)).each do |user|
    if member_model.query({
      user_id: user[:id], 
      community_id: community[:id]
    }).first == nil
      member_model.create({
        'user_id' => user[:id],
        'community_id' => community[:id],
      })

      community_model.update(community[:id], {
        "members_count" => community[:members_count] + 1
      })
    end
  end
end

puts "\033[93mSeed members completed successfully\033[0m"

# Seed tags collection
tag_model = Tag.new 

[
  'Travel', 'Tech', 'Science', 'Politics', 'Programming', 'Music', 'Movies',
  'History', 'Fashion', 'Art', 'Anime', 'Business', 'Cars', 'DIY', 'Food',
  'Law', 'Military', 'Place', 'Podcast', 'Reading', 'Religion', 'Pets',
  'Sports', 'Gaming',
].each do |tag|
  tag_model.create({"name" => tag})
end

puts "\033[93mSeed tags completed successfully\033[0m"

# Seed posts collection
post_model = Post.new 

(1..2000).each do |post|
  community = community_model.random(1).first
  tags = []
  
  tag_model.random(rand(1..10)).each do |tag|
    tags.push(tag[:name])
  end

  post_model.create({
    'community_id' => community[:id],
    'user_id' => community[:user_id], # just to make our life easier
    'title' => Faker::Lorem.sentences(number: 1),
    'text' => Faker::Lorem.paragraphs(number: 4),
    'rate' => 0,
    'tags' => tags,
    'comments_count' => 0,
    'banner' => '',
    'is_reported' => Faker::Boolean.boolean(true_ratio: 0.9),
    'is_published' => Faker::Boolean.boolean(true_ratio: 0.9),
  })
end

puts "\033[93mSeed posts completed successfully\033[0m"

# Seed comments collection
comment_model = Comment.new 

(1..15000).each do |comment|
  post = post_model.random(1).first[:id]

  comment_model.create({
    'post_id' => post['id'],
    'comment_id' => rand(1..10) > 5 ? 
      (comment_model.random(1).first != nil ? 
      comment_model.random(1).first[:id] : nil) : nil,
    'user_id' => user_model.random(1).first[:id],
    'text' => Faker::Lorem.sentences(number: 1),
    'rate' => 0,
    'is_reported' => Faker::Boolean.boolean(true_ratio: 0.9),
  })

  post_model.update(post['id'], {
    'comments_count' => post['comments_count'].to_i + 1
  })
end

puts "\033[93mSeed comments completed successfully\033[0m"

# Seed rates collection
rate_model = Rate.new 

# add rates to posts
post_model.random(200).each do |post|
  user_model.random(rand(1..100)).each do |user|
    if rate_model.query({
      user_id: user[:id], 
      post_id: post[:id]
    }).first == nil
      value = rand(1..10) > 5 ? 1 : -1

      rate_model.create({
        'entity' => 'post',
        'entity_id' => post[:id],
        'user_id' => user[:id],
        'value' => value
      })

      post_model.update(post[:id], {
        'rate' => post[:rate] + value
      })
    end
  end
end

# add rates to comments
comment_model.random(200).each do |comment|
  user_model.random(rand(1..100)).each do |user|
    if rate_model.query({
      user_id: user[:id], 
      comment_id: comment[:id]
    }).first == nil
      value = rand(1..10) > 5 ? 1 : -1

      rate_model.create({
        'entity' => 'comment',
        'entity_id' => comment[:id],
        'user_id' => user[:id],
        'value' => value
      })

      comment_model.update(comment[:id], {
        'rate' => comment[:rate] + value
      })
    end
  end
end

puts "\033[93mSeed rates completed successfully\033[0m"

# Seed pages collection
page_model = Page.new 

{
  'about' => 'About',
  'contact' => 'Contact',
  'faq' => 'FAQ',
  'terms' => 'Terms of Usage',
  'privacy' => 'Privacy Policy',
}.each do |name, title|
  page_model.create({
    "name" => name, 
    "title" => title, 
    "text" => Faker::Lorem.paragraphs(number: 4)
  })
end

puts "\033[93mSeed pages completed successfully\033[0m"

# Print Done
puts "\033[92mAll seeds ran successfully\033[0m"
