package com.akhil.blog_app.controller;

import com.akhil.blog_app.dto.request.LoginRequest;
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
    public ResponseEntity<String> sendOtp(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        try {
            otpService.sendOtp(email);
            return ResponseEntity.ok("OTP sent to " + email);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Failed: " + e.getMessage());
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