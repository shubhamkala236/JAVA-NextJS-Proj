package org.shub.todoapi.controller;

import org.shub.todoapi.dto.CreateTodoRequest;
import org.shub.todoapi.dto.TodoResponse;
import org.shub.todoapi.dto.UpdateTodoRequest;
import org.shub.todoapi.service.TodoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todos")
public class TodoController {
    //Start
    private final TodoService todoService;
    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping("")
    public List<TodoResponse> getTodos()
    {
        return todoService.getTodos();
    }

    @GetMapping("/{id}")
    public TodoResponse getTodo(@PathVariable Long id) {
        return todoService.getTodo(id);
    }

    @PostMapping
    public TodoResponse createTodo(@RequestBody CreateTodoRequest request) {
        return todoService.createTodo(request);
    }

    // PUT /todos/1
    @PutMapping("/{id}")
    public TodoResponse updateTodo(@PathVariable Long id, @RequestBody UpdateTodoRequest request) {
        return todoService.updateTodo(id, request);
    }

    // DELETE /todos/1
    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id) {
        todoService.deleteTodo(id);
    }
}
