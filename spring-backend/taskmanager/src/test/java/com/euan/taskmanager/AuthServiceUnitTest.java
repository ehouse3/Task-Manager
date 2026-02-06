package com.euan.taskmanager;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.euan.taskmanager.dto.auth.AuthResponse;
import com.euan.taskmanager.dto.auth.RegisterRequest;
import com.euan.taskmanager.model.User;
import com.euan.taskmanager.repository.UserRepository;
import com.euan.taskmanager.service.AuthService;
import com.euan.taskmanager.utils.JwtUtil;
import com.euan.taskmanager.utils.enums.UserRole;

/**
 * Unit tests for Authservice with Mockito
 * No Database Needed
 */
@MockitoSettings(strictness = Strictness.LENIENT) // Fix
@ExtendWith(MockitoExtension.class)
class AuthServiceUnitTests {

    @Mock
    private UserRepository userRepository;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private AuthService authService;

    private BCryptPasswordEncoder passwordEncoder;

    @BeforeEach
    void setUp() {
        passwordEncoder = new BCryptPasswordEncoder();
    }

    /** Assigns RegisterRequest to new User object*/
    User createMockUser(RegisterRequest request) {
        User user = new User();
        user.setId(1L);
        user.setEmail(request.getEmail());
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(UserRole.USER);

        return user;
    }

    /** Unit tests a successful registration of a user */
    @Test
    void testRegisterSuccess() {

        RegisterRequest request = new RegisterRequest("username", "email", "password");
        User user = createMockUser(request);

        // Simulate mock repository
        when(userRepository.existsByEmail(request.getEmail())).thenReturn(false);
        when(userRepository.existsByUsername(request.getUsername())).thenReturn(false);
        when(userRepository.save(any(User.class))).thenReturn(user);
        when(jwtUtil.generateToken(request.getUsername(), 1L)).thenReturn("mock-token");

        AuthResponse response = authService.register(request);

        assertNotNull(response);
        assertEquals(1L, response.getUserId());
        assertEquals("mock-token", response.getToken());
    }

    /** Unit tests an unsuccessful registration of a user, because of an already existing email */
    @Test
    void testRegisterFailure_EmailExists() {

        RegisterRequest request = new RegisterRequest("username", "email", "password");
        User user = createMockUser(request);

        // Simulate mock repository
        when(userRepository.existsByEmail(request.getEmail())).thenReturn(true); // email already exists
        when(userRepository.existsByUsername(request.getUsername())).thenReturn(false);
        when(userRepository.save(any(User.class))).thenReturn(user);
        when(jwtUtil.generateToken(request.getUsername(), 1L)).thenReturn("mock-token");

        // AuthResponse response = authService.register(request);
        IllegalArgumentException thrown = Assertions.assertThrows(IllegalArgumentException.class,
                () -> authService.register(request), "Expected register to throw IllegalArgumentException");
        
        assertEquals(thrown.getMessage(), "Email already exists");
            

    }

    /** Unit tests an unsuccessful registration of a user, because of an already existing username */
    @Test
    void testRegisterFailure_UsernameExists() {

        RegisterRequest request = new RegisterRequest("username", "email", "password");
        User user = createMockUser(request);

        // Simulate mock repository
        when(userRepository.existsByEmail(request.getEmail())).thenReturn(false);
        when(userRepository.existsByUsername(request.getUsername())).thenReturn(true);
        when(userRepository.save(any(User.class))).thenReturn(user);
        when(jwtUtil.generateToken(request.getUsername(), 1L)).thenReturn("mock-token");

        // AuthResponse response = authService.register(request);
        IllegalArgumentException thrown = Assertions.assertThrows(IllegalArgumentException.class,
                () -> authService.register(request), "Expected register to throw IllegalArgumentException");
        
        assertEquals(thrown.getMessage(), "Username already exists");

    }

}