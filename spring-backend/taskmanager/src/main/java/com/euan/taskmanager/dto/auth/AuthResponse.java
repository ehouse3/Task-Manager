package com.euan.taskmanager.dto.auth;

import com.euan.taskmanager.utils.enums.UserRole;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private Long userId;
    private String username;
    private String email;
    private UserRole role;
}
