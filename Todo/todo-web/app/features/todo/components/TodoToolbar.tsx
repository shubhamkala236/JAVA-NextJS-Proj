"use client";

import Chip from "@/app/components/ui/Chip";
import Input from "@/app/components/ui/Input";
import type { TodoFilter } from "@/app/features/todo/types";

type TodoToolbarProps = {
  filter: TodoFilter;
  onFilterChange: (filter: TodoFilter) => void;
  query: string;
  onQueryChange: (query: string) => void;
  counts: { total: number; active: number; completed: number };
};

const FILTERS: { value: TodoFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

const TodoToolbar = ({ filter, onFilterChange, query, onQueryChange, counts }: TodoToolbarProps) => {
  const countFor = (value: TodoFilter) =>
    value === "all" ? counts.total : value === "active" ? counts.active : counts.completed;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div role="group" aria-label="Filter todos" className="flex flex-wrap gap-2">
        {FILTERS.map(({ value, label }) => (
          <Chip
            key={value}
            active={filter === value}
            count={countFor(value)}
            onClick={() => onFilterChange(value)}
          >
            {label}
          </Chip>
        ))}
      </div>

      <div className="relative sm:ml-auto sm:w-56">
        <svg
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
          className="text-muted pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
        >
          <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.8" />
          <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <Input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search todos"
          aria-label="Search todos"
          className="pl-9"
        />
      </div>
    </div>
  );
};

export default TodoToolbar;
