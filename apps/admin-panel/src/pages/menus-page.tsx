import { GetMenusQuery, GetMenusQueryVariables } from '@/__generated__/graphql';
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
import { useSearchParams } from 'react-router-dom';
import PaginationBar from '@/components/shared/pagination-bar';
import { useDebounce } from 'use-debounce';
import { useState } from 'react';
import { LoadingSpinner } from '@/components/ui/spinner';
import BreadcrumbBar from '@/components/shared/breadcrumb-bar';
import SearchInput from '@/components/shared/search-input';
import DashboardContentWrapper from '@/components/shared/dashboard-content-wrapper';
import { GET_MENUS } from '@/modules/food/graphql/queries';
import Menus from '@/modules/food/components/menus';
import AddMenuDialog from '@/modules/food/components/add-menu-dialog';
import EditMenuDialog from '@/modules/food/components/edit-menu-dialog';
import DeleteMenuDialog from '@/modules/food/components/delete-menu-dialog';

function MenusPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPageString = searchParams.get('page') ?? '1';
  const searchString = searchParams.get('search') ?? '';
  const [search] = useDebounce(searchString, 1000);
  const pageLimit = 3;
  const { data, loading, refetch } = useQuery<
    GetMenusQuery,
    GetMenusQueryVariables
  >(GET_MENUS, {
    variables: {
      take: pageLimit,
      skip: (parseInt(currentPageString) - 1) * pageLimit,
      search: search,
    },
  });
  const menus = data?.menus?.items ?? [];
  const {
    totalCount = 0,
    conditionalTotalCount = 0,
    totalPages = 0,
    currentPage = 0,
  } = data?.menus ?? {};
  const [openAddMenuDialog, setOpenAddMenuDialog] = useState(false);

  return (
    <DashboardContentWrapper>
      {totalCount > 0 || loading ? (
        <div className="flex w-full flex-col">
          <div className="flex flex-col sm:gap-4 sm:py-4">
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
              <BreadcrumbBar
                routes={[
                  { label: 'Dashboard', to: '/' },
                  { label: 'Menus', to: '/menus' },
                ]}
              />
              <SearchInput />
            </header>
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
              <Card x-chunk="dashboard-06-chunk-0">
                <div className="flex items-center">
                  <CardHeader>
                    <CardTitle>Menus</CardTitle>
                    <CardDescription>Manage your menus.</CardDescription>
                  </CardHeader>
                  <CardHeader className="ml-auto flex items-center gap-2">
                    <Button
                      size="sm"
                      className="h-8 gap-1"
                      onClick={() => {
                        setOpenAddMenuDialog(true);
                      }}
                    >
                      <PlusCircle className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add Menu
                      </span>
                    </Button>
                  </CardHeader>
                </div>
                <CardContent>
                  {loading ? (
                    <div className="h-min-[100px] flex items-center justify-center">
                      <LoadingSpinner />
                    </div>
                  ) : menus.length > 0 ? (
                    <Menus menus={menus} />
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
          title="No menu found"
          subtitle="You can add a new menu by clicking on below button"
        >
          <Button
            className="mt-4"
            onClick={() => {
              setOpenAddMenuDialog(true);
            }}
          >
            Add Menu
          </Button>
        </EmptyState>
      )}

      <EditMenuDialog
        open={!!searchParams.get('edit')}
        onOpenChange={(open) => {
          if (!open) {
            searchParams.delete('edit');
            setSearchParams(searchParams);
            refetch();
          }
        }}
        refetch={refetch}
      />
      <DeleteMenuDialog
        open={!!searchParams.get('delete')}
        onOpenChange={(open) => {
          if (!open) {
            searchParams.delete('delete');
            setSearchParams(searchParams);
          }
        }}
        refetch={refetch}
      />
      <AddMenuDialog
        open={openAddMenuDialog}
        onOpenChange={setOpenAddMenuDialog}
        refetch={refetch}
      />
    </DashboardContentWrapper>
  );
}

export default MenusPage;
