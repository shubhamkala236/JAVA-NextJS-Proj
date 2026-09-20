import { cn } from "@/app/lib/cn";

type ChipProps = React.ComponentProps<"button"> & {
  active?: boolean;
  count?: number;
};

const Chip = ({ active = false, count, className, children, ...props }: ChipProps) => {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cn(
        "focus-visible:ring-ring/60 inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border text-muted hover:bg-surface-hover hover:text-foreground",
        className,
      )}
      {...props}
    >
      {children}
      {count !== undefined && (
        <span className={cn("text-xs tabular-nums", active ? "opacity-80" : "opacity-70")}>
          {count}
        </span>
      )}
    </button>
  );
};

export default Chip;
