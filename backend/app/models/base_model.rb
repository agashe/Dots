class BaseModel
  ##
  # Base Model Constructor
  def initialize(collection_name, collection_fields)
    # initialize the mongodb connection
    client = Mongo::Client.new(['localhost:' + ENV["MONGO_DB_PORT"]],
      user: ENV["MONGO_DB_USERNAME"],
      password: ENV["MONGO_DB_PASSWORD"],
      database: ENV["MONGO_DB_NAME"],
      auth_mech: :scram,
      auth_source: 'admin'
    )

    # define the collection
    @collection = client[collection_name]

    # define the collection's fields
    @fields = collection_fields
  end

  ##
  # Create new model
  #
  # @param  [HashMap]  data
  # @param  [bool]     return_object
  # @return [int], [Object] or [nil]
  def create(data, return_object = false)
    # check if data is valid
    if !validate(data)
      raise "Unknown field in model " + @collection.to_s
    end
    
    # add uuid
    data[:id] = SecureRandom.uuid

    # add timestamps
    data[:created_at] = Time.now.strftime("%d-%m-%Y %H:%M:%S")
    data[:updated_at] = Time.now.strftime("%d-%m-%Y %H:%M:%S")

    # add deleted at
    data[:deleted_at] = nil

    # do insert
    result = @collection.insert_one(data)

    # return either the newly created object or just the id
    return (result.n == 1) ? (return_object ? find(data[:id]) : data[:id]) : nil
  end

  ##
  # Update model
  #
  # @param  [string]   id
  # @param  [HashMap]  data
  # @param  [bool]     return_object
  # @return [int], [Object] or [nil]
  def update(id, data, return_object = false)
    # check if data is valid
    if !validate(data)
      raise "Unknown field in model " + @collection.to_s
    end

    # update timestamps
    data[:updated_at] = Time.now.strftime("%d-%m-%Y %H:%M:%S")

    # update model
    result = @collection.find(:id => id).update_one("$set" => data)

    # return either the updated object or just the id
    return (result.n == 1) ? (return_object ? find(id) : id) : nil
  end

  ##
  # Delete model (soft)
  #
  # @param  [string]   id
  # @return [bool]
  def delete(id)
    # do delete by updating deleted_at field
    result = @collection.find(:id => id)
      .update_one("$set" => {
        :deleted_at => Time.now.strftime("%d-%m-%Y %H:%M:%S")
      })

    # return status
    return (result.n == 1)
  end

  ##
  # Delete model (hard)
  #
  # @param  [string]   id
  # @return [bool]
  def destroy(id)
    # do delete
    result = @collection.find(:id => id).delete_one

    # return status
    return (result.deleted_count == 1)
  end

  ##
  # Find model by id
  #
  # @param  [string]   id
  # @return [HashMap]
  def find(id)    
    return @collection.find({:id => id, :deleted_at => nil}).first
  end

  ##
  # Find model by some field
  #
  # @param  [string]   field
  # @param  [mixed]    value
  # @return [HashMap]
  def findBy(field, value)
    if !validate({field => value})
      raise "Unknown field " + field + " in model " + @collection.to_s
    end

    return @collection.find({field => value, :deleted_at => nil}).to_a
  end

  ##
  # Get all models
  #
  # @return [array]
  def all()
    return @collection.find({:deleted_at => nil}).to_a
  end
  
  ##
  # Get specific field value from all models
  #
  # @param [array]    fields
  # @return [array]
  def get_fields(fields)
    fields = fields.to_h { |field| [field, 1] }

    if !validate(fields)
      raise "Unknown field in model " + @collection.to_s
    end

    fields['_id'] = 0

    return @collection.find({:deleted_at => nil}).projection(fields).to_a
  end

  ##
  # Get count of models
  #
  # @param  [HashMap]    q
  # @param  [bool]       skip_deleted
  # @return [int]
  def count(q = nil, skip_deleted = true)
    if skip_deleted
      if q == nil
        q = {:deleted_at => nil}
      else 
        q['deleted_at'] = nil
      end
    end

    return @collection.find(q).count()
  end

  ##
  # Get n number of latest models
  #
  # @param  [int]        n
  # @param  [HashMap]    q
  # @return [array]
  def latest(n, q = {:deleted_at => nil})
    return @collection.find(q)
      .sort({'_id' => -1})
      .limit(n).to_a
  end
  
  ##
  # Get n latest models by page number
  #
  # @param  [int]        page
  # @param  [int]        per_page
  # @param  [HashMap]    query
  # @param  [HashMap]    sort
  # @return [array]
  def paginate(page, per_page, query = {:deleted_at => nil}, sort = {'_id' => -1})
    return @collection.find(query)
      .sort(sort)
      .skip((page - 1) * per_page)
      .limit(per_page).to_a
  end
  
  ##
  # Get n number of random models
  #
  # @param  [int]    n
  # @return [array]
  def random(n)
    return @collection.aggregate([{ '$sample': { size: n } }]).to_a
  end

  ##
  # Run query over models
  #
  # @param  [HashMap]    q
  # @return [array]
  def query(q)
    return @collection.find(q).to_a
  end

  ##
  # Find model by "like" operator
  #
  # @param  [string]   field
  # @param  [mixed]    value
  # @return [HashMap]
  def like(field, value)
    if !validate({field => value})
      raise "Unknown field " + field + " in model " + @collection.to_s
    end

    return @collection.find({field: {'$regex': value}}).to_a
  end

  ##
  # Find model where id among an array of ids
  #
  # @param  [string]   field
  # @param  [array]    values
  # @return [HashMap]
  def in(field, values)
    if !validate({field => values[0]})
      raise "Unknown field " + field + " in model " + @collection.to_s
    end

    return @collection.find(field => {'$in': values}).to_a
  end

  ##
  # Get n number of models sorted by some criteria
  #
  # @param  [int]        n
  # @param  [string]     sort_by
  # @param  [bool]       asc
  # @param  [HashMap]    q
  # @return [array]
  def sort(n, sort_by, asc = false, q = {:deleted_at => nil})
    return @collection.find(q)
      .sort({sort_by => (asc ? 1 : -1)})
      .limit(n).to_a
  end

  ##
  # Get related models
  #
  # @param  [string] related_model_name
  # @param  [string] foreign_field
  # @param  [string] model_id
  # @return [array]
  def has(related_model_name, foreign_field, model_id)
    related_model = related_model_name.new
    relations = related_model.findBy(foreign_field, model_id)

    return relations.to_a
  end

  private

  ##
  # Validate model's fields
  #
  # @param  [HashMap]    input_fields
  # @return [bool]
  def validate(input_fields)
    model_fields = @fields + ['id', 'created_at', 'updated_at', 'deleted_at']
    return (input_fields.keys - model_fields).empty?
  end
end
