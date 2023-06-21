package com.dkey.zoo.repository;

import com.dkey.zoo.entities.Post;
import com.dkey.zoo.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllByUserOrderByCreatedDateDesc(User user);
    List<Post> findAllOrderByCreatedDateDesc();
    Optional<Post> findPostByIdAndUser(Long id, User user);
}
