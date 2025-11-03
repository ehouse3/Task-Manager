package com.euan.taskmanager.controller;

import com.euan.taskmanager.controller.dto.CreateProjectDto;
import com.euan.taskmanager.controller.dto.UpdateProjectDto;
import com.euan.taskmanager.model.Project;
import com.euan.taskmanager.model.User;
import com.euan.taskmanager.repository.ProjectRepository;
import com.euan.taskmanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:3000")
public class ProjectController {
    
    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository;
    
    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {
        List<Project> projects = projectRepository.findAll();
        return ResponseEntity.ok(projects);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        return projectRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Project> createProject(@RequestBody CreateProjectDto dto) {
        if (dto.getOwnerId() == null) {
            return ResponseEntity.badRequest().build();
        }

        User owner = userRepository.findById(dto.getOwnerId())
            .orElse(null);
        if (owner == null) {
            return ResponseEntity.badRequest().build();
        }

        Project project = new Project();
        project.setId(null);
        project.setName(dto.getName());
        project.setDescription(dto.getDescription());
        project.setOwner(owner);

        Project savedProject = projectRepository.save(project);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProject);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable Long id, @RequestBody UpdateProjectDto dto) {
        // Handle empty project
        Optional<Project> projecOptional = projectRepository.findById(id);    
        if (projecOptional.isEmpty()) return ResponseEntity.notFound().build();

        // Assign new data, leaving null dto args unchanged
        Project project = projecOptional.get();
        if (dto.getName() != null) project.setName(dto.getName().get());
        if (dto.getDescription() != null) project.setDescription(dto.getDescription().get());
        if (dto.getOwnerId() != null) {
            User owner = userRepository.findById(dto.getOwnerId().get()).orElse(null);
            if (owner != null) project.setOwner(owner);
        }

        Project updatedProject =  projectRepository.save(project);
        return ResponseEntity.ok(updatedProject);
            
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        if (projectRepository.existsById(id)) {
            projectRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}