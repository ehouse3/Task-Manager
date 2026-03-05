package com.euan.taskmanager.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.euan.taskmanager.dto.CreateProjectDto;
import com.euan.taskmanager.dto.UpdateProjectDto;
import com.euan.taskmanager.model.Project;
import com.euan.taskmanager.model.User;
import com.euan.taskmanager.repository.ProjectRepository;
import com.euan.taskmanager.repository.TaskRepository;
import com.euan.taskmanager.repository.UserRepository;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TaskRepository taskRepository;

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    /** Get project by project ID */
    public Optional<Project> getProjectById(Long id) {
        return projectRepository.findById(id);
    }

    /** Create project */
    public Project createProject(CreateProjectDto dto) {
        if (userRepository.existsById(dto.getUserId()) == false) {
            throw new RuntimeException("Project Owner Not Found");
        }

        Project project = new Project();
        project.setId(null);
        project.setName(dto.getName());

        User user = userRepository.findById(dto.getUserId()).get();
        List<Project> projects = user.getProjects();
        projects.add(project);
        user.setProjects(projects);

        return projectRepository.save(project);
    }

    /** Update project by project ID */
    public Project updateProject(Long id, UpdateProjectDto dto) {
        if (projectRepository.existsById(id) == false)
            throw new RuntimeException("Project not found");

        // Assign new data, leaving null values unchanged
        Project project = projectRepository.findById(id).get();
        if (dto.getName().isPresent())
            project.setName(dto.getName().get());
        if (dto.getDescription().isPresent())
            project.setDescription(dto.getDescription().get());

        return projectRepository.save(project);
    }

    /** Delete projecy by project ID */
    public void deleteProject(Long userId, Long projectId) {
        // Deletes project through parent user, letting orphanRemoval clean up
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        
        // Find user's project to remove
        Project project = user.getProjects().stream()
            .filter(p -> p.getId().equals(projectId))
            .findFirst()
            .orElseThrow(() -> new RuntimeException("Project not found or doesn't belong to user"));

        user.getProjects().remove(project);
        userRepository.save(user);


    }
}
