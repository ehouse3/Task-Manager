package com.euan.taskmanager;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

import com.euan.taskmanager.service.UserService;
import com.euan.taskmanager.utils.enums.UserRole;
import com.euan.taskmanager.dto.auth.AuthResponse;
import com.euan.taskmanager.dto.auth.LoginRequest;
import com.euan.taskmanager.dto.auth.RegisterRequest;
import com.euan.taskmanager.model.User;
import com.euan.taskmanager.repository.UserRepository;
import com.euan.taskmanager.service.AuthService;

/**
 * Integration tests that start the full Spring context with H2 database
 */
@SpringBootTest
@ActiveProfiles("test")
@TestPropertySource(locations = "classpath:/application-test.properties")
class AuthServiceIntegrationTests {

	@Autowired
	private UserService userService;

	@Autowired
	private AuthService authService;

	// @Autowired
	// private UserRepository userRepository;

	@Test
	void contextLoads() {
		// Verify Spring context loads successfully
		assertNotNull(authService);
		assertNotNull(userService);
	}

	@Test
	void testAuthRegister() {
		// // Create test data
		User baseUser = new User(1L, UserRole.USER, "username", "nickname",
				"email@test.com", "test_password", new ArrayList<>());
		RegisterRequest registerRequest = new RegisterRequest("username",
				"email@test.com", "test_password");

		AuthResponse authResponse = authService.register(registerRequest);

		assertNotNull(authResponse);
		assertNotNull(authResponse.getUserId()); 
		assertNotNull(authResponse.getToken());
		assertEquals(baseUser.getId(), authResponse.getUserId()); // Verify

		Optional<User> testUserOptional = userService.getUserById(authResponse.getUserId());
		assertNotNull(testUserOptional);
		User testUser = testUserOptional.get();
		
		assertEquals(testUser.getId(), baseUser.getId());
		assertEquals(testUser.getEmail(), baseUser.getEmail());
	}

	@Test
	void testAuthLogin() {
		
	}

	// Create Duplicate User Test

	// Create Wrong Login Information Test

	// Create Register and Login in one test

}
