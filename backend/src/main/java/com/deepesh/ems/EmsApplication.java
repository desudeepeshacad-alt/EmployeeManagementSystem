package com.deepesh.ems;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class EmsApplication {

    // Set on Render as an env var, e.g. FRONTEND_URL=https://your-app.vercel.app
    // Falls back to local dev origins if not set.
    @Value("${FRONTEND_URL:http://localhost:5173,http://localhost:3000}")
    private String frontendUrl;

    public static void main(String[] args) {
        SpringApplication.run(EmsApplication.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins(frontendUrl.split(","))
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
            }
        };
    }
}
