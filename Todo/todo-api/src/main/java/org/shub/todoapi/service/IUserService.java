package org.shub.todoapi.service;

import org.shub.todoapi.dto.*;

public interface IUserService {
    UserResponse createUser(RegisterRequest request);

    AuthResponse login(LoginRequest request);

    UserResponse getUser(Long id);

    UserResponse updateUser(
            Long id,
            UpdateUserRequest request);

    void deleteUser(Long id);
}
