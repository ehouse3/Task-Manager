package com.euan.taskmanager.dto;
import java.util.Optional;
import java.util.List;

import lombok.Data;


@Data
public class UpdateProjectDto {
    private Optional<String> name;
    private Optional<String> description;
    private Optional<Long> userId;
    private Optional<List<Long>> taskIds;
}
