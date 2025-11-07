package com.euan.taskmanager.repository;

import com.euan.taskmanager.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    // use nested property path so Spring Data resolves owner.id and tasks.id
    List<Project> findByUser_Id(Long userId);
    List<Project> findByTasks_Id(Long taskId);
}
