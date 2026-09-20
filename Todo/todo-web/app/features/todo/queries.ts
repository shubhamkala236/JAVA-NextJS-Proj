import { getTodos } from "@/app/features/todo/api";
import type { Todo } from "@/app/features/todo/types";

/**
 * GET /todos has no ORDER BY, so Postgres row order is unstable and visibly
 * reshuffles after an UPDATE (the heap tuple moves). Sorting here keeps the list
 * from jumping around every time a checkbox is ticked.
 */
export const listTodos = async (): Promise<Todo[]> => {
  const todos = await getTodos();
  return [...todos].sort((a, b) => b.id - a.id);
};
