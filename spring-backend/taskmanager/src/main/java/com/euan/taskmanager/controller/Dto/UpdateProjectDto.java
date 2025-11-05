package com.euan.taskmanager.controller.dto;
import java.util.Optional;
import java.util.List;


public class UpdateProjectDto {
    private Optional<String> name;
    private Optional<String> description;
    private Optional<Long> userId;
    private Optional<List<Long>> taskIds;

    public UpdateProjectDto() {}

    public Optional<String> getName() { return name; }
    public void setName(Optional<String> name) { this.name = name; }

    public Optional<String> getDescription() { return description; }
    public void setDescription(Optional<String> description) { this.description = description; }

    public Optional<Long> getUserId() { return userId; }
    public void setUserId(Optional<Long> userId) { this.userId = userId; }

    public Optional<List<Long>> getTaskIds() { return taskIds; }
    public void setTaskIds(Optional<List<Long>> taskIds) { this.taskIds = taskIds; }
}
