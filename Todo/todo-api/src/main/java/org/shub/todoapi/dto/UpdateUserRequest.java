package org.shub.todoapi.dto;

public record UpdateUserRequest(
        String username,
        String email
) {
}