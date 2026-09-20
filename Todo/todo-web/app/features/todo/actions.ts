"use server";

import { refresh } from "next/cache";

import { createTodo, deleteTodo, editTodo, toggleTodo } from "@/app/features/todo/api";
import { parseCreateForm, parseUpdateForm } from "@/app/features/todo/validation";
import { toUserMessage } from "@/app/lib/api/errors";
import { DEFAULT_AUTHOR } from "@/app/lib/env";
import type { MutationResult, TodoFormState } from "@/app/features/todo/types";

/**
 * Reads are uncached (`cache: "no-store"`), so there are no tags to invalidate —
 * `refresh()` is the documented pairing for dynamic reads, and it can only be
 * called from a Server Action, which is where every write here lives.
 */

export const createTodoAction = async (
  prevState: TodoFormState,
  formData: FormData,
): Promise<TodoFormState> => {
  const parsed = parseCreateForm(formData);

  if (!parsed.ok) {
    // resetKey is left untouched so the user's typing survives the error render.
    return {
      status: "error",
      message: null,
      fieldErrors: parsed.fieldErrors,
      resetKey: prevState.resetKey,
    };
  }

  try {
    await createTodo({
      title: parsed.data.title,
      description: parsed.data.description,
      createdBy: DEFAULT_AUTHOR,
    });
  } catch (error) {
    return {
      status: "error",
      message: toUserMessage(error),
      fieldErrors: {},
      resetKey: prevState.resetKey,
    };
  }

  refresh();

  // Bumping resetKey remounts the field wrapper, clearing the inputs.
  return {
    status: "success",
    message: null,
    fieldErrors: {},
    resetKey: prevState.resetKey + 1,
  };
};

export const updateTodoAction = async (
  prevState: TodoFormState,
  formData: FormData,
): Promise<TodoFormState> => {
  const parsed = parseUpdateForm(formData);

  if (!parsed.ok) {
    return {
      status: "error",
      message: null,
      fieldErrors: parsed.fieldErrors,
      resetKey: prevState.resetKey,
    };
  }

  try {
    // editTodo re-reads `completed` so the primitive-boolean default can't
    // silently un-complete the todo.
    await editTodo(parsed.data.id, {
      title: parsed.data.title,
      description: parsed.data.description,
    });
  } catch (error) {
    return {
      status: "error",
      message: toUserMessage(error),
      fieldErrors: {},
      resetKey: prevState.resetKey,
    };
  }

  refresh();

  return {
    status: "success",
    message: null,
    fieldErrors: {},
    resetKey: prevState.resetKey + 1,
  };
};

export const toggleTodoAction = async (
  id: number,
  completed: boolean,
): Promise<MutationResult> => {
  try {
    // Re-reads and merges title/description so the PUT can't null them.
    await toggleTodo(id, completed);
  } catch (error) {
    // Returning (rather than throwing) lets the UI show an inline banner and
    // roll the optimistic update back, instead of blowing up to error.tsx.
    return { ok: false, error: toUserMessage(error) };
  }

  refresh();

  return { ok: true };
};

export const deleteTodoAction = async (id: number): Promise<MutationResult> => {
  try {
    await deleteTodo(id);
  } catch (error) {
    return { ok: false, error: toUserMessage(error) };
  }

  refresh();

  return { ok: true };
};
