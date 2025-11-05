package com.euan.taskmanager.controller;

import com.euan.taskmanager.controller.dto.CreateTaskDto;
import com.euan.taskmanager.controller.dto.UpdateTaskDto;
import com.euan.taskmanager.model.Task;
import com.euan.taskmanager.service.TaskService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    @Autowired
    private TaskService taskService;

    // Get all tasks
    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks() {
        List<Task> tasks = taskService.getAllTasks();
        return ResponseEntity.ok(tasks);
    }

    // Get task by ID
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        return taskService.getTaskById(id)
                .map(task -> {
                    return ResponseEntity.ok(task);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Create task
    @PostMapping
    public ResponseEntity<?> createTask(@RequestBody CreateTaskDto dto) {
        try {
            Task createdTask = taskService.createTask(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
        } catch (RuntimeException e) { // Exception thrown from service
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    // Update task
    @PutMapping("/{id}")
    public ResponseEntity<?> updateTask(@PathVariable Long id, @RequestBody UpdateTaskDto dto) {
        try {
            Task updatedTask = taskService.updateTask(id, dto);
            return ResponseEntity.ok(updatedTask);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id) {
        try {
            taskService.deleteTask(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) { // Exception thrown from service
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

}
