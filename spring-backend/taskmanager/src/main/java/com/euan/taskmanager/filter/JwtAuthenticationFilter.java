package com.euan.taskmanager.filter;

import com.euan.taskmanager.utils.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.lang.NonNull;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

// Verifies Jwt once per request
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    // Public endpoints
    private static final List<String> publicEndpoints = List.of(
            "/api/auth",
            "/api/test");

    /**
     * Returns true if requestPath starts with a public endpoint, false otherwise
     */
    private boolean isPublicEndpoint(String requestPath) {
        for (String prefix : publicEndpoints) {
            if (requestPath.startsWith(prefix)) {
                return true;
            }
        }
        return false;
    }

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {

        logger.debug("Processing request: {} {}", request.getMethod(), request.getRequestURI());

        String requestPath = request.getRequestURI();

        // Bypass token verification for public endpoints
        if (isPublicEndpoint(requestPath)) {
            logger.debug("Bypassing JWT filter for public endpoint: {}", requestPath);
            filterChain.doFilter(request, response);
            return;
        }

        // Get token from Authorization header
        String authHeader = request.getHeader("Authorization");
        logger.debug("Authorization header present: {}", authHeader != null);

        // Catch tokenless authorizations: throw exception to trigger
        // AuthenticationEntryPoint
        if (authHeader == null || !authHeader.startsWith("Bearer ")) { // header exits? (does not verify)
            logger.warn("Missing or invalid Authorization header for request: {} {}", request.getMethod(),
                    request.getRequestURI());
            throw new BadCredentialsException("Missing or invalid Authorization header");
        }

        String token = authHeader.substring(7); // Retrieve token
        logger.debug("Extracted JWT token, validating...");

        // Validate token
        if (jwtUtil.validateToken(token) == false) {
            logger.warn("Invalid or expired JWT token for request: {} {} with exttracted token {}", request.getMethod(),
                    request.getRequestURI(), token);
            throw new BadCredentialsException("Invalid or expired JWT token"); // triggers AuthenticationEntryPoint
        }

        String username = jwtUtil.getUsernameFromToken(token);
        logger.debug("JWT validated successfully for user: {}", username);

        // Set authentication in context
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(username,
                null, new ArrayList<>());
        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        // Assign authentication
        SecurityContextHolder.getContext().setAuthentication(authentication);
        logger.debug("Authentication set in SecurityContext for user: {}", username);

        filterChain.doFilter(request, response);
    }
}