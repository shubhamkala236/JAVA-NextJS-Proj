package org.shub.todoapi.dto;

public record AuthResponse(
        String token,
        UserResponse user
) {
}