package com.akhil.blog_app.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import org.springframework.http.*;
import java.util.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class OtpService {

    private final Map<String, String> otpStore = new HashMap<>();

    // SEND OTP
    public void sendOtp(String email) {

        String otp = String.valueOf(new Random().nextInt(900000) + 100000);
        otpStore.put(email, otp);

        try {

            String apiKey = System.getenv("BREVO_API_KEY");

            String html = """
        <div style='font-family: Arial, sans-serif; padding: 20px;'>
            <h2 style='color:#6a5af9;'>Your Inkwell OTP</h2>
            <p>Use the OTP below to complete your signup:</p>

            <div style='
                font-size:32px;
                font-weight:bold;
                letter-spacing:8px;
                color:#6a5af9;
                background:#f0eeff;
                padding:16px 24px;
                border-radius:10px;
                display:inline-block;
                margin:16px 0;'>
                %s
            </div>

            <p>This OTP is valid for <strong>5 minutes</strong>.</p>

            <p style='color:#999;font-size:12px;'>
                If you did not request this, please ignore this email.
            </p>

            <hr style='border:none;border-top:1px solid #eee;' />

            <p style='color:#999;font-size:12px;'>
                Thank You — <strong>Inkwell</strong>
            </p>
        </div>
        """.formatted(otp);

            RestTemplate restTemplate = new RestTemplate();

            Map<String, Object> sender = new HashMap<>();
            sender.put("name", "Inkwell");
            sender.put("email", "noreply@inkwell.akhilrt.com");

            Map<String, String> to = new HashMap<>();
            to.put("email", email);

            Map<String, Object> body = new HashMap<>();
            body.put("sender", sender);
            body.put("to", List.of(to));
            body.put("subject", "Your Inkwell OTP");
            body.put("htmlContent", html);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("api-key", apiKey);

            HttpEntity<Map<String, Object>> request =
                    new HttpEntity<>(body, headers);

            restTemplate.postForEntity(
                    "https://api.brevo.com/v3/smtp/email",
                    request,
                    String.class
            );

        } catch (Exception e) {
            throw new RuntimeException("Failed to send OTP email", e);
        }
    }

    // VERIFY OTP
    public boolean verifyOtp(String email, String otp) {
        String storedOtp = otpStore.get(email);

        if (storedOtp != null && storedOtp.equals(otp)) {
            otpStore.remove(email);
            return true;
        }

        return false;
    }
}