package com.akhil.blog_app.repository;

import com.akhil.blog_app.model.Blog;
import com.akhil.blog_app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {

    // Get all blogs by a specific user
    List<Blog> findByAuthor(User author);

    // Get all blogs ordered by newest first
    List<Blog> findAllByOrderByCreatedAtDesc();

    void deleteByAuthor(User user);
}
