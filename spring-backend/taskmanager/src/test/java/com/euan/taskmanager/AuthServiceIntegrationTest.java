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
// @TestPropertySource(locations = "classpath:application-test.properties") //
// Redefine properties path to use test db
// @ActiveProfiles("test")
@TestPropertySource(properties = { // TODO: attach to application-test.properties instead
		"spring.datasource.url=jdbc:h2:mem:testdb;MODE=PostgreSQL;DATABASE_TO_LOWER=TRUE;DEFAULT_NULL_ORDERING=HIGH",
		"spring.datasource.driver-class-name=org.h2.Driver",
		"spring.datasource.username=sa",
		"spring.datasource.password=",
		"spring.jpa.hibernate.ddl-auto=create-drop",
		"spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.H2Dialect",
		"spring.jpa.show-sql=false",
		"server.port=8080",
		"logging.level.com.euan.taskmanager=INFO",
		"logging.level.org.hibernate=WARN",
		"logging.level.org.springframework=WARN"
		
})
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
		// User user = new User(1L, UserRole.USER, "username", "nickname",
		// 		"email@test.com", "encodedPassword", new ArrayList<>());
		// RegisterRequest registerRequest = new RegisterRequest("username",
		// 		"email@test.com", "password");

		// // Mock the behavior
		// AuthResponse mockResponse = new AuthResponse("token", 1L);
		// when(authService.register(any(RegisterRequest.class))).thenReturn(mockResponse);
		// when(userService.getUserById(1L)).thenReturn(Optional.of(user));

		// // Register new user
		// AuthResponse response = authService.register(registerRequest);

		// // Retrieve new registered user
		// User outputUser = userService.getUserById(response.getUserId())
		// 		.orElseThrow(() -> new IllegalArgumentException("Creation of user was null"));

		// assertNotNull(outputUser);

		// // Testing
		// assertEquals("username", outputUser.getUsername());
		// assertEquals("email@test.com", outputUser.getEmail());
		// assertEquals("nickname", outputUser.getNickName());
		// assertEquals(UserRole.USER, outputUser.getRole());

		// assertNotNull(outputUser.getId());
		// assertNotNull(outputUser.getPassword());
	}

	@Test
	void testAuthLogin() {
		// User user = new User(null, UserRole.USER, "loginuser", "loginnickname",
		// 		"login@email.com", "loginpassword",
		// 		new ArrayList<>());
		// RegisterRequest registerRequest = new RegisterRequest(user.getUsername(),
		// 		user.getEmail(), user.getPassword());

		// // Register the user
		// authService.register(registerRequest);

		// // Login with the same credentials
		// LoginRequest loginRequest = new LoginRequest(user.getUsername(),
		// 		user.getPassword());
		// AuthResponse loginResponse = authService.login(loginRequest);

		// User outputUser = userService.getUserById(loginResponse.getUserId())
		// 		.orElseThrow(() -> new IllegalArgumentException("Login failed"));
		// assertNotNull(outputUser);

		// // Testing
		// assertEquals(user.getUsername(), outputUser.getUsername());
		// assertEquals(user.getEmail(), outputUser.getEmail());
		// assertEquals(user.getNickName(), outputUser.getNickName());
		// assertEquals(user.getRole(), outputUser.getRole());

		// assertNotNull(outputUser.getId());
		// assertNotNull(outputUser.getPassword());
	}

	// Create Duplicate User Test

	// Create Wrong Login Information Test

	// Create Register and Login in one test

}
