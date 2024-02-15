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
  # @return [bool]
  def create(data)
    # check if data is valid
    if !validate({field})
      raise "Unknown field " + field + " in model " + @collection.to_s
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

    # return status
    return (result.n == 1)
  end

  ##
  # Update model
  #
  # @param  [string]   id
  # @param  [HashMap]  data
  # @return [bool]
  def update(id, data)
    # check if data is valid
    if !validate({field})
      raise "Unknown field " + field + " in model " + @collection.to_s
    end

    # update timestamps
    data[:updated_at] = Time.now.strftime("%d-%m-%Y %H:%M:%S")

    # update model
    result = @collection.find(:id => id).update_one("$set" => data)

    # return status
    return (result.n == 1)
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
    if !validate({field})
      raise "Unknown field " + field + " in model " + @collection.to_s
    end

    return @collection.find({field => value, :deleted_at => nil})
  end

  ##
  # Get all models
  #
  # @return [array]
  def all()
    return @collection.find({:deleted_at => nil})
  end

  ##
  # Get count of models
  #
  # @return [int]
  def count()
    return @collection.find({:deleted_at => nil}).count()
  end

  ##
  # Get limited number of latest models
  #
  # @param  [int]    n
  # @return [array]
  def latest(n)
    return @collection.find({:deleted_at => nil})
      .sort({created_at:-1})
      .limit(n)
  end

  private

  ##
  # Validate model's fields
  #
  # @param  [HashMap]    input_fields
  # @return [bool]
  def validate(input_fields)
    return (@fields - input_fields).empty?
  end
end
