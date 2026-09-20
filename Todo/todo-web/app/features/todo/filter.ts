import type { Todo, TodoFilter } from "@/app/features/todo/types";

/**
 * The API offers no filter, sort, search or paging, so this runs client-side
 * over the already-loaded list. Kept as a pure function: no React, trivially
 * testable.
 */
export const selectTodos = (todos: Todo[], filter: TodoFilter, query: string): Todo[] => {
  const needle = query.trim().toLowerCase();

  return todos.filter((todo) => {
    if (filter === "active" && todo.completed) return false;
    if (filter === "completed" && !todo.completed) return false;
    if (needle.length === 0) return true;

    return (
      (todo.title ?? "").toLowerCase().includes(needle) ||
      (todo.description ?? "").toLowerCase().includes(needle)
    );
  });
};

export const countTodos = (todos: Todo[]) => {
  const completed = todos.filter((todo) => todo.completed).length;

  return { total: todos.length, completed, active: todos.length - completed };
};
