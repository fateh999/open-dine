import {
  GetFoodsQuery,
  GetFoodsQueryVariables,
  UserRole,
} from '@/__generated__/graphql';
import { Button } from '@/components/ui/button';
import EmptyState from '@/modules/dashboard/components/empty-state';
import { useQuery } from '@apollo/client';
import { PlusCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PaginationBar from '@/components/shared/pagination-bar';
import { useDebounce } from 'use-debounce';
import { LoadingSpinner } from '@/components/ui/spinner';
import BreadcrumbBar from '@/components/shared/breadcrumb-bar';
import SearchInput from '@/components/shared/search-input';
import DashboardContentWrapper from '@/components/shared/dashboard-content-wrapper';
import RoleBasedWrapper from '@/components/shared/role-based-wrapper';
import Products from '@/modules/food/components/products';
import { GET_FOODS } from '@/modules/food/graphql/queries';
import DeleteProductDialog from '@/modules/food/components/delete-product-dialog';

function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPageString = searchParams.get('page') ?? '1';
  const searchString = searchParams.get('search') ?? '';
  const [search] = useDebounce(searchString, 1000);
  const pageLimit = 3;
  const { data, loading, refetch } = useQuery<
    GetFoodsQuery,
    GetFoodsQueryVariables
  >(GET_FOODS, {
    variables: {
      take: pageLimit,
      skip: (parseInt(currentPageString) - 1) * pageLimit,
      search: search,
    },
  });
  const products = data?.foods?.items ?? [];
  const {
    totalCount = 0,
    conditionalTotalCount = 0,
    totalPages = 0,
    currentPage = 0,
  } = data?.foods ?? {};
  const navigate = useNavigate();

  console.log({ products });

  return (
    <DashboardContentWrapper>
      {totalCount > 0 || loading ? (
        <div className="flex w-full flex-col">
          <div className="flex flex-col sm:gap-4 sm:py-4">
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
              <BreadcrumbBar
                routes={[
                  { label: 'Dashboard', to: '/' },
                  { label: 'Products', to: '/products' },
                ]}
              />
              <SearchInput />
            </header>
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
              <Card x-chunk="dashboard-06-chunk-0">
                <div className="flex items-center">
                  <CardHeader>
                    <CardTitle>Products</CardTitle>
                    <CardDescription>Manage your products.</CardDescription>
                  </CardHeader>
                  <CardHeader className="ml-auto flex items-center gap-2">
                    <RoleBasedWrapper
                      allowedRoles={[UserRole.Admin, UserRole.SuperAdmin]}
                    >
                      <Button
                        size="sm"
                        className="h-8 gap-1"
                        onClick={() => {
                          navigate('./add');
                        }}
                      >
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                          Add Product
                        </span>
                      </Button>
                    </RoleBasedWrapper>
                  </CardHeader>
                </div>
                <CardContent>
                  {loading ? (
                    <div className="h-min-[100px] flex items-center justify-center">
                      <LoadingSpinner />
                    </div>
                  ) : products.length > 0 ? (
                    <Products products={products} />
                  ) : (
                    <EmptyState
                      title="No results found"
                      subtitle="Try adjusting your search to find what you're looking for."
                    />
                  )}
                </CardContent>
                <CardFooter>
                  <PaginationBar
                    totalCount={conditionalTotalCount}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={(page: number) => {
                      searchParams.set('page', `${page}`);
                      setSearchParams(searchParams);
                    }}
                  />
                </CardFooter>
              </Card>
            </main>
          </div>
        </div>
      ) : (
        <>
          <RoleBasedWrapper
            allowedRoles={[UserRole.Admin, UserRole.SuperAdmin]}
          >
            <EmptyState
              title="No product found"
              subtitle="You can add a new product by clicking on below button"
            >
              <Button
                className="mt-4"
                onClick={() => {
                  navigate('./add');
                }}
              >
                Add Product
              </Button>
            </EmptyState>
          </RoleBasedWrapper>
          <RoleBasedWrapper allowedRoles={[UserRole.Staff]}>
            <EmptyState
              title="No product found"
              subtitle="Please ask the restaurant admin to add products"
            />
          </RoleBasedWrapper>
        </>
      )}
      <DeleteProductDialog
        open={!!searchParams.get('delete')}
        onOpenChange={(open) => {
          if (!open) {
            searchParams.delete('delete');
            setSearchParams(searchParams);
          }
        }}
        refetch={refetch}
      />
    </DashboardContentWrapper>
  );
}

export default ProductsPage;
