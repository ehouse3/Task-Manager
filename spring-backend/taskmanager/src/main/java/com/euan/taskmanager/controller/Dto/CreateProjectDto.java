package com.euan.taskmanager.controller.dto;

public class CreateProjectDto {
    private String name;
    private Long userId;

    public CreateProjectDto() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
}
