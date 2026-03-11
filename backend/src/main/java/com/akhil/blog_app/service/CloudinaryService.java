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

    // Extract public_id from URL and delete
    public void deleteImage(String imageUrl) {
        try {
            if (imageUrl == null || imageUrl.isEmpty()) return;

            // Extract everything after /upload/vXXXXXX/
            // URL: https://res.cloudinary.com/cloud/image/upload/v123456/blog_images/abc.jpg
            // public_id = blog_images/abc

            String afterUpload = imageUrl.substring(imageUrl.indexOf("/upload/") + 8);
            // afterUpload = "v123456/blog_images/abc.jpg"

            // Remove version part (v123456/)
            String withoutVersion = afterUpload.replaceFirst("v\\d+/", "");
            // withoutVersion = "blog_images/abc.jpg"

            // Remove file extension
            String publicId = withoutVersion.substring(0, withoutVersion.lastIndexOf("."));
            // publicId = "blog_images/abc"

            cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
            System.out.println("Deleted from Cloudinary: " + publicId);

        } catch (Exception e) {
            System.out.println("Failed to delete image from Cloudinary: " + e.getMessage());
        }
    }
}
