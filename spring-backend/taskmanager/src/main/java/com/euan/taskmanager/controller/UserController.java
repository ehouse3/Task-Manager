package com.euan.taskmanager.controller;

import com.euan.taskmanager.model.User;
import com.euan.taskmanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    
    @Autowired
    private UserRepository userRepository;
    
    // Get all users
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    // Get user by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    // Get user by username
    @GetMapping("/username/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        return userRepository.findByUsername(username)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    // Create (or return) a root user for quick testing
    // POST /api/users/username/createuser
    // @PostMapping("/username/createuser")
    // public ResponseEntity<User> createUser() {
    //     final String rootUsername = "root";
    //     final String rootEmail = "root@example.com";
    //     final String rootPassword = "root123"; // only for testing
    //     System.out.println("CREATING USER"); 

    //     // If a user with username 'root' already exists return it
    //     return userRepository.findByUsername(rootUsername)
    //         .map(ResponseEntity::ok)
    //         .orElseGet(() -> {
    //             // If the email is already used by another user, return that user
    //             if (userRepository.existsByEmail(rootEmail)) {
    //                 return userRepository.findByEmail(rootEmail)
    //                     .map(ResponseEntity::ok)
    //                     .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    //             }

    //             // Create a new User entity without forcing the ID (let JPA generate it)
    //             User root = new User(null, rootUsername, rootEmail, rootPassword);
    //             System.out.println("creating new user: "+root);
    //             User saved = userRepository.save(root);
    //             return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    //         });
    // }
    // Create user
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        // Check if username or email already exists
        if (userRepository.existsByUsername(user.getUsername())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        
        User savedUser = userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }
    
    // Update user
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        return userRepository.findById(id)
            .map(user -> {
                user.setUsername(userDetails.getUsername());
                user.setEmail(userDetails.getEmail());
                if (userDetails.getPassword() != null) {
                    user.setPassword(userDetails.getPassword());
                }
                User updatedUser = userRepository.save(user);
                return ResponseEntity.ok(updatedUser);
            })
            .orElse(ResponseEntity.notFound().build());
    }
    
    // Delete user
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}