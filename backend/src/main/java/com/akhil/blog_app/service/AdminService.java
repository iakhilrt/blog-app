package com.akhil.blog_app.service;

import com.akhil.blog_app.exception.ResourceNotFoundException;
import com.akhil.blog_app.model.Blog;
import com.akhil.blog_app.model.User;
import com.akhil.blog_app.repository.BlogRepository;
import com.akhil.blog_app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final BlogRepository blogRepository;
    private final CloudinaryService cloudinaryService;

    // Delete user + all their blogs + all their images
    @Transactional
    public String deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found!"));

        // Delete all their images from Cloudinary
        List<Blog> blogs = blogRepository.findByAuthor(user);
        blogs.forEach(blog -> cloudinaryService.deleteImage(blog.getImage()));

        // Delete all their blogs from DB
        blogRepository.deleteByAuthor(user);

        // Delete the user from DB
        userRepository.delete(user);

        return "User and all their blogs deleted successfully!";
    }
}