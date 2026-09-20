/** Wire shape, exactly as the API's TodoResponse record serializes. */
export type Todo = {
  id: number;
  title: string | null;
  description: string | null;
  completed: boolean;
  createdBy: string | null;
  /** Never written by the API — always null. Not rendered. */
  updatedBy: string | null;
  /** LocalDateTime, ISO-8601 with NO zone or offset. See lib/date.ts. */
  createdOn: string | null;
  /** Set by the update endpoint only — null until the first PUT. */
  updatedOn: string | null;
};

export type CreateTodoInput = {
  title: string;
  description: string | null;
  createdBy: string;
};

export type UpdateTodoInput = {
  /** Accepted but ignored by the API; the path id is authoritative. */
  todoId: number;
  title: string | null;
  description: string | null;
  completed: boolean;
};

export type TodoFilter = "all" | "active" | "completed";

export type TodoFieldErrors = {
  title?: string;
  description?: string;
};

export type TodoFormState = {
  status: "idle" | "success" | "error";
  message: string | null;
  fieldErrors: TodoFieldErrors;
  /** Incremented on success; used as a React key to remount and clear inputs. */
  resetKey: number;
};

/**
 * Lives here rather than in actions.ts: a "use server" module may only export
 * async functions, so a plain value export there is a build error.
 */
export const initialTodoFormState: TodoFormState = {
  status: "idle",
  message: null,
  fieldErrors: {},
  resetKey: 0,
};

export type MutationResult = { ok: true } | { ok: false; error: string };

export const TITLE_MAX = 200;
export const DESCRIPTION_MAX = 2000;
