package com.dkey.zoo.web;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.ObjectUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dkey.zoo.payload.request.LoginRequest;
import com.dkey.zoo.payload.request.SignupRequest;
import com.dkey.zoo.payload.response.JWTTokenSuccessResponse;
import com.dkey.zoo.payload.response.MessageResponse;
import com.dkey.zoo.security.JWTTokenProvider;
import com.dkey.zoo.security.SecurityConstants;
import com.dkey.zoo.service.UserService;
import com.dkey.zoo.validations.ResponseErrorValidation;

@CrossOrigin
@RestController
@RequestMapping("/api/auth")
@PreAuthorize("permitAll()")
public class AuthController {
	
	@Autowired
	private JWTTokenProvider jwtTokenProvider;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private ResponseErrorValidation responseErrorValidation;
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/signin")
	public ResponseEntity<Object> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult bindingResult){
		ResponseEntity<Object> errors = responseErrorValidation.mapValidationService(bindingResult);
		if(!ObjectUtils.isEmpty(errors)) 
			return errors;
		
		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
				loginRequest.getUsername(),loginRequest.getPassword()
		));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = SecurityConstants.TOKEN_PREFIX + jwtTokenProvider.generateToken(authentication);
		return ResponseEntity.ok(new JWTTokenSuccessResponse(true, jwt));
	}
	
	@PostMapping("/signup")
	public ResponseEntity<Object> registerUser(@Valid @RequestBody SignupRequest signupRequest, BindingResult bindingResult){
		ResponseEntity<Object> errors = responseErrorValidation.mapValidationService(bindingResult);
		if(!ObjectUtils.isEmpty(errors)) 
			return errors;
		userService.createUser(signupRequest);
		return ResponseEntity.ok(new MessageResponse("User registered successfully"));
	}
	
}
