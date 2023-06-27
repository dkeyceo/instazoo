package com.dkey.zoo.facade;

import org.springframework.stereotype.Component;

import com.dkey.zoo.dto.CommentDTO;
import com.dkey.zoo.entities.Comment;

@Component
public class CommentFacade {
	public CommentDTO commentToCommentDTO(Comment comment) {

		CommentDTO commentDTO = new CommentDTO();
		commentDTO.setId(comment.getId());
		commentDTO.setUsername(comment.getUsername());
		commentDTO.setMessage(comment.getMessage());
		return commentDTO;
	
	}
}
