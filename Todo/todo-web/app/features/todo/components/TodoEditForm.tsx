"use client";

import { useActionState, useEffect } from "react";

import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import SubmitButton from "@/app/components/ui/SubmitButton";
import Textarea from "@/app/components/ui/Textarea";
import { updateTodoAction } from "@/app/features/todo/actions";
import type { OptimisticAction } from "@/app/features/todo/components/TodoBoard";
import {
  DESCRIPTION_MAX,
  TITLE_MAX,
  initialTodoFormState,
} from "@/app/features/todo/types";
import type { Todo } from "@/app/features/todo/types";

type TodoEditFormProps = {
  todo: Todo;
  applyOptimistic: (action: OptimisticAction) => void;
  onDone: () => void;
};

const TodoEditForm = ({ todo, applyOptimistic, onDone }: TodoEditFormProps) => {
  const [state, formAction] = useActionState(updateTodoAction, initialTodoFormState);

  // Close the editor once the action reports success. Doing this in an effect
  // (rather than inside the form action after the await) keeps the state update
  // out of the transition, where it would be deferred.
  useEffect(() => {
    if (state.status === "success") onDone();
  }, [state.status, state.resetKey, onDone]);

  return (
    <form
      action={(formData) => {
        const title = String(formData.get("title") ?? "").trim();
        const description = String(formData.get("description") ?? "").trim();

        if (title.length > 0 && title.length <= TITLE_MAX) {
          applyOptimistic({
            type: "edit",
            id: todo.id,
            title,
            description: description.length > 0 ? description : null,
          });
        }

        formAction(formData);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") onDone();
      }}
      className="flex min-w-0 flex-1 flex-col gap-2"
    >
      <input type="hidden" name="id" value={todo.id} />

      <Input
        name="title"
        defaultValue={todo.title ?? ""}
        required
        maxLength={TITLE_MAX}
        autoFocus
        autoComplete="off"
        aria-label="Todo title"
        invalid={Boolean(state.fieldErrors.title)}
      />
      <Textarea
        name="description"
        defaultValue={todo.description ?? ""}
        rows={2}
        maxLength={DESCRIPTION_MAX}
        placeholder="Add a few details (optional)"
        aria-label="Todo description"
        invalid={Boolean(state.fieldErrors.description)}
      />

      {(state.fieldErrors.title || state.fieldErrors.description || state.message) && (
        <p role="alert" className="text-danger text-xs">
          {state.fieldErrors.title ?? state.fieldErrors.description ?? state.message}
        </p>
      )}

      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" size="sm" onClick={onDone}>
          Cancel
        </Button>
        <SubmitButton size="sm" pendingLabel="Saving…">
          Save
        </SubmitButton>
      </div>
    </form>
  );
};

export default TodoEditForm;
