"use client";

import { useActionState } from "react";

import SubmitButton from "@/app/components/ui/SubmitButton";
import Input from "@/app/components/ui/Input";
import Textarea from "@/app/components/ui/Textarea";
import { createTodoAction } from "@/app/features/todo/actions";
import type { OptimisticAction } from "@/app/features/todo/components/TodoBoard";
import {
  DESCRIPTION_MAX,
  TITLE_MAX,
  initialTodoFormState,
} from "@/app/features/todo/types";

type TodoCreateFormProps = {
  applyOptimistic: (action: OptimisticAction) => void;
};

const TodoCreateForm = ({ applyOptimistic }: TodoCreateFormProps) => {
  const [state, formAction] = useActionState(createTodoAction, initialTodoFormState);

  return (
    <form
      action={(formData) => {
        const title = String(formData.get("title") ?? "").trim();
        const description = String(formData.get("description") ?? "").trim();

        // The wrapper runs inside React's transition, so the optimistic row
        // paints on the current frame while formAction does the round-trip.
        if (title.length > 0 && title.length <= TITLE_MAX) {
          applyOptimistic({
            type: "create",
            todo: {
              // Negative id: can't collide with a real BIGSERIAL id, and gives
              // the card a cheap `id < 0` test for "still in flight".
              id: -Date.now(),
              title,
              description: description.length > 0 ? description : null,
              completed: false,
              createdBy: null,
              updatedBy: null,
              createdOn: null,
              updatedOn: null,
            },
          });
        }

        formAction(formData);
      }}
      className="border-border bg-surface flex flex-col gap-3 rounded-2xl border p-4 shadow-sm"
    >
      {/* Remounted on success (resetKey changes), which clears the inputs. A
          validation error leaves resetKey alone so the typing survives. */}
      <div key={state.resetKey} className="flex flex-col gap-3">
        <Input
          name="title"
          required
          maxLength={TITLE_MAX}
          autoComplete="off"
          placeholder="What needs doing?"
          aria-label="Todo title"
          invalid={Boolean(state.fieldErrors.title)}
          aria-describedby={state.fieldErrors.title ? "create-title-error" : undefined}
        />
        <Textarea
          name="description"
          rows={2}
          maxLength={DESCRIPTION_MAX}
          placeholder="Add a few details (optional)"
          aria-label="Todo description"
          invalid={Boolean(state.fieldErrors.description)}
        />
      </div>

      {state.fieldErrors.title && (
        <p id="create-title-error" role="alert" className="text-danger text-xs">
          {state.fieldErrors.title}
        </p>
      )}
      {state.fieldErrors.description && (
        <p role="alert" className="text-danger text-xs">
          {state.fieldErrors.description}
        </p>
      )}
      {state.message && (
        <p role="alert" className="text-danger text-xs">
          {state.message}
        </p>
      )}

      <div className="flex justify-end">
        <SubmitButton pendingLabel="Adding…">Add todo</SubmitButton>
      </div>
    </form>
  );
};

export default TodoCreateForm;
