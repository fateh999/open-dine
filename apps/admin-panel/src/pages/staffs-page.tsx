import {
  GetStaffsQuery,
  GetStaffsQueryVariables,
} from '@/__generated__/graphql';
import { Button } from '@/components/ui/button';
import EmptyState from '@/modules/dashboard/components/empty-state';
import { gql, useQuery } from '@apollo/client';
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
import EditStaffDialog from '@/modules/staff/components/edit-staff-dialog';
import AddStaffDialog from '@/modules/staff/components/add-staff-dialog';
import DeleteStaffDialog from '@/modules/staff/components/delete-staff-dialog';
import UpdateStaffStatusDialog from '@/modules/staff/components/update-staff-status-dialog';
import { useState } from 'react';
import { LoadingSpinner } from '@/components/ui/spinner';
import BreadcrumbBar from '@/components/shared/breadcrumb-bar';
import Staffs from '@/modules/staff/components/staffs';
import SearchInput from '@/components/shared/search-input';
import DashboardContentWrapper from '@/components/shared/dashboard-content-wrapper';

const GET_STAFFS = gql`
  query getStaffs($take: Int!, $skip: Int!, $search: String) {
    users(skip: $skip, take: $take, search: $search) {
      items {
        id
        displayName
        photoUrl
        role
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

function StaffsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPageString = searchParams.get('page') ?? '1';
  const searchString = searchParams.get('search') ?? '';
  const [search] = useDebounce(searchString, 1000);
  const pageLimit = 3;
  const { data, loading, refetch } = useQuery<
    GetStaffsQuery,
    GetStaffsQueryVariables
  >(GET_STAFFS, {
    variables: {
      take: pageLimit,
      skip: (parseInt(currentPageString) - 1) * pageLimit,
      search: search,
    },
  });
  const staffs = data?.users?.items ?? [];
  const {
    totalCount = 0,
    conditionalTotalCount = 0,
    totalPages = 0,
    currentPage = 0,
  } = data?.users ?? {};
  const [openAddStaffDialog, setOpenAddStaffDialog] = useState(false);

  return (
    <DashboardContentWrapper>
      {totalCount > 0 || loading ? (
        <div className="flex w-full flex-col">
          <div className="flex flex-col sm:gap-4 sm:py-4">
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
              <BreadcrumbBar
                routes={[
                  { label: 'Dashboard', to: '/' },
                  { label: 'Staffs', to: '/staffs' },
                ]}
              />
              <SearchInput />
            </header>
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
              <Card x-chunk="dashboard-06-chunk-0">
                <div className="flex items-center">
                  <CardHeader>
                    <CardTitle>Staffs</CardTitle>
                    <CardDescription>Manage your staffs.</CardDescription>
                  </CardHeader>
                  <CardHeader className="ml-auto flex items-center gap-2">
                    <Button
                      size="sm"
                      className="h-8 gap-1"
                      onClick={() => {
                        setOpenAddStaffDialog(true);
                      }}
                    >
                      <PlusCircle className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add Staff
                      </span>
                    </Button>
                  </CardHeader>
                </div>
                <CardContent>
                  {loading ? (
                    <div className="h-min-[100px] flex items-center justify-center">
                      <LoadingSpinner />
                    </div>
                  ) : staffs.length > 0 ? (
                    <Staffs staffs={staffs} />
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
          title="No staff found"
          subtitle="You can add a new staff by clicking on below button"
        >
          <Button
            className="mt-4"
            onClick={() => {
              setOpenAddStaffDialog(true);
            }}
          >
            Add Staff
          </Button>
        </EmptyState>
      )}

      <EditStaffDialog
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
      <DeleteStaffDialog
        open={!!searchParams.get('delete')}
        onOpenChange={(open) => {
          if (!open) {
            searchParams.delete('delete');
            setSearchParams(searchParams);
          }
        }}
        refetch={refetch}
      />
      <UpdateStaffStatusDialog
        open={!!searchParams.get('status')}
        onOpenChange={(open) => {
          if (!open) {
            searchParams.delete('status');
            setSearchParams(searchParams);
          }
        }}
        refetch={refetch}
      />
      <AddStaffDialog
        open={openAddStaffDialog}
        onOpenChange={setOpenAddStaffDialog}
        refetch={refetch}
      />
    </DashboardContentWrapper>
  );
}

export default StaffsPage;
