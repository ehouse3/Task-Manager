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

    // Get user by ID
    public Optional<Project> getProjectById(Long id) {
        return projectRepository.findById(id);
    }

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

    public Project updateProject(Long id, UpdateProjectDto dto) {
        if (projectRepository.existsById(id) == false)
            throw new RuntimeException("Project not found");

        // Assign new data, leaving null values unchanged
        Project project = projectRepository.findById(id).get();
        if (dto.getName().isPresent())
            project.setName(dto.getName().get());
        if (dto.getDescription().isPresent())
            project.setDescription(dto.getDescription().get());
        if (dto.getTaskIds().isPresent()) { // add more verification?
            project.setTasks(taskRepository.findAllById(dto.getTaskIds().get()));
        }

        return projectRepository.save(project);
    }

    public void deleteProject(Long id) {
        if (projectRepository.existsById(id) == false)
            throw new RuntimeException("Project not found");
        projectRepository.deleteById(id);
    }
}
