type PageHeaderProps = {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
};

const PageHeader = ({ title, subtitle, action }: PageHeaderProps) => {
  return (
    <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="text-muted mt-1 text-sm">{subtitle}</p>}
      </div>
      {action}
    </header>
  );
};

export default PageHeader;
