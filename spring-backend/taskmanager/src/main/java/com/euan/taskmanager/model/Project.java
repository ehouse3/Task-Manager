package com.euan.taskmanager.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Transient;
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

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    // expose userId in JSON (read/write) while keeping user relationship in the model
    @Transient
    private Long userId;

    @JsonProperty("userId")
    public Long getuserId() {
        if (this.user != null) return this.user.getId();
        return this.userId;
    }

    @JsonProperty("userId")
    public void setuserId(Long userId) {
        this.userId = userId;
        if (userId != null) {
            if (this.user == null) this.user = new User();
            this.user.setId(userId);
        }
    }
    
    // fix
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private List<Task> tasks;

}