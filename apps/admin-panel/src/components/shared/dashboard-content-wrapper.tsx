type DashboardContentWrapperProps = {
  children: JSX.Element | JSX.Element[];
};

function DashboardContentWrapper(props: DashboardContentWrapperProps) {
  const { children } = props;

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/40">
      <div
        className="rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        {children}
      </div>
    </main>
  );
}

export default DashboardContentWrapper;
