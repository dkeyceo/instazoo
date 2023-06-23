package com.dkey.zoo.validations;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import com.dkey.zoo.annotations.ValidEmail;

public class EmailValidator implements ConstraintValidator<ValidEmail, String> {

	private static final String EMAIL_PATTERN = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@" 
	        + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";
	@Override
	public void initialize(ValidEmail constraintAnnotation) {
		
	}

	@Override
	public boolean isValid(String email, ConstraintValidatorContext context) {
		
		return validateEmail(email);
	}
	
	private boolean validateEmail(String email) {
		Pattern pattern = Pattern.compile(email);
		Matcher matcher = pattern.matcher(email);
		return matcher.matches();
	}

	
}
