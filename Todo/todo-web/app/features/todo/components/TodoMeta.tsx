import { formatLocalDateTime } from "@/app/lib/date";
import type { Todo } from "@/app/features/todo/types";

type TodoMetaProps = {
  todo: Todo;
};

/** `updatedBy` is never rendered — the API never assigns it. */
const TodoMeta = ({ todo }: TodoMetaProps) => {
  const created = formatLocalDateTime(todo.createdOn);
  const updated = formatLocalDateTime(todo.updatedOn);

  const parts = [
    created && `Created ${created}`,
    updated && `Updated ${updated}`,
    todo.createdBy && `by ${todo.createdBy}`,
  ].filter(Boolean);

  if (parts.length === 0) return null;

  return <p className="text-muted mt-2 text-xs">{parts.join(" · ")}</p>;
};

export default TodoMeta;
