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

// Verifies Jwt once per request
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);


    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {

        logger.debug("LOGGER TEST");
        
        String requestPath = request.getRequestURI();

        // Bypass token verification for public endpoints
        if (requestPath.startsWith("/api/auth/") || requestPath.startsWith("/api/test/")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Get token from Authorization header
        String authHeader = request.getHeader("Authorization");
        
        // Catch tokenless authorizations: throw exception to trigger AuthenticationEntryPoint
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new BadCredentialsException("Missing or invalid Authorization header");
        }

        String token = authHeader.substring(7); // Retrieve token

        // Validate token
        if (jwtUtil.validateToken(token) == false) {
            throw new BadCredentialsException("Invalid or expired JWT token"); // triggers AuthenticationEntryPoint
        }

        String username = jwtUtil.getUsernameFromToken(token);

        // Set authentication in context
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(username,
                null, new ArrayList<>());
        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        // Assign authentication
        SecurityContextHolder.getContext().setAuthentication(authentication);

        filterChain.doFilter(request, response);
    }
}