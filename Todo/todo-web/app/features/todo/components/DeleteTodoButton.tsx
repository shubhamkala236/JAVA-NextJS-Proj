"use client";

import { useOptimistic } from "react";

import IconButton from "@/app/components/ui/IconButton";
import { deleteTodoAction } from "@/app/features/todo/actions";
import type { OptimisticAction } from "@/app/features/todo/components/TodoBoard";
import type { Todo } from "@/app/features/todo/types";

type DeleteTodoButtonProps = {
  todo: Todo;
  applyOptimistic: (action: OptimisticAction) => void;
  onError: (message: string) => void;
  disabled?: boolean;
};

const DeleteTodoButton = ({ todo, applyOptimistic, onError, disabled }: DeleteTodoButtonProps) => {
  // useOptimistic rather than useState: inside a transition an optimistic setter
  // applies on the current frame, while a useState setter would be deferred
  // until the transition completes.
  const [isPending, setIsPending] = useOptimistic(false);

  return (
    <form
      action={async () => {
        setIsPending(true);
        applyOptimistic({ type: "delete", id: todo.id });

        const result = await deleteTodoAction(todo.id);

        if (!result.ok) onError(result.error);
      }}
    >
      <IconButton
        type="submit"
        tone="danger"
        disabled={isPending || disabled}
        // Read by the card's `has-data-pending:opacity-40`, fading the row for
        // the frames between the click and its removal.
        data-pending={isPending ? "" : undefined}
        aria-label={`Delete “${todo.title ?? "Untitled"}”`}
      >
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="size-4">
          <path
            d="M4 6h12M8.5 3.5h3M6.5 6l.5 10h6l.5-10M9 9v4M11 9v4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </IconButton>
    </form>
  );
};

export default DeleteTodoButton;
