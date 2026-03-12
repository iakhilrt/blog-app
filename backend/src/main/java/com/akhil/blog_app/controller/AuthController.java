package com.akhil.blog_app.controller;

import com.akhil.blog_app.dto.request.LoginRequest;
import com.akhil.blog_app.dto.request.OtpRequest;
import com.akhil.blog_app.dto.request.SignupRequest;
import com.akhil.blog_app.dto.response.AuthResponse;
import com.akhil.blog_app.service.AuthService;
import com.akhil.blog_app.service.OtpService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final OtpService otpService;

    @GetMapping("/health-check")
    public String health() {
        return "OK";
    }

    // Send OTP
    @PostMapping("/send-otp")
    public ResponseEntity<String> sendOtp(@RequestBody OtpRequest request) {

        try {

            otpService.sendOtp(
                    request.getEmail(),
                    request.getName()
            );

            return ResponseEntity.ok("OTP sent");

        } catch (Exception e) {

            return ResponseEntity
                    .internalServerError()
                    .body("Failed to send OTP");

        }
    }

    //Verify OTP + Signup
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody SignupRequest request) {

        // Check email FIRST via service
        if (authService.emailExists(request.getEmail())) {
            return ResponseEntity.badRequest().body("Email already registered!");
        }

        // Then verify OTP
        if (!otpService.verifyOtp(request.getEmail(), request.getOtp())) {
            return ResponseEntity.badRequest().body("Invalid or expired OTP!");
        }

        return ResponseEntity.ok(authService.signup(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}