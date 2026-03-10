package com.akhil.blog_app.dto.request;

import lombok.Data;

@Data
public class SignupRequest {
    private String name;
    private String email;
    private String password;
    private String otp;
}
