import { cn } from "@/app/lib/cn";

type IconButtonProps = React.ComponentProps<"button"> & {
  /** Required: the button has no text for a screen reader to announce. */
  "aria-label": string;
  tone?: "neutral" | "danger";
};

const IconButton = ({ tone = "neutral", className, ...props }: IconButtonProps) => {
  return (
    <button
      className={cn(
        "focus-visible:ring-ring/60 text-muted inline-flex size-8 cursor-pointer items-center justify-center rounded-lg transition-colors focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        tone === "danger"
          ? "hover:bg-danger/10 hover:text-danger"
          : "hover:bg-surface-hover hover:text-foreground",
        className,
      )}
      {...props}
    />
  );
};

export default IconButton;
