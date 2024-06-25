import {
  GetCustomersQuery,
  GetCustomersQueryVariables,
} from '@/__generated__/graphql';
import EmptyState from '@/modules/dashboard/components/empty-state';
import { gql, useQuery } from '@apollo/client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useSearchParams } from 'react-router-dom';
import PaginationBar from '@/components/shared/pagination-bar';
import { useDebounce } from 'use-debounce';
import { LoadingSpinner } from '@/components/ui/spinner';
import BreadcrumbBar from '@/components/shared/breadcrumb-bar';
import SearchInput from '@/components/shared/search-input';
import DashboardContentWrapper from '@/components/shared/dashboard-content-wrapper';
import Customers from '@/modules/customer/components/customers';
import UpdateCustomerStatusDialog from '@/modules/customer/components/update-customer-status-dialog';

const GET_CUSTOMERS = gql`
  query getCustomers($take: Int!, $skip: Int!, $search: String) {
    customers(skip: $skip, take: $take, search: $search) {
      items {
        id
        displayName
        photoUrl
        email
        disabled
        createdAt
        updatedAt
      }
      totalCount
      conditionalTotalCount
      totalPages
      currentPage
    }
  }
`;

function CustomersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPageString = searchParams.get('page') ?? '1';
  const searchString = searchParams.get('search') ?? '';
  const [search] = useDebounce(searchString, 1000);
  const pageLimit = 3;
  const { data, loading, refetch } = useQuery<
    GetCustomersQuery,
    GetCustomersQueryVariables
  >(GET_CUSTOMERS, {
    variables: {
      take: pageLimit,
      skip: (parseInt(currentPageString) - 1) * pageLimit,
      search: search,
    },
  });
  const customers = data?.customers?.items ?? [];
  const {
    totalCount = 0,
    conditionalTotalCount = 0,
    totalPages = 0,
    currentPage = 0,
  } = data?.customers ?? {};

  return (
    <DashboardContentWrapper>
      {totalCount > 0 || loading ? (
        <div className="flex w-full flex-col">
          <div className="flex flex-col sm:gap-4 sm:py-4">
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
              <BreadcrumbBar
                routes={[
                  { label: 'Dashboard', to: '/' },
                  { label: 'Customers', to: '/customers' },
                ]}
              />
              <SearchInput />
            </header>
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
              <Card x-chunk="dashboard-06-chunk-0">
                <div className="flex items-center">
                  <CardHeader>
                    <CardTitle>Customers</CardTitle>
                    <CardDescription>View your customers.</CardDescription>
                  </CardHeader>
                </div>
                <CardContent>
                  {loading ? (
                    <div className="h-min-[100px] flex items-center justify-center">
                      <LoadingSpinner />
                    </div>
                  ) : customers.length > 0 ? (
                    <Customers customers={customers} />
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
        <EmptyState
          title="No customer found"
          subtitle="You will start seeing new customers when they login on the restaurant web app"
        />
      )}
      <UpdateCustomerStatusDialog
        open={!!searchParams.get('status')}
        onOpenChange={(open) => {
          if (!open) {
            searchParams.delete('status');
            setSearchParams(searchParams);
          }
        }}
        refetch={refetch}
      />
    </DashboardContentWrapper>
  );
}

export default CustomersPage;
