package com.akhil.blog_app.service;

import com.akhil.blog_app.dto.request.BlogRequest;
import com.akhil.blog_app.dto.response.BlogResponse;
import com.akhil.blog_app.model.Blog;
import com.akhil.blog_app.model.User;
import com.akhil.blog_app.repository.BlogRepository;
import com.akhil.blog_app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BlogService {

    private final BlogRepository blogRepository;
    private final UserRepository userRepository;

    // ADD BLOG
    public BlogResponse addBlog(BlogRequest request, String email) {

        // Find who is adding the blog
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found!"));

        // Create blog
        Blog blog = new Blog();
        blog.setTitle(request.getTitle());
        blog.setDescription(request.getDescription());
        blog.setImage(request.getImage());
        blog.setAuthor(user);

        Blog saved = blogRepository.save(blog);

        return mapToResponse(saved);
    }

    // GET ALL BLOGS
    public List<BlogResponse> getAllBlogs() {
        return blogRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // GET SINGLE BLOG
    public BlogResponse getBlogById(Long id) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog not found!"));
        return mapToResponse(blog);
    }

    // DELETE BLOG
    public String deleteBlog(Long id) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog not found!"));
        blogRepository.delete(blog);
        return "Blog deleted successfully!";
    }

    // GET BLOGS BY USER
    public List<BlogResponse> getBlogsByUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found!"));
        return blogRepository.findByAuthor(user)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // HELPER — Convert Blog entity to BlogResponse DTO
    private BlogResponse mapToResponse(Blog blog) {
        return new BlogResponse(
                blog.getId(),
                blog.getTitle(),
                blog.getDescription(),
                blog.getImage(),
                blog.getCreatedAt(),
                blog.getAuthor().getName()
        );
    }
}