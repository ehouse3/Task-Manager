package com.euan.taskmanager.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.euan.taskmanager.controller.dto.CreateProjectDto;
import com.euan.taskmanager.controller.dto.UpdateProjectDto;
import com.euan.taskmanager.model.Project;
import com.euan.taskmanager.repository.ProjectRepository;

@Service
public class ProjectService {
    
    @Autowired
    private ProjectRepository projectRepository;

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    // Get user by ID
    public Optional<Project> getProjectById(Long id) {
        return projectRepository.findById(id);
    }

    public Optional<Project> createProject(CreateProjectDto dto) {
        
    }

    public Project updateProject(Long id, UpdateProjectDto project) {

    }

    public void deleteProject(Long id) {

    }
}
