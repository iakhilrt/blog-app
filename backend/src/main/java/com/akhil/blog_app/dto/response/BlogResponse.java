package com.akhil.blog_app.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class BlogResponse {
    private Long id;
    private String title;
    private String description;
    private String image;
    private LocalDateTime createdAt;
    private String authorName;
    private String authorEmail;
}
