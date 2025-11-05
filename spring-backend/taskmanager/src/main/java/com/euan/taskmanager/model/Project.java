package com.euan.taskmanager.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.persistence.Transient;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "projects")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(length = 1000)
    private String description;

    // User
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @Transient
    public Long getUserId() {
        if (this.user != null)
            return this.user.getId();
        return null;
    }

    // Tasks
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "task_id")
    @JsonIgnore
    private List<Task> tasks;

    @JsonProperty("taskIds")
    public List<Long> getTaskIds() {
        if (tasks != null) {
            List<Long> ids = new ArrayList<>(); // use array map
            for (Task task : tasks) {
                ids.add(task.getId());
            }
            return ids;
        }
        return null;
    }

}