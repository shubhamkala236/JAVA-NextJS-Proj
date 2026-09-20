package org.shub.todoapi.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "todos")
@Getter
@Setter
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private boolean completed = false;
    private String createdBy;
    private String updatedBy;
    private LocalDateTime createdOn = LocalDateTime.now();
    private LocalDateTime  updatedOn;
}
