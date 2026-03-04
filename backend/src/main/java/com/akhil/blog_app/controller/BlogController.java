package com.akhil.blog_app.controller;

import com.akhil.blog_app.dto.request.BlogRequest;
import com.akhil.blog_app.dto.response.BlogResponse;
import com.akhil.blog_app.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blogs")
@RequiredArgsConstructor
public class BlogController {

    private final BlogService blogService;

    // GET /api/blogs — public
    @GetMapping
    public ResponseEntity<List<BlogResponse>> getAllBlogs() {
        return ResponseEntity.ok(blogService.getAllBlogs());
    }

    // GET /api/blogs/{id} — public
    @GetMapping("/{id}")
    public ResponseEntity<BlogResponse> getBlogById(@PathVariable Long id) {
        return ResponseEntity.ok(blogService.getBlogById(id));
    }

    // POST /api/blogs/add — protected (login required)
    @PostMapping("/add")
    public ResponseEntity<BlogResponse> addBlog(
            @RequestBody BlogRequest request,
            @AuthenticationPrincipal String email) {
        return ResponseEntity.ok(blogService.addBlog(request, email));
    }

    // GET /api/blogs/my — get logged in user's blogs
    @GetMapping("/my")
    public ResponseEntity<List<BlogResponse>> getMyBlogs(
            @AuthenticationPrincipal String email) {
        return ResponseEntity.ok(blogService.getBlogsByUser(email));
    }

    // DELETE /api/blogs/{id} — protected
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBlog(@PathVariable Long id) {
        return ResponseEntity.ok(blogService.deleteBlog(id));
    }
}