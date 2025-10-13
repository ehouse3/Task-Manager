package com.euan.taskmanager.controller;

import com.euan.taskmanager.model.Project;
import com.euan.taskmanager.model.Task;
import com.euan.taskmanager.repository.TaskRepository;
import com.euan.taskmanager.utils.TaskPriority;
import com.euan.taskmanager.utils.TaskStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @GetMapping
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable Long id) {
        return taskRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        task.setId(null);
        return taskRepository.save(task);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
        return taskRepository.findById(id)
            .map(task -> {
                task.setTitle(taskDetails.getTitle());
                task.setDescription(taskDetails.getDescription());
                task.setStatus(taskDetails.getStatus());
                task.setPriority(taskDetails.getPriority());
                task.setProject(taskDetails.getProject());
                task.setAssignedTo(taskDetails.getAssignedTo());
                task.setDueDate(taskDetails.getDueDate());
                return taskRepository.save(task);
            })
            .orElseThrow(() -> new RuntimeException("Project not found"));
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskRepository.deleteById(id);
    }
    
    
}
