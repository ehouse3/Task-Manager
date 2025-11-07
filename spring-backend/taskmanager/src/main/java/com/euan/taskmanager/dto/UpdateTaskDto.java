package com.euan.taskmanager.dto;
import java.util.Optional;

import com.euan.taskmanager.utils.enums.TaskPriority;
import com.euan.taskmanager.utils.enums.TaskStatus;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UpdateTaskDto {
    private Optional<String> title;
    private Optional<String> description;
    private Optional<TaskStatus> status;
    private Optional<TaskPriority> priority;
    private Optional<Long> projectId;
    private Optional<LocalDateTime> dueDate;
}
