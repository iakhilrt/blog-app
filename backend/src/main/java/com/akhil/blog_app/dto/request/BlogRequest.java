package com.akhil.blog_app.dto.request;

import lombok.Data;

@Data
public class BlogRequest {
    private String title;
    private String description;
    private String image; // Base64
}
