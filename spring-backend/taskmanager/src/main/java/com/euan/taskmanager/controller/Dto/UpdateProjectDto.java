package com.euan.taskmanager.controller.dto;
import java.util.Optional;


public class UpdateProjectDto {
    private Optional<String> name;
    private Optional<String> description;
    private Optional<Long> ownerId;

    public UpdateProjectDto() {}

    public Optional<String> getName() { return name; }
    public void setName(Optional<String> name) { this.name = name; }

    public Optional<String> getDescription() { return description; }
    public void setDescription(Optional<String> description) { this.description = description; }

    public Optional<Long> getOwnerId() { return ownerId; }
    public void setOwnerId(Optional<Long> ownerId) { this.ownerId = ownerId; }
}
