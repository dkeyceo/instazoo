package com.dkey.zoo.validations;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import com.dkey.zoo.annotations.PasswordMatches;
import com.dkey.zoo.payload.request.SignupRequest;

public class PasswordMatchesValidator 
	implements ConstraintValidator<PasswordMatches, Object> {

	@Override
	public void initialize(PasswordMatches constraintAnnotation) {

	}

	@Override
	public boolean isValid(Object obj, ConstraintValidatorContext context) {
		
		SignupRequest request = (SignupRequest) obj;
		return request.getPassword().equals(request.getConfirmPassword());
	}

	
}
