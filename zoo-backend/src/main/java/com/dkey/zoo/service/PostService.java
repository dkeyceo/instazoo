package com.dkey.zoo.service;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dkey.zoo.dto.PostDTO;
import com.dkey.zoo.entities.ImageModel;
import com.dkey.zoo.entities.Post;
import com.dkey.zoo.entities.User;
import com.dkey.zoo.exceptions.PostNotFoundException;
import com.dkey.zoo.repository.ImageRepository;
import com.dkey.zoo.repository.PostRepository;

@Service
public class PostService {
	
	public static final Logger LOG = LoggerFactory.getLogger(PostService.class);
	
	private final PostRepository postRepository;
	private final ImageRepository imageRepository;
	private final UserService userService;
	
	@Autowired
	public PostService(PostRepository postRepository, ImageRepository imageRepository, UserService userService) {
		this.postRepository = postRepository;
		this.imageRepository = imageRepository;
		this.userService = userService;
	}
	
	public Post createPost(PostDTO postDTO, Principal principal) {
		User user = userService.getCurrentUser(principal);
		Post post = new Post();
		post.setUser(user);
		post.setCaption(postDTO.getCaption());
		post.setLocation(postDTO.getLocation());
		post.setTitle(postDTO.getTitle());
		post.setLikes(0);
		
		LOG.info("Saving post for User: {}", user.getEmail());
		return postRepository.save(post);
	}
	
	public List<Post> getAllPosts(){
		return postRepository.findAllByOrderByCreatedDateDesc();
	}
	
	public Post getPostById(Long postId, Principal principal) {
		User user = userService.getCurrentUser(principal);
		return postRepository.findPostByIdAndUser(postId, user)
				.orElseThrow(() -> new PostNotFoundException("Post cannot be found for username: " + user.getEmail()));
	}
	
	public List<Post> getAllPostForUser(Principal principal){
		User user = userService.getCurrentUser(principal);
		return postRepository.findAllByUserOrderByCreatedDateDesc(user);
	}
	
	public Post likePost(Long postId, String username) {
		Post post = postRepository.findById(postId)
				.orElseThrow(() -> new PostNotFoundException("Post not found for to be liked"));
		
		Optional<String> userLiked = post.getLikedUsers()
				.stream().filter(u -> u.equals(username)).findAny();
		
		if(userLiked.isPresent()) {
			post.setLikes(post.getLikes() - 1);
			post.getLikedUsers().remove(username);
		}else {
			post.setLikes(post.getLikes() + 1);
			post.getLikedUsers().add(username);
		}
		return postRepository.save(post);
	}
	
	public void deletePost(Long postId, Principal principal) {
		Post post = getPostById(postId, principal);
		Optional<ImageModel> imageModel = imageRepository.findByPostId(postId);
		postRepository.delete(post);
		imageModel.ifPresent(imageRepository::delete);
	}
}
