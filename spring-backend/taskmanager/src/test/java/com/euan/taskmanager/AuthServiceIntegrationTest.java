package com.euan.taskmanager;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

import com.euan.taskmanager.service.UserService;
import com.euan.taskmanager.utils.enums.UserRole;

import jakarta.transaction.Transactional;

import com.euan.taskmanager.dto.auth.AuthResponse;
import com.euan.taskmanager.dto.auth.LoginRequest;
import com.euan.taskmanager.dto.auth.RegisterRequest;
import com.euan.taskmanager.model.Project;
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

	private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	private static final Logger logger = LoggerFactory.getLogger(AuthServiceIntegrationTests.class);

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
		// Create test data
		User baseUser = new User(1L, UserRole.USER, "username", "nickname",
				"email@test.com", "test_password", new ArrayList<Project>());
		RegisterRequest registerRequest = new RegisterRequest("username",
				"email@test.com", "test_password");

		AuthResponse authResponse = authService.register(registerRequest);

		// Verify Response
		assertNotNull(authResponse);
		assertNotNull(authResponse.getToken());
		assertNotNull(authResponse.getUserId());
		assertNotEquals(authResponse.getToken(), "");
		assertEquals(baseUser.getId(), authResponse.getUserId()); // Not an accurate test. userId is assigned sequentially

		// Extract test user
		Optional<User> testUserOptional = userService.getUserById(authResponse.getUserId());
		assertNotNull(testUserOptional);
		User testUser = testUserOptional.get();

		// User properties verification
		assertEquals(baseUser.getId(), testUser.getId()); // Not an accurate test. userId is assigned sequentially
		assertEquals(baseUser.getEmail(), testUser.getEmail());
		assertEquals(baseUser.getUsername(), testUser.getUsername());

		// Project verification
		List<Project> testProjects = userService.getProjectsByUserId(testUser.getId());
		assertEquals(baseUser.getProjects(), testProjects);

		// Password verification
		assertTrue(passwordEncoder.matches(baseUser.getPassword(), testUser.getPassword()));
	}

	@Test
	void testAuthLogin() {

	}

	// Create Duplicate User Test

	// Create Wrong Login Information Test

	// Create Register and Login in one test

}
