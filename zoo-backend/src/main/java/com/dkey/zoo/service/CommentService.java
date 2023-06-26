package com.dkey.zoo.service;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dkey.zoo.dto.CommentDTO;
import com.dkey.zoo.entities.Comment;
import com.dkey.zoo.entities.Post;
import com.dkey.zoo.entities.User;
import com.dkey.zoo.exceptions.PostNotFoundException;
import com.dkey.zoo.repository.CommentRepository;
import com.dkey.zoo.repository.ImageRepository;
import com.dkey.zoo.repository.PostRepository;

@Service
public class CommentService {
public static final Logger LOG = LoggerFactory.getLogger(CommentService.class);
	
	private final PostRepository postRepository;
	private final CommentRepository commentRepository;
	private final UserService userService;

	@Autowired
	public CommentService(PostRepository postRepository, CommentRepository commentRepository, UserService userService) {
		this.postRepository = postRepository;
		this.commentRepository = commentRepository;
		this.userService = userService;
	}
	
	public Comment saveComment(Long postId, CommentDTO commentDTO, Principal principal){
		User user = userService.getCurrentUser(principal);
		Post post = postRepository.findById(postId)
				.orElseThrow(() -> new PostNotFoundException("Post cannot be found for username: "+ user.getEmail()));
		
		Comment comment = new Comment();
		comment.setPost(post);
		comment.setUserId(user.getId());
		comment.setUsername(user.getUsername());
		comment.setMessage(commentDTO.getMessage());
		
		LOG.info("Saving comment for Post: {}", post.getId());
		return commentRepository.save(comment);
		
	}
	
	public List<Comment> getAllCommentsForPost(Long postId){
		Post post = postRepository.findById(postId)
				.orElseThrow(() -> new PostNotFoundException("Post cannot be found"));
		
		List<Comment> comments = commentRepository.findAllByPost(post);
		return comments;
	}
	
	public void deleteComment(Long commentId) {
		Optional<Comment> comment = commentRepository.findById(commentId);
		comment.ifPresent(commentRepository::delete);
	}
}
