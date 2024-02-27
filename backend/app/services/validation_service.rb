class ValidationService
  ##
  # Validate parameters
  #
  # @param  [HashMap] params
  # @param  [HashMap] rules
  # @return [HashMap]
  def validate(params, rules)
    error = ''
    all_good = true
    
    rules.each do |field, rule|
      conditions = rule.split("|")
      
      field_value = get_field_value(field, params)

      # if the field is not required and doesn't exists , skip
      if !conditions.include?('required') && (field_value == nil || field_value == '')
        next
      end

      conditions.each do |condition|
        if condition == "required"
          if field_value == nil || field_value.to_s.empty?
            all_good = false
            error = I18n.t('errors.validation.required', field: field)
            break
          end
        elsif condition == "email"
          if !(field_value =~ %r{^\S+@\S+\.\S+$}xi).present?
            all_good = false
            error = I18n.t('errors.validation.email')
            break
          end
        elsif condition.include? "min_len"
          # we take the length => min_len:X 
          min_len = condition.split(":")[1].to_i
          
          if field_value.length < min_len
            all_good = false
            error = I18n.t('errors.validation.min_len', field: field, count: min_len)
            break
          end
        elsif condition.include? "max_len"
          # we take the length => max_len:X 
          max_len = condition.split(":")[1].to_i
          
          if field_value.length > max_len
            all_good = false
            error = I18n.t('errors.validation.max_len', field: field, count: max_len)
            break
          end
        elsif condition.include? "min"
          # we take the number => min:X 
          min = condition.split(":")[1].to_i
          
          if field_value < min
            all_good = false
            error = I18n.t('errors.validation.min', field: field, number: min)
            break
          end
        elsif condition.include? "max"
          # we take the number => max:X 
          max = condition.split(":")[1].to_i
          
          if field_value > max
            all_good = false
            error = I18n.t('errors.validation.max', field: field, number: max)
            break
          end
        end
      end

      if !all_good
        break
      end
    end

    return {
      'status' => all_good,
      'message' => error,
    }
  end

  private

  ##
  # Extract field with dot notation value from the params HashMap  
  # for example : main.sub ===> params[:main][:sub]
  #
  # @param  [string]  field
  # @param  [HashMap] params
  # @return [mixed]
  def get_field_value(field, params)
    if !field.include? '.'
      return params.has_key?(field) ? params[field] : nil
    end

    field_value = params

    field.split('.').each do |key|
      if field_value == nil || !field_value.has_key?(key)
        return nil
      end

      field_value = field_value[key]
    end

    return field_value
  end
end