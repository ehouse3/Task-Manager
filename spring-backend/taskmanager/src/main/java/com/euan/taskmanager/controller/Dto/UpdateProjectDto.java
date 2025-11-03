package com.euan.taskmanager.controller.dto;
import com.euan.taskmanager.model.Task;
import java.util.Optional;
import java.util.List;


public class UpdateProjectDto {
    private Optional<String> name;
    private Optional<String> description;
    private Optional<Long> ownerId;
    private Optional<List<Task>> tasks;

    public UpdateProjectDto() {}

    public Optional<String> getName() { return name; }
    public void setName(Optional<String> name) { this.name = name; }

    public Optional<String> getDescription() { return description; }
    public void setDescription(Optional<String> description) { this.description = description; }

    public Optional<Long> getOwnerId() { return ownerId; }
    public void setOwnerId(Optional<Long> ownerId) { this.ownerId = ownerId; }

    public Optional<List<Task>> getTasks() { return this.tasks; }
    public void setTasks(Optional<List<Task>> tasks) { this.tasks = tasks; }
}
