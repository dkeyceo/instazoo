package com.dkey.zoo.entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import com.dkey.zoo.entities.Post;
import com.dkey.zoo.entities.enums.ERole;

import javax.persistence.PrePersist;

public class User {
	private Long id;
	private String name;
	private String username;
	private String lastname;
	private String email;
	private String bio;
	private String password;
	
	private Set<ERole> role = new HashSet<>();
	private List<Post> posts = new ArrayList<>();
	private LocalDateTime createdDate;
	
	@PrePersist
	protected void onCreate() {
		this.createdDate = LocalDateTime.now();
	}

}
