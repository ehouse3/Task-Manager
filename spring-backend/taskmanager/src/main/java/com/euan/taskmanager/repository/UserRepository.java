package com.euan.taskmanager.repository;

import com.euan.taskmanager.model.User;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    // Retrieves a User by their Id, eager fetching projects alongside
    @EntityGraph(attributePaths = { "projects" })
    @Query("SELECT u FROM User u WHERE u.id = :id")
    Optional<User> findByIdWithProjects(@Param("id") Long id);

}