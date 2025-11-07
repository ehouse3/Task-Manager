package com.euan.taskmanager.dto;

import lombok.Data;

@Data
public class CreateProjectDto {
    private String name;
    private Long userId;
}
