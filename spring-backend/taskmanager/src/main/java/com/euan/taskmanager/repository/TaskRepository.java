package com.euan.taskmanager.repository;

import com.euan.taskmanager.model.Task;
import com.euan.taskmanager.utils.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import com.euan.taskmanager.utils.TaskPriority;


@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByProjectId(Long projectId);
    List<Task> findByStatus(TaskStatus status);
    List<Task> findByPriority(TaskPriority priority);
    List<Task> findByAssignedToId(Long userId);
}