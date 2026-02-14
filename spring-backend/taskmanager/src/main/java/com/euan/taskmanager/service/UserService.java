package com.euan.taskmanager.service;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.euan.taskmanager.dto.UpdateUserDto;
import com.euan.taskmanager.model.Project;
import com.euan.taskmanager.model.User;
import com.euan.taskmanager.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    /** Get all users */
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /** Get user by user ID */
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
        // Possible fix for lazy fetch
        // return userRepository.findById(id).map(user -> {
        // Hibernate.initialize(user.getProjects());
        // return user;
        // });
    }

    /** Get user by username */
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // createUser() is done through register() in Auth

    /** Update user by user ID */
    public User updateUser(long id, UpdateUserDto dto) { // update user dto?
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (dto.getRole().isPresent())
            user.setRole(dto.getRole().get());
        if (dto.getUsername().isPresent())
            user.setUsername(dto.getUsername().get());
        if (dto.getNickName().isPresent())
            user.setNickName(dto.getNickName().get());
        if (dto.getEmail().isPresent())
            user.setEmail(dto.getEmail().get());

        if (dto.getPassword().isPresent()) {
            if (dto.getPassword().get().isEmpty()) { // valid password (len > 0)
                user.setPassword(dto.getPassword().get());
            }
        }
        if (dto.getProjects().isPresent())
            user.setProjects(dto.getProjects().get());

        return userRepository.save(user);
    }

    /** Delete user by user ID */
    public void deleteUser(long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found");
        }
        userRepository.deleteById(id);
    }

    /** Get all projects for user by user ID */
    @Transactional
    public List<Project> getProjectsByUserId(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new ArrayList<>(user.getProjects());
    }

}
