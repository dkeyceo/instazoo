package com.dkey.zoo.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.dkey.zoo.entities.User;
import com.dkey.zoo.entities.enums.ERole;
import com.dkey.zoo.exceptions.UserExistException;
import com.dkey.zoo.payload.request.SignupRequest;
import com.dkey.zoo.repository.UserRepository;

@Service
public class UserService {
	public static final Logger LOG = LoggerFactory.getLogger(UserService.class);
	
	private final UserRepository userRepository;
	private final BCryptPasswordEncoder passwordEncoder;
	
	@Autowired
	public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}
	
	public User createUser(SignupRequest userIn) {
		User user = new User();
		user.setEmail(userIn.getEmail());
		user.setName(userIn.getFirstname());
		user.setLastname(userIn.getLastname());
		user.setUsername(userIn.getUsername());
		user.setPassword(passwordEncoder.encode(userIn.getPassword()));
		user.getRoles().add(ERole.ROLE_USER);
		
		try {
			LOG.info("Saving User {}", userIn.getEmail());
			return userRepository.save(user);
		}catch(Exception ex) {
			LOG.error("Error during registration {}", ex.getMessage());
			throw new UserExistException("The user "+ user.getUsername() + " already exists. Please check creds");
		}
	}
}
