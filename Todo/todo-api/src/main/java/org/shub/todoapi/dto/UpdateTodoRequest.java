package org.shub.todoapi.dto;

import org.shub.todoapi.entity.Todo;

public record UpdateTodoRequest(Long todoId, String title, String description, boolean completed ) {
}
