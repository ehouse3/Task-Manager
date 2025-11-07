package com.euan.taskmanager.dto;

import lombok.Data;

@Data
public class CreateTaskDto {
    private String title;
    private Long projectId;
}
