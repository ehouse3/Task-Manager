package com.euan.taskmanager.repository;

import com.euan.taskmanager.model.Task;
import com.euan.taskmanager.utils.enums.TaskPriority;
import com.euan.taskmanager.utils.enums.TaskStatus;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByProject_Id(Long projectId);
    List<Task> findByStatus(TaskStatus status);
    List<Task> findByPriority(TaskPriority priority);
    List<Task> findByAssignedToId(Long userId);
}