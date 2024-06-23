import {
  GetStaffsQuery,
  GetStaffsQueryVariables,
} from '@/__generated__/graphql';
import { Button } from '@/components/ui/button';
import EmptyState from '@/modules/dashboard/components/empty-state';
import { gql, useQuery } from '@apollo/client';
import { PlusCircle } from 'lucide-react';
import { MoreHorizontal, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Link, useSearchParams } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import PaginationBar from '@/components/shared/pagination-bar';
import { useDebounce } from 'use-debounce';
import { Switch } from '@/components/ui/switch';
import { format } from 'date-fns';
import EditStaffDialog from '@/modules/staff/components/edit-staff-dialog';
import AddStaffDialog from '@/modules/staff/components/add-staff-dialog';
import DeleteStaffDialog from '@/modules/staff/components/delete-staff-dialog';
import UpdateStaffStatusDialog from '@/modules/staff/components/update-staff-status-dialog';
import { useState } from 'react';
import { LoadingSpinner } from '@/components/ui/spinner';

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
  const { totalCount = 0, totalPages = 0, currentPage = 0 } = data?.users ?? {};
  const [openAddStaffDialog, setOpenAddStaffDialog] = useState(false);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/40">
      <div
        className="rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        {totalCount > 0 || loading ? (
          <div className="flex w-full flex-col">
            <div className="flex flex-col sm:gap-4 sm:py-4">
              <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <Breadcrumb className="hidden md:flex">
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link to="/">Dashboard</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link to="/products">Staffs</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                <div className="relative ml-auto flex-1 md:grow-0">
                  <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                    defaultValue={searchString}
                    onChange={(event) => {
                      searchParams.set('search', event.target.value);
                      setSearchParams(searchParams);
                    }}
                  />
                </div>
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
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="hidden w-[100px] sm:table-cell">
                              <span className="sr-only">Image</span>
                            </TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead className="hidden md:table-cell">
                              Email
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                              Status
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                              Updated at
                            </TableHead>
                            <TableHead>
                              <span className="sr-only">Actions</span>
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {staffs.map((staff) => (
                            <TableRow key={staff.id}>
                              <TableCell className="hidden sm:table-cell">
                                <Avatar>
                                  <AvatarImage src={staff.photoUrl ?? ''} />
                                  <AvatarFallback>
                                    {staff.displayName?.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                              </TableCell>
                              <TableCell className="font-medium">
                                {staff.displayName}
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">{staff.role}</Badge>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {staff.email}
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                <Switch
                                  checked={!staff.disabled}
                                  onCheckedChange={() => {
                                    searchParams.set('status', staff.id);
                                    setSearchParams(searchParams);
                                  }}
                                />
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {format(staff.updatedAt, 'MMMM dd, yyyy HH:mm')}
                              </TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      aria-haspopup="true"
                                      size="icon"
                                      variant="ghost"
                                    >
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">
                                        Toggle menu
                                      </span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>
                                      Actions
                                    </DropdownMenuLabel>
                                    <DropdownMenuItem
                                      onClick={() => {
                                        searchParams.set('edit', staff.id);
                                        setSearchParams(searchParams);
                                      }}
                                    >
                                      Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => {
                                        searchParams.set('delete', staff.id);
                                        setSearchParams(searchParams);
                                      }}
                                    >
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <EmptyState
                        title="No results found"
                        subtitle="Try adjusting your search to find what you're looking for."
                      />
                    )}
                  </CardContent>
                  <CardFooter>
                    <PaginationBar
                      totalCount={totalCount}
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
      </div>

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
    </main>
  );
}

export default StaffsPage;
