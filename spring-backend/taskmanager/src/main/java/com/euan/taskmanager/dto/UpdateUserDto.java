package com.euan.taskmanager.dto;

import com.euan.taskmanager.model.Project;
import com.euan.taskmanager.utils.enums.UserRole;
import java.util.Optional;
import java.util.List;

import lombok.Data;

@Data
public class UpdateUserDto {
    private Optional<UserRole> role;
    private Optional<String> username;
    private Optional<String> nickName;
    private Optional<String> email;
    private Optional<String> password;
    private Optional<List<Project>> projects;
}