import { cn } from "@/app/lib/cn";

type AlertProps = {
  children: React.ReactNode;
  onDismiss?: () => void;
  className?: string;
};

const Alert = ({ children, onDismiss, className }: AlertProps) => {
  return (
    <div
      role="alert"
      className={cn(
        "border-danger/40 bg-danger/10 text-danger flex items-start gap-3 rounded-lg border px-4 py-3 text-sm",
        className,
      )}
    >
      <span className="flex-1">{children}</span>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="focus-visible:ring-ring/60 cursor-pointer rounded px-1 leading-none opacity-70 transition-opacity hover:opacity-100 focus-visible:ring-2 focus-visible:outline-none"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default Alert;
