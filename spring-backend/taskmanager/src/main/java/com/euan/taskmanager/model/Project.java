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
    @JoinColumn(name = "owner_id", nullable = false)
    @JsonIgnore
    private User owner;

    // expose ownerId in JSON (read/write) while keeping owner relationship in the model
    @Transient
    private Long ownerId;

    @JsonProperty("ownerId")
    public Long getOwnerId() {
        if (this.owner != null) return this.owner.getId();
        return this.ownerId;
    }

    @JsonProperty("ownerId")
    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
        if (ownerId != null) {
            if (this.owner == null) this.owner = new User();
            this.owner.setId(ownerId);
        }
    }
    
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private List<Task> tasks;

}