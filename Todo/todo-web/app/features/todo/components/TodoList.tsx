"use client";

import Button from "@/app/components/ui/Button";
import EmptyState from "@/app/components/ui/EmptyState";
import TodoCard from "@/app/features/todo/components/TodoCard";
import type { OptimisticAction } from "@/app/features/todo/components/TodoBoard";
import type { Todo, TodoFilter } from "@/app/features/todo/types";

type TodoListProps = {
  todos: Todo[];
  /** Count before filtering, to tell "no todos" apart from "none match". */
  totalCount: number;
  filter: TodoFilter;
  query: string;
  onClearSearch: () => void;
  applyOptimistic: (action: OptimisticAction) => void;
  onError: (message: string) => void;
};

const TodoList = ({
  todos,
  totalCount,
  filter,
  query,
  onClearSearch,
  applyOptimistic,
  onError,
}: TodoListProps) => {
  if (todos.length === 0) {
    // Three distinct empty states, because they mean three different things.
    if (totalCount === 0) {
      return (
        <EmptyState
          title="Nothing here yet"
          description="Add your first todo using the form above."
        />
      );
    }

    if (query.trim().length > 0) {
      return (
        <EmptyState
          title="No todos match your search"
          description={<>Nothing found for “{query.trim()}”.</>}
          action={
            <Button variant="secondary" size="sm" onClick={onClearSearch}>
              Clear search
            </Button>
          }
        />
      );
    }

    return (
      <EmptyState
        title={filter === "active" ? "No active todos" : "Nothing completed yet"}
        description={
          filter === "active"
            ? "Everything is done. Nice."
            : "Tick something off and it will show up here."
        }
      />
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          applyOptimistic={applyOptimistic}
          onError={onError}
        />
      ))}
    </ul>
  );
};

export default TodoList;
