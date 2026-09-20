package org.shub.todoapi.service;

import org.shub.todoapi.dto.CreateTodoRequest;
import org.shub.todoapi.dto.TodoResponse;
import org.shub.todoapi.dto.UpdateTodoRequest;

import java.util.List;

public interface TodoService {
    List<TodoResponse> getTodos();

    TodoResponse getTodo(Long id);

    TodoResponse createTodo(CreateTodoRequest request);

    TodoResponse updateTodo(Long id, UpdateTodoRequest request);

    void deleteTodo(Long id);
}
