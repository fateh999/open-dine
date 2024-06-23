import EmptyState from '@/modules/dashboard/components/empty-state';

function CustomersPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <EmptyState
          title="You have no customers"
          subtitle="You will see customers when they login on the restaurant web app"
        />
      </div>
    </main>
  );
}

export default CustomersPage;
