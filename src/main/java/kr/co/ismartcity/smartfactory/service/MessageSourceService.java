package kr.co.ismartcity.smartfactory.service;

import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.NoSuchMessageException;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class MessageSourceService {

	@Autowired
	MessageSource messageSource;
	
	public String getMessage(String code) {
		try {
			return messageSource.getMessage(code, null, LocaleContextHolder.getLocale());
		} catch(NoSuchMessageException e) {
			return "";
		}	
	}
	
	public String getMessage(String code, Locale locale) {
		try {
			return messageSource.getMessage(code, null, locale);
		} catch(NoSuchMessageException e) {
			return "";
		}	
	}
	
	public String getMessage(Enum<?> enumVal) {
		String code = "enum.";
		code += enumVal.getClass().getSimpleName().toLowerCase();
		code += ".";
		code += enumVal.toString().toLowerCase();		
		try {
			return messageSource.getMessage(code, null, LocaleContextHolder.getLocale());
		} catch(NoSuchMessageException e) {
			return "";
		}
    }
	
}
