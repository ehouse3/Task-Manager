package com.euan.taskmanager.controller;

import com.euan.taskmanager.model.Project;
import com.euan.taskmanager.service.ProjectService;
import com.euan.taskmanager.dto.CreateProjectDto;
import com.euan.taskmanager.dto.UpdateProjectDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:3000")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    /** Get request to get all projects */
    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {
        List<Project> projects = projectService.getAllProjects();
        return ResponseEntity.ok(projects);
    }

    /** Get request to get project by project ID */
    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        return projectService.getProjectById(id)
                .map(project -> {
                    return ResponseEntity.ok(project);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    /** Post request to create new project */
    @PostMapping
    public ResponseEntity<?> createProject(@RequestBody CreateProjectDto dto) {
        try {
            Project createdProject = projectService.createProject(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdProject);
        } catch (RuntimeException e) { // Exception thrown from service
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    /** Put request to update project by project ID */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProject(@PathVariable Long id, @RequestBody UpdateProjectDto dto) {
        try {
            Project updatedProject = projectService.updateProject(id, dto);
            return ResponseEntity.ok(updatedProject);
        } catch (RuntimeException e) { // Exception thrown from service
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }

    }

    /** Delete request to delete project by project ID */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable Long id) {
        try {
            projectService.deleteProject(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) { // Exception thrown from service
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}