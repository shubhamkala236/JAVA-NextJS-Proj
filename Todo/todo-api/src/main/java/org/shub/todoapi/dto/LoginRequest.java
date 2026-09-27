package org.shub.todoapi.dto;

public record LoginRequest(
        String username,
        String password
) {
}