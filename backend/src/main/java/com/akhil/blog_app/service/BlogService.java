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
    private final CloudinaryService cloudinaryService;

    // ADD BLOG
    public BlogResponse addBlog(BlogRequest request, String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found!"));

        Blog blog = new Blog();
        blog.setTitle(request.getTitle());
        blog.setDescription(request.getDescription());
        blog.setImage(request.getImage());
        blog.setAuthor(user);

        Blog saved = blogRepository.save(blog);
        return mapToResponse(saved);
    }

    // EDIT BLOG
    public BlogResponse updateBlog(Long id, BlogRequest request, String email) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog not found!"));

        if (!blog.getAuthor().getEmail().equals(email)) {
            throw new RuntimeException("You are not authorized to edit this blog!");
        }

        if (request.getTitle() != null && !request.getTitle().isEmpty()) {
            blog.setTitle(request.getTitle());
        }

        if (request.getDescription() != null && !request.getDescription().isEmpty()) {
            blog.setDescription(request.getDescription());
        }

        //  Delete old image from Cloudinary before saving new one
        if (request.getImage() != null && !request.getImage().isEmpty()) {
            cloudinaryService.deleteImage(blog.getImage()); // delete old
            blog.setImage(request.getImage());              // save new
        }

        blogRepository.save(blog);
        return mapToResponse(blog);
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

    // DELETE BLOG — ✅ also deletes image from Cloudinary
    public String deleteBlog(Long id) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog not found!"));
        cloudinaryService.deleteImage(blog.getImage());
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
                blog.getAuthor().getName(),
                blog.getAuthor().getEmail()
        );
    }
}