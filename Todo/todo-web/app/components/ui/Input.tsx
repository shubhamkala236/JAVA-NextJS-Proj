import { cn } from "@/app/lib/cn";

type InputProps = React.ComponentProps<"input"> & {
  invalid?: boolean;
};

const Input = ({ invalid = false, className, ...props }: InputProps) => {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={cn(
        "border-border bg-background placeholder:text-muted focus:border-primary focus:ring-ring/40 w-full rounded-lg border px-3 py-2 text-sm transition-colors focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        invalid && "border-danger focus:border-danger focus:ring-danger/30",
        className,
      )}
      {...props}
    />
  );
};

export default Input;
