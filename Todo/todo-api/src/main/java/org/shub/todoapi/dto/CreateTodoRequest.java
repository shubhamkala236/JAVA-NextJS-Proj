package org.shub.todoapi.dto;

public record CreateTodoRequest(String title, String description, String createdBy) {
}
