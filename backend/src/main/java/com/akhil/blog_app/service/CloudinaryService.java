package com.akhil.blog_app.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class CloudinaryService {

    @Value("${CLOUDINARY_CLOUD_NAME}")
    private String cloudName;

    @Value("${CLOUDINARY_API_KEY}")
    private String apiKey;

    @Value("${CLOUDINARY_API_SECRET}")
    private String apiSecret;

    private Cloudinary cloudinary;

    @PostConstruct
    public void init() {
        cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key",    apiKey,
                "api_secret", apiSecret
        ));
    }

    // ✅ Extract public_id from URL and delete
    public void deleteImage(String imageUrl) {
        try {
            if (imageUrl == null || imageUrl.isEmpty()) return;

            // Extract public_id from URL
            // URL: https://res.cloudinary.com/dkqwsd1km/image/upload/v123456/abcd1234.jpg
            // public_id = abcd1234
            String publicId = imageUrl
                    .substring(imageUrl.lastIndexOf("/") + 1)  // get "abcd1234.jpg"
                    .split("\\.")[0];                           // remove extension → "abcd1234"

            cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());

        } catch (Exception e) {
            System.out.println("Failed to delete image from Cloudinary: " + e.getMessage());
        }
    }
}
