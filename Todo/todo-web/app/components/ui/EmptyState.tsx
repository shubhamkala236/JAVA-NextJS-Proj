type EmptyStateProps = {
  title: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
};

const EmptyState = ({ title, description, action }: EmptyStateProps) => {
  return (
    <div className="border-border rounded-xl border border-dashed px-6 py-12 text-center">
      <p className="text-sm font-medium">{title}</p>
      {description && <p className="text-muted mt-1 text-sm">{description}</p>}
      {action && <div className="mt-4 flex justify-center">{action}</div>}
    </div>
  );
};

export default EmptyState;
