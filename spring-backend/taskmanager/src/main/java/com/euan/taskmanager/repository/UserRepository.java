package com.euan.taskmanager.repository;

import com.euan.taskmanager.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

// Acts as sql database interaction for user operations

@Repository
public interface UserRepository extends JpaRepository<User, Long> { 
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}