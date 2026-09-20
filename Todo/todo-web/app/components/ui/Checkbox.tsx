import { cn } from "@/app/lib/cn";

type CheckboxProps = Omit<React.ComponentProps<"input">, "type"> & {
  "aria-label": string;
};

/**
 * The native input stays in the DOM (keyboard, Space, screen readers all keep
 * working) but is visually replaced by the sibling span.
 *
 * The checkmark uses `peer-checked:[&>svg]:…` rather than `peer-checked:…`
 * directly on the svg: peer variants only match siblings of the peer, and the
 * svg is a descendant of the sibling, not a sibling itself.
 */
const Checkbox = ({ className, ...props }: CheckboxProps) => {
  return (
    <span className={cn("relative inline-flex size-5 shrink-0", className)}>
      <input
        type="checkbox"
        className="peer absolute inset-0 z-10 cursor-pointer opacity-0 disabled:cursor-not-allowed"
        {...props}
      />
      <span className="border-border peer-checked:border-primary peer-checked:bg-primary peer-focus-visible:ring-ring/60 pointer-events-none flex size-5 items-center justify-center rounded-md border-2 transition-colors peer-checked:[&>svg]:opacity-100 peer-focus-visible:ring-2 peer-disabled:opacity-50">
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="text-primary-foreground size-3 opacity-0 transition-opacity">
          <path
            d="M3 8.5L6.5 12L13 4.5"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </span>
  );
};

export default Checkbox;
