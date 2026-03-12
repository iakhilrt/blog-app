package com.akhil.blog_app.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.security.SecureRandom;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class OtpService {

    private final Map<String, OtpData> otpStore = new ConcurrentHashMap<>();

    @Value("${BREVO_API_KEY}")
    private String apiKey;

    private final SecureRandom random = new SecureRandom();

    private static final long OTP_VALIDITY = 5 * 60 * 1000; // 5 minutes

    // OTP DATA CLASS
    private static class OtpData {
        String otp;
        long expiry;

        OtpData(String otp, long expiry) {
            this.otp = otp;
            this.expiry = expiry;
        }
    }

    // SEND OTP
    public void sendOtp(String email, String name) {

        String otp = String.valueOf(random.nextInt(900000) + 100000);

        long expiryTime = System.currentTimeMillis() + OTP_VALIDITY;

        otpStore.put(email, new OtpData(otp, expiryTime));

        try {

            String html = """
            <div style='font-family: Arial, sans-serif; padding: 20px;'>

                <h2 style='color:#6a5af9;'>Hi %s 👋,</h2>

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
            """.formatted(name, otp);

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

        OtpData data = otpStore.get(email);

        if (data != null &&
                data.otp.equals(otp) &&
                data.expiry > System.currentTimeMillis()) {

            otpStore.remove(email);
            return true;
        }

        return false;
    }
}