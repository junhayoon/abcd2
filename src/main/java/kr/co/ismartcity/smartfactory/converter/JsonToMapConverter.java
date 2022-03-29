package kr.co.ismartcity.smartfactory.converter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Converter
public class JsonToMapConverter implements AttributeConverter<Map<String, Object>, String> {

	@SuppressWarnings("unchecked")
	@Override
	public Map<String, Object> convertToEntityAttribute(String attribute) {
		if (attribute == null) {
           return new HashMap<>();
        }
        try
        {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(attribute, HashMap.class);
        }
        catch (IOException e) {
            log.error("Convert error while trying to convert string(JSON) to map data structure.");
        }
        return new HashMap<>();
	}

	@Override
	public String convertToDatabaseColumn(Map<String, Object> dbData) {
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
