"use client";

import { startTransition, useState } from "react";

import Checkbox from "@/app/components/ui/Checkbox";
import IconButton from "@/app/components/ui/IconButton";
import DeleteTodoButton from "@/app/features/todo/components/DeleteTodoButton";
import TodoEditForm from "@/app/features/todo/components/TodoEditForm";
import TodoMeta from "@/app/features/todo/components/TodoMeta";
import { toggleTodoAction } from "@/app/features/todo/actions";
import type { OptimisticAction } from "@/app/features/todo/components/TodoBoard";
import type { Todo } from "@/app/features/todo/types";
import { cn } from "@/app/lib/cn";

type TodoCardProps = {
  todo: Todo;
  applyOptimistic: (action: OptimisticAction) => void;
  onError: (message: string) => void;
};

const TodoCard = ({ todo, applyOptimistic, onError }: TodoCardProps) => {
  const [isEditing, setIsEditing] = useState(false);

  // A negative id means the row is still being created and has no real id yet.
  const isPendingCreate = todo.id < 0;
  const title = todo.title ?? "Untitled";

  const handleToggle = () => {
    // `todo` comes from the optimistic list, so a second click within the same
    // transition sees the optimistic value rather than a stale one.
    const next = !todo.completed;

    // Bare startTransition, not useTransition: the hook's isPending would fade
    // the whole board, and the optimistic tick already gives the feedback.
    startTransition(async () => {
      applyOptimistic({ type: "toggle", id: todo.id, completed: next });

      const result = await toggleTodoAction(todo.id, next);

      // On failure React discards the optimistic action when the transition
      // settles, so the checkbox reverts on its own — we only report it.
      if (!result.ok) onError(result.error);
    });
  };

  return (
    <li
      className={cn(
        "group border-border bg-surface hover:bg-surface-hover has-data-pending:opacity-40 flex items-start gap-3 rounded-xl border p-4 transition-colors",
        isPendingCreate && "opacity-60",
      )}
    >
      <Checkbox
        checked={todo.completed}
        onChange={handleToggle}
        disabled={isPendingCreate || isEditing}
        aria-label={`Mark “${title}” as ${todo.completed ? "active" : "complete"}`}
        className="mt-0.5"
      />

      {isEditing ? (
        <TodoEditForm
          todo={todo}
          applyOptimistic={applyOptimistic}
          onDone={() => setIsEditing(false)}
        />
      ) : (
        <>
          <div className="min-w-0 flex-1">
            <p
              className={cn(
                "text-sm font-medium break-words",
                todo.completed && "text-muted line-through",
              )}
            >
              {title}
            </p>
            {todo.description && (
              <p className="text-muted mt-0.5 text-sm break-words">{todo.description}</p>
            )}
            <TodoMeta todo={todo} />
          </div>

          <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
            <IconButton
              aria-label={`Edit “${title}”`}
              disabled={isPendingCreate}
              onClick={() => setIsEditing(true)}
            >
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="size-4">
                <path
                  d="M13.5 3.5a2.12 2.12 0 0 1 3 3L7 16l-4 1 1-4 9.5-9.5Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </IconButton>

            <DeleteTodoButton
              todo={todo}
              applyOptimistic={applyOptimistic}
              onError={onError}
              disabled={isPendingCreate}
            />
          </div>
        </>
      )}
    </li>
  );
};

export default TodoCard;
