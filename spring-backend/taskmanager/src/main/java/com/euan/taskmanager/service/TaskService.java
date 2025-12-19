package com.euan.taskmanager.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.euan.taskmanager.model.Task;
import com.euan.taskmanager.model.Project;
import com.euan.taskmanager.repository.ProjectRepository;
import com.euan.taskmanager.repository.TaskRepository;
import com.euan.taskmanager.dto.CreateTaskDto;
import com.euan.taskmanager.dto.UpdateTaskDto;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private ProjectRepository projectRepository;

    /** Get all tasks */
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    /** Get Task by task ID */
    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    /** Create task */
    public Task createTask(CreateTaskDto dto) {
        if (projectRepository.existsById(dto.getProjectId()) == false)
            throw new RuntimeException("Project not found");
        Task task = new Task();
        task.setId(null);
        task.setTitle(dto.getTitle());

        Project project = projectRepository.findById(dto.getProjectId()).get();
        List<Task> tasks = project.getTasks();
        tasks.add(task);
        project.setTasks(tasks);
        return taskRepository.save(task);
    }

    /** Update task by task ID */
    public Task updateTask(Long id, UpdateTaskDto dto) {
        if (taskRepository.existsById(id) == false)
            throw new RuntimeException("Task not found");

        // Assign new data, leaving null values unchanged
        Task task = taskRepository.findById(id).get();
        if (dto.getTitle().isPresent())
            task.setTitle(dto.getTitle().get());
        if (dto.getDescription().isPresent())
            task.setDescription(dto.getDescription().get());
        if (dto.getStatus().isPresent())
            task.setStatus(dto.getStatus().get());
        if (dto.getPriority().isPresent())
            task.setPriority(dto.getPriority().get());
        if (dto.getDueDate().isPresent())
            task.setDueDate(dto.getDueDate().get());

        return taskRepository.save(task);
    }

    /** Delete task by task ID */
    public void deleteTask(Long id) {
        if (taskRepository.existsById(id))
            throw new RuntimeException("Task not found");
        taskRepository.deleteById(id);
    }
}
