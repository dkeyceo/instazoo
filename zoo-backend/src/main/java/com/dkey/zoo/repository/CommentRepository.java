package com.dkey.zoo.repository;

import com.dkey.zoo.entities.Comment;
import com.dkey.zoo.entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findAllByPost(Post post);
    Comment findByIdAndUserId(Long commentId, Long userId);

}
