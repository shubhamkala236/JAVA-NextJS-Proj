"use client";

import { useOptimistic, useState } from "react";

import Alert from "@/app/components/ui/Alert";
import TodoCreateForm from "@/app/features/todo/components/TodoCreateForm";
import TodoList from "@/app/features/todo/components/TodoList";
import TodoToolbar from "@/app/features/todo/components/TodoToolbar";
import { countTodos, selectTodos } from "@/app/features/todo/filter";
import type { Todo, TodoFilter } from "@/app/features/todo/types";

export type OptimisticAction =
  | { type: "create"; todo: Todo }
  | { type: "toggle"; id: number; completed: boolean }
  | { type: "edit"; id: number; title: string; description: string | null }
  | { type: "delete"; id: number };

const reduce = (current: Todo[], action: OptimisticAction): Todo[] => {
  switch (action.type) {
    case "create":
      return [action.todo, ...current];
    case "toggle":
      return current.map((todo) =>
        todo.id === action.id ? { ...todo, completed: action.completed } : todo,
      );
    case "edit":
      return current.map((todo) =>
        todo.id === action.id
          ? { ...todo, title: action.title, description: action.description }
          : todo,
      );
    case "delete":
      return current.filter((todo) => todo.id !== action.id);
  }
};

type TodoBoardProps = {
  todos: Todo[];
};

/**
 * The single Client Component boundary. It owns:
 *   - the optimistic list (one reducer shared by create/toggle/edit/delete)
 *   - the filter and search state
 *   - the error banner
 *
 * Filter and search live in useState rather than the URL on purpose: the API has
 * no query params, so a round-trip would fetch the identical list and filter it
 * in Node; and optimistic rows (not yet in server data) still need to respect
 * the active filter immediately. refresh() re-renders this component rather than
 * remounting it, so both survive a mutation.
 */
const TodoBoard = ({ todos }: TodoBoardProps) => {
  const [optimisticTodos, applyOptimistic] = useOptimistic(todos, reduce);
  const [filter, setFilter] = useState<TodoFilter>("all");
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

  const counts = countTodos(optimisticTodos);
  const visible = selectTodos(optimisticTodos, filter, query);

  return (
    <div className="flex flex-col gap-6">
      <TodoCreateForm applyOptimistic={applyOptimistic} />

      {error && <Alert onDismiss={() => setError(null)}>{error}</Alert>}

      <div className="flex flex-col gap-4">
        <TodoToolbar
          filter={filter}
          onFilterChange={setFilter}
          query={query}
          onQueryChange={setQuery}
          counts={counts}
        />

        <TodoList
          todos={visible}
          totalCount={optimisticTodos.length}
          filter={filter}
          query={query}
          onClearSearch={() => setQuery("")}
          applyOptimistic={applyOptimistic}
          onError={setError}
        />
      </div>
    </div>
  );
};

export default TodoBoard;
