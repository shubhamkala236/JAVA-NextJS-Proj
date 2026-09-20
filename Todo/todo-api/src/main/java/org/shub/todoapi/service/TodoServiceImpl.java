package org.shub.todoapi.service;

import org.jspecify.annotations.NonNull;
import org.shub.todoapi.dto.CreateTodoRequest;
import org.shub.todoapi.dto.TodoResponse;
import org.shub.todoapi.dto.UpdateTodoRequest;
import org.shub.todoapi.entity.Todo;
import org.shub.todoapi.repository.TodoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TodoServiceImpl implements TodoService{
    private final TodoRepository todoRepository;

    public TodoServiceImpl(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @Override
    public List<TodoResponse> getTodos() {

        return todoRepository.findAll()
                .stream().map(t -> new TodoResponse(
                        t.getId(),
                        t.getTitle(),
                        t.getDescription(),
                        t.isCompleted(),
                        t.getCreatedBy(),
                        t.getUpdatedBy(),
                        t.getCreatedOn(),
                        t.getUpdatedOn()
                )).toList();
    }

    @Override
    public TodoResponse getTodo(Long id) {
        Todo todo = todoRepository.findById(id).orElseThrow(() -> new RuntimeException("Todo not found"));
        return toResponse(todo);
    }

    @Override
    public TodoResponse createTodo(CreateTodoRequest request) {

        Todo todo = new Todo();

        todo.setTitle(request.title());
        todo.setDescription(request.description());
        todo.setCompleted(false);
        todo.setCreatedOn(LocalDateTime.now());
        todo.setCreatedBy(request.createdBy());

        Todo savedTodo = todoRepository.save(todo);

        return toResponse(savedTodo);
    }


    @Override
    public TodoResponse updateTodo(Long id, UpdateTodoRequest request) {

        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found"));

        todo.setTitle(request.title());
        todo.setDescription(request.description());
        todo.setCompleted(request.completed());
        todo.setUpdatedOn(LocalDateTime.now());

        Todo updatedTodo = todoRepository.save(todo);

        return toResponse(updatedTodo);
    }

    @Override
    public void deleteTodo(Long id) {

        if (!todoRepository.existsById(id)) {
            throw new RuntimeException("Todo not found");
        }

        todoRepository.deleteById(id);
    }

    private TodoResponse toResponse(Todo todo) {

        return new TodoResponse(
                todo.getId(),
                todo.getTitle(),
                todo.getDescription(),
                todo.isCompleted(),
                todo.getCreatedBy(),
                todo.getUpdatedBy(),
                todo.getCreatedOn(),
                todo.getUpdatedOn()
        );
    }
}
