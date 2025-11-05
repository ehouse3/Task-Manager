package com.euan.taskmanager.controller.dto;
import java.util.Optional;

import com.euan.taskmanager.utils.enums.TaskPriority;
import com.euan.taskmanager.utils.enums.TaskStatus;

import java.time.LocalDateTime;

public class UpdateTaskDto {
    private Optional<String> title;
    private Optional<String> description;
    private Optional<TaskStatus> status;
    private Optional<TaskPriority> priority;
    private Optional<Long> projectId;
    private Optional<LocalDateTime> dueDate;

    public Optional<String> getTitle() { return title; }
    public void SetTitle(Optional<String> title) { this.title = title; }

    public Optional<String> getDescription() { return description; }
    public void setDescription(Optional<String> description) { this.description = description; }

    public Optional<TaskStatus> getStatus() { return status; }
    public void setStatus(Optional<TaskStatus> status) { this.status = status; }

    public Optional<TaskPriority> getPriority() { return priority; }
    public void setPriority(Optional<TaskPriority> priority) { this.priority = priority; }

    public Optional<Long> getProjectId() { return projectId; }
    public void setProjectId(Optional<Long> projectId) { this.projectId = projectId; }

    public Optional<LocalDateTime> getDueDate() { return dueDate; }
    public void setDueDate(Optional<LocalDateTime> dueDate) { this.dueDate = dueDate; }

}
