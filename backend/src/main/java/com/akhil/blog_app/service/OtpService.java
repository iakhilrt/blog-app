package com.akhil.blog_app.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class OtpService {

    private final JavaMailSender mailSender;

    private final Map<String, String> otpStore = new HashMap<>();

    // GENERATE AND SEND OTP
    public void sendOtp(String email) {
        String otp = String.valueOf(new Random().nextInt(900000) + 100000);
        otpStore.put(email, otp);

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(email);
            helper.setSubject("Your Blog App OTP");

            // HTML email with bold OTP
            String html = """
                    <div style="font-family: Arial, sans-serif; padding: 20px;">
                        <h2 style="color: #6a5af9;">Your Blog App OTP</h2>
                        <p>Use the OTP below to complete your signup:</p>
                        <div style="
                            font-size: 32px;
                            font-weight: bold;
                            letter-spacing: 8px;
                            color: #6a5af9;
                            background: #f0eeff;
                            padding: 16px 24px;
                            border-radius: 10px;
                            display: inline-block;
                            margin: 16px 0;
                        ">%s</div>
                        <p>This OTP is valid for <strong>5 minutes</strong>.</p>
                        <p style="color: #999; font-size: 12px;">
                            If you did not request this, please ignore this email.
                        </p>
                        <hr style="border: none; border-top: 1px solid #eee;" />
                        <p style="color: #999; font-size: 12px;">Thank You — Blog App</p>
                    </div>
                    """.formatted(otp);

            helper.setText(html, true); // true = send as HTML

            mailSender.send(message);

        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send OTP email!", e);
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