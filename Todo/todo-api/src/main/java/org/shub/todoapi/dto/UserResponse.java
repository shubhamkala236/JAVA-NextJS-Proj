package org.shub.todoapi.dto;

import org.shub.todoapi.entity.Role;

public record UserResponse(
        Long id,
        String username,
        String email,
        Role role,
        boolean enabled
) {
}