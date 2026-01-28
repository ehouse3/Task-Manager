package com.euan.taskmanager;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.ArrayList;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import org.mockito.Mock;

import com.euan.taskmanager.service.UserService;
import com.euan.taskmanager.utils.enums.UserRole;
import com.euan.taskmanager.dto.auth.AuthResponse;
import com.euan.taskmanager.dto.auth.LoginRequest;
import com.euan.taskmanager.dto.auth.RegisterRequest;
import com.euan.taskmanager.model.Project;
import com.euan.taskmanager.model.User;
import com.euan.taskmanager.service.AuthService;;

@SpringBootTest
class TaskmanagerApplicationTests {

	@Mock
	private UserService userService;

	@Mock
	private AuthService authService;

	@Test
	void testAuthRegister() {
		User user = new User(null, UserRole.USER, "username", "nickname", "email", "password", new ArrayList<>());
		RegisterRequest registerRequest = new RegisterRequest(user.getUsername(), user.getEmail(), user.getPassword());

		// Register new user
		AuthResponse response = authService.register(registerRequest);

		// Retrieve new registered user
		User outputUser = userService.getUserById(response.getUserId())
				.orElseThrow(() -> new IllegalArgumentException("Creation of user was null"));
		assertNotNull(user);

		// Testing
		assertEquals(user.getUsername(), outputUser.getUsername());
		assertEquals(user.getEmail(), outputUser.getEmail());
		assertEquals(user.getNickName(), outputUser.getNickName());
		assertEquals(user.getRole(), outputUser.getRole());

		assertNotNull(outputUser.getId());
		assertNotNull(outputUser.getPassword());
	}

	@Test
	void testAuthLogin() {
		User user = new User(null, UserRole.USER, "loginuser", "loginnickname", "login@email.com", "loginpassword",
				new ArrayList<>());
		RegisterRequest registerRequest = new RegisterRequest(user.getUsername(), user.getEmail(), user.getPassword());

		// Register the user
		authService.register(registerRequest);

		// Login with the same credentials
		LoginRequest loginRequest = new LoginRequest(user.getUsername(), user.getPassword());
		AuthResponse loginResponse = authService.login(loginRequest);

		User outputUser = userService.getUserById(loginResponse.getUserId())
				.orElseThrow(() -> new IllegalArgumentException("Login failed"));
		assertNotNull(outputUser);

		// Testing
		assertEquals(user.getUsername(), outputUser.getUsername());
		assertEquals(user.getEmail(), outputUser.getEmail());
		assertEquals(user.getNickName(), outputUser.getNickName());
		assertEquals(user.getRole(), outputUser.getRole());

		assertNotNull(outputUser.getId());
		assertNotNull(outputUser.getPassword());
	}

}
