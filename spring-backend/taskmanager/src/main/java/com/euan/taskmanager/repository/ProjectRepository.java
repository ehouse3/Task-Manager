package com.euan.taskmanager.repository;

import com.euan.taskmanager.model.Project;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    
    // Retrieves a Project by their Id, eager fetching Tasks alongside
    @EntityGraph(attributePaths = { "projects" })
    @Query("SELECT p FROM Project p WHERE p.id = :id")
    List<Project> findByIdWithTasks(@Param("id") Long id);
}
