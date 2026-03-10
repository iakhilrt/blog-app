package com.akhil.blog_app.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${JWT_SECRET}")
    private String SECRET;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET.getBytes());
    }

    // GENERATE TOKEN
    public String generateToken(String email, String role) {
        return Jwts.builder()
                .subject(email)                    // ← was setSubject()
                .claim("role", role)
                .issuedAt(new Date())              // ← was setIssuedAt()
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                .signWith(getSigningKey())         // ← no need for algorithm parameter
                .compact();
    }

    // GET EMAIL FROM TOKEN
    public String extractEmail(String token) {
        return getClaims(token).getSubject();
    }

    // GET ROLE FROM TOKEN
    public String extractRole(String token) {
        return getClaims(token).get("role", String.class);
    }

    // CHECK IF TOKEN IS VALID
    public boolean isTokenValid(String token) {
        return getClaims(token).getExpiration().after(new Date());
    }

    // HELPER — Read token contents
    private Claims getClaims(String token) {
        return Jwts.parser()                       // ← was parserBuilder()
                .verifyWith(getSigningKey())        // ← was setSigningKey()
                .build()
                .parseSignedClaims(token)          // ← was parseClaimsJws()
                .getPayload();                     // ← was getBody()
    }
}