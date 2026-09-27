package org.shub.todoapi.dto;

public record RegisterRequest(
        String username,
        String email,
        String password
) {
}