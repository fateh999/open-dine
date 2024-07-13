import BreadcrumbBar from '@/components/shared/breadcrumb-bar';
import DashboardContentWrapper from '@/components/shared/dashboard-content-wrapper';
import ProductForm from '@/modules/food/components/product-form';

function AddProductPage() {
  return (
    <DashboardContentWrapper>
      <div className="flex w-full flex-col">
        <div className="flex flex-col sm:gap-4 sm:py-4">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <BreadcrumbBar
              routes={[
                { label: 'Dashboard', to: '/' },
                { label: 'Products', to: '/products' },
                { label: 'Add', to: '/products/add' },
              ]}
            />
          </header>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <ProductForm />
          </main>
        </div>
      </div>
    </DashboardContentWrapper>
  );
}

export default AddProductPage;
