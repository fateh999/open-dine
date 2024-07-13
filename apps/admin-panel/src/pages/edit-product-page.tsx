import { GetFoodQuery, GetFoodQueryVariables } from '@/__generated__/graphql';
import BreadcrumbBar from '@/components/shared/breadcrumb-bar';
import DashboardContentWrapper from '@/components/shared/dashboard-content-wrapper';
import { LoadingSpinner } from '@/components/ui/spinner';
import ProductForm from '@/modules/food/components/product-form';
import { GET_FOOD } from '@/modules/food/graphql/queries';
import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

function EditProductPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id as string;
  const { data, loading } = useQuery<GetFoodQuery, GetFoodQueryVariables>(
    GET_FOOD,
    {
      variables: { id },
    },
  );
  const food = data?.food;
  const product = useMemo(
    () =>
      food
        ? {
            categoryId: food?.categoryId,
            name: food?.name,
            status: food?.status,
            foodType: food?.foodType,
            customizations: (food?.customizations ?? []).map(
              (customization) => ({
                costPrice: String(customization.costPrice),
                sellingPrice: String(customization.sellingPrice),
                name: customization.name,
                isDefault: customization.isDefault ?? false,
              }),
            ),
            description: food?.description ?? '',
            photoUrl: food?.photoUrl ?? '',
          }
        : undefined,
    [food],
  );

  return (
    <DashboardContentWrapper>
      <div className="flex w-full flex-col">
        <div className="flex flex-col sm:gap-4 sm:py-4">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <BreadcrumbBar
              routes={[
                { label: 'Dashboard', to: '/' },
                { label: 'Products', to: '/products' },
                { label: 'Edit', to: '/products/${id}/edit' },
              ]}
            />
          </header>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {loading ? (
              <div className="h-[200px] flex items-center justify-center">
                <LoadingSpinner />
              </div>
            ) : (
              <ProductForm id={id} product={product} />
            )}
          </main>
        </div>
      </div>
    </DashboardContentWrapper>
  );
}

export default EditProductPage;
