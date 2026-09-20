package org.shub.todoapi.dto;

import java.time.LocalDateTime;

public record TodoResponse(Long id, String title, String description,
    boolean completed, String createdBy, String updatedBy,
    LocalDateTime createdOn, LocalDateTime  updatedOn) {
}
