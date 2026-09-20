import { DESCRIPTION_MAX, TITLE_MAX } from "@/app/features/todo/types";
import type { TodoFieldErrors } from "@/app/features/todo/types";

type ParseResult<T> = { ok: true; data: T } | { ok: false; fieldErrors: TodoFieldErrors };

type TodoFields = {
  title: string;
  description: string | null;
};

/**
 * The API validates nothing — POST {} happily persists a row with a null title —
 * and Server Actions are reachable by direct POST, not just through our form.
 * So this is the only thing standing between a user and a row of nulls.
 */
const parseFields = (formData: FormData): ParseResult<TodoFields> => {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (title.length === 0) {
    return { ok: false, fieldErrors: { title: "Give your todo a title." } };
  }

  if (title.length > TITLE_MAX) {
    return {
      ok: false,
      fieldErrors: { title: `Keep the title under ${TITLE_MAX} characters.` },
    };
  }

  if (description.length > DESCRIPTION_MAX) {
    return {
      ok: false,
      fieldErrors: { description: `Keep the description under ${DESCRIPTION_MAX} characters.` },
    };
  }

  return {
    ok: true,
    // An empty description becomes null, matching the column's nullable
    // semantics rather than writing an empty string.
    data: { title, description: description.length > 0 ? description : null },
  };
};

export const parseCreateForm = parseFields;

export const parseUpdateForm = (
  formData: FormData,
): ParseResult<TodoFields & { id: number }> => {
  const id = Number(formData.get("id"));

  if (!Number.isInteger(id)) {
    return { ok: false, fieldErrors: { title: "That todo could not be identified." } };
  }

  const parsed = parseFields(formData);
  if (!parsed.ok) return parsed;

  return { ok: true, data: { id, ...parsed.data } };
};
