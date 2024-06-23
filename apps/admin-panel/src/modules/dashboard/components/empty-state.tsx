type EmptyStateProps = {
  title: string;
  subtitle: string;
  children?: JSX.Element | JSX.Element[];
};

function EmptyState(props: EmptyStateProps) {
  const { title, subtitle, children } = props;

  return (
    <div className="flex flex-col p-16 items-center gap-1 text-center">
      <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
      {children}
    </div>
  );
}

export default EmptyState;
