import { request } from "@/app/lib/api/client";
import type { CreateTodoInput, Todo, UpdateTodoInput } from "@/app/features/todo/types";

export const getTodos = (): Promise<Todo[]> => { 
  // console.log("Calling Spring")
  return request<Todo[]>("/todos");
}

export const getTodo = (id: number): Promise<Todo> => {
  return request<Todo>(`/todos/${id}`, { notFoundOn500: true });
}

/** The API answers 200 here, not 201 — the wrapper only checks response.ok. */
export const createTodo = (input: CreateTodoInput): Promise<Todo> =>
  request<Todo>("/todos", { method: "POST", body: input });

export const updateTodo = (id: number, input: UpdateTodoInput): Promise<Todo> =>
  request<Todo>(`/todos/${id}`, { method: "PUT", body: input, notFoundOn500: true });

export const deleteTodo = (id: number): Promise<void> =>
  request<void>(`/todos/${id}`, {
    method: "DELETE",
    notFoundOn500: true,
    expectEmptyBody: true,
  });

/**
 * PUT /todos/{id} is a DESTRUCTIVE FULL REPLACE: the service calls
 * `todo.setTitle(request.title())` unconditionally, so an omitted `title`
 * becomes SQL NULL. There is no PATCH endpoint.
 *
 * So every partial mutation re-reads the row and resends all four fields. We
 * fetch fresh rather than trusting a client-supplied copy: the client's copy can
 * be stale (edited in another tab), and the GET also gives us the not_found
 * signal when the row is already gone.
 */
export const toggleTodo = async (id: number, completed: boolean): Promise<Todo> => {
  const current = await getTodo(id);

  return updateTodo(id, {
    todoId: current.id,
    // Passed through verbatim, including null. Coercing null -> "" would
    // silently rewrite a NULL column on every checkbox click.
    title: current.title,
    description: current.description,
    completed,
  });
};

/**
 * Same merge discipline for the inline edit. `completed` MUST be resent:
 * UpdateTodoRequest.completed is a primitive boolean, so a missing JSON key
 * deserializes to false and would silently un-complete the todo.
 */
export const editTodo = async (
  id: number,
  fields: { title: string; description: string | null },
): Promise<Todo> => {
  const current = await getTodo(id);

  return updateTodo(id, {
    todoId: current.id,
    title: fields.title,
    description: fields.description,
    completed: current.completed,
  });
};
