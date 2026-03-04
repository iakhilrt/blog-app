package com.akhil.blog_app.service;

import com.akhil.blog_app.dto.request.LoginRequest;
import com.akhil.blog_app.dto.request.SignupRequest;
import com.akhil.blog_app.dto.response.AuthResponse;
import com.akhil.blog_app.model.User;
import com.akhil.blog_app.repository.UserRepository;
import com.akhil.blog_app.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    // SIGNUP
    public String signup(SignupRequest request) {

        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered!");
        }

        // Create new user
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword())); // hash password
        user.setRole("USER");

        userRepository.save(user);

        return "Signup successful!";
    }

    // LOGIN
    public AuthResponse login(LoginRequest request) {

        // Find user by email
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Email not found!"));

        // Check password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Incorrect password!");
        }

        // Generate JWT token
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());

        return new AuthResponse(token, user.getName(), user.getEmail(), user.getRole());
    }
}
