package com.euan.taskmanager.auth;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.Assertions;

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

	@Test
	void contextLoads() {
		// Verify Spring context loads successfully
		assertNotNull(authService);
		assertNotNull(userService);
	}

	// Test Reigstration success
	@Test
	@Transactional
	void testRegisterSuccess() {
		// Create base case
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

		// Extract test user
		Optional<User> userOptional = userService.getUserById(authResponse.getUserId());
		assertNotNull(userOptional);
		User user = userOptional.get();

		// User properties verification
		assertEquals(baseUser.getEmail(), user.getEmail());
		assertEquals(baseUser.getUsername(), user.getUsername());
		assertEquals(baseUser.getRole(), UserRole.USER);

		// Project verification
		List<Project> testProjects = userService.getProjectsByUserId(user.getId());
		assertEquals(baseUser.getProjects(), testProjects);

		// Password verification
		assertTrue(passwordEncoder.matches(baseUser.getPassword(), user.getPassword()));
	}

	// Test Registration and Login success
	@Test
	@Transactional
	void testRegisterLoginSucess() {
		// Create base case
		User baseUser = new User(1L, UserRole.USER, "username", "nickname",
				"email@test.com", "test_password", new ArrayList<Project>());
		RegisterRequest registerRequest = new RegisterRequest("username",
				"email@test.com", "test_password");

		AuthResponse registerResponse = authService.register(registerRequest);

		// Verify registered user
		Optional<User> testRegisteredUserOptional = userService.getUserById(registerResponse.getUserId());
		assertNotNull(testRegisteredUserOptional);

		// Login User
		LoginRequest loginRequest = new LoginRequest(baseUser.getUsername(),
				baseUser.getPassword());
		AuthResponse loginResponse = authService.login(loginRequest);

		// Extract logged in user
		Optional<User> userOptional = userService.getUserById(loginResponse.getUserId());
		assertNotNull(userOptional);
		User user = userOptional.get();

		// Id is sequentially assigned, verify returned registered Id matches login Id
		assertEquals(registerResponse.getUserId(), user.getId());

		assertEquals(baseUser.getEmail(), user.getEmail());
		assertEquals(baseUser.getUsername(), user.getUsername());
		assertEquals(baseUser.getRole(), UserRole.USER);

		// Password verification
		assertTrue(passwordEncoder.matches(baseUser.getPassword(),
				user.getPassword()));

		// Project verification
		List<Project> testProjects = userService.getProjectsByUserId(user.getId());
		assertEquals(baseUser.getProjects(), testProjects);
	}

	// Test Registration, fail because email already exists
	@Test
	@Transactional
	void testRegisterFailure_EmailExists() {
		RegisterRequest registerRequest1 = new RegisterRequest("username1",
				"email@test.com", "test_password");
		authService.register(registerRequest1);

		RegisterRequest registerRequest2 = new RegisterRequest("username2",
				"email@test.com", "test_password"); // Duplicate Email

		Assertions.assertThrows(IllegalArgumentException.class,
				() -> authService.register(registerRequest2), "Expected register to throw IllegalArgumentException");
	}

	// Test Registration, fail because username already exists
	@Test
	@Transactional
	void testRegisterFailure_UsernameExists() {
		RegisterRequest registerRequest1 = new RegisterRequest("username",
				"email1@test.com", "test_password");
		authService.register(registerRequest1);

		RegisterRequest registerRequest2 = new RegisterRequest("username",
				"email2@test.com", "test_password"); // Duplicate Username

		Assertions.assertThrows(IllegalArgumentException.class,
				() -> authService.register(registerRequest2), "Expected register to throw IllegalArgumentException");
	}

	// Test Registration and login, fail because username incorrect
	@Test
	@Transactional
	void testRegisterLoginFailure_IncorrectUsername() {
		RegisterRequest registerRequest = new RegisterRequest("username",
				"email@test.com", "test_password");
		authService.register(registerRequest);

		LoginRequest loginRequest = new LoginRequest("wrongusername",
				"test_password");

		Assertions.assertThrows(IllegalArgumentException.class,
				() -> authService.login(loginRequest), "Expected register to throw IllegalArgumentException");
	}

	// Test Registration and login, fail because password incorrect
	@Test
	@Transactional
	void testRegisterLoginFailure_IncorrectPassword() {
		RegisterRequest registerRequest = new RegisterRequest("username",
				"email@test.com", "test_password");
		authService.register(registerRequest);

		LoginRequest loginRequest = new LoginRequest("username", "wrongpassword"); // Incorrect Password

		Assertions.assertThrows(IllegalArgumentException.class,
				() -> authService.login(loginRequest), "Expected register to throw IllegalArgumentException");
	}

}
