package kr.co.ismartcity.smartfactory.converter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Converter
public class JsonToArrayConverter implements AttributeConverter<List<Object>, String> {
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Object> convertToEntityAttribute(String attribute) {
		if (attribute == null) {
			return new ArrayList<Object>();
		}
		try
		{
			List<Object> list = new ArrayList<Object>();
			ObjectMapper objectMapper = new ObjectMapper();
			list = Arrays.asList(objectMapper.readValue(attribute, Object[].class));
	        return list;
		}
	    catch (IOException e) {
	    	log.error("Convert error while trying to convert string(JSON) to map data structure.");
	    }
		return new ArrayList<Object>();
	}

	@Override
	public String convertToDatabaseColumn(List<Object> dbData) {
		try
        {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.writeValueAsString(dbData);
        }
        catch (JsonProcessingException e)
        {
        	log.error("Could not convert map to json string.");
            return null;
        }
	}

}
