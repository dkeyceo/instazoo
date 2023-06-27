package com.dkey.zoo.facade;

import org.springframework.stereotype.Component;

import com.dkey.zoo.dto.PostDTO;
import com.dkey.zoo.entities.Post;

@Component
public class PostFacade {
	public PostDTO postToPostDTO(Post post) {
		PostDTO postDTO = new PostDTO();
		postDTO.setUsername(post.getUser().getUsername());
		postDTO.setId(post.getId());
		postDTO.setCaption(post.getCaption());
		postDTO.setLikes(post.getLikes());
		postDTO.setUsersLiked(post.getLikedUsers());
		postDTO.setLocation(post.getLocation());
		postDTO.setTitle(post.getTitle());
		return postDTO;
	}
}
