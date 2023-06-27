package com.dkey.zoo.facade;

import org.springframework.stereotype.Component;

import com.dkey.zoo.dto.UserDTO;
import com.dkey.zoo.entities.User;

@Component
public class UserFacade {
	public UserDTO userToUserDTO(User user) {
		UserDTO userDTO = new UserDTO();
		userDTO.setId(user.getId());
		userDTO.setFirstname(user.getName());
		userDTO.setLastname(user.getLastname());
		userDTO.setUsername(user.getUsername());
		userDTO.setBio(user.getBio());
		return userDTO;
	}
}
