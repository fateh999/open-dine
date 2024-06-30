// import {
//   File,
//   ListFilter,
//   MoreHorizontal,
//   PlusCircle,
//   Search,
// } from 'lucide-react';
// import { Badge } from '@/components/ui/badge';
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from '@/components/ui/breadcrumb';
// import { Button } from '@/components/ui/button';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import { Input } from '@/components/ui/input';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Link } from 'react-router-dom';
// import EmptyState from '@/modules/dashboard/components/empty-state';

// function ProductsPage() {
//   const products = true;

//   return (
//     <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
//       <div
//         className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
//         x-chunk="dashboard-02-chunk-1"
//       >
//         {products ? (
//           <div className="flex min-h-screen w-full flex-col bg-muted/40">
//             <div className="flex flex-col sm:gap-4 sm:py-4">
//               <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
//                 <Breadcrumb className="hidden md:flex">
//                   <BreadcrumbList>
//                     <BreadcrumbItem>
//                       <BreadcrumbLink asChild>
//                         <Link to="/">Dashboard</Link>
//                       </BreadcrumbLink>
//                     </BreadcrumbItem>
//                     <BreadcrumbSeparator />
//                     <BreadcrumbItem>
//                       <BreadcrumbLink asChild>
//                         <Link to="/products">Products</Link>
//                       </BreadcrumbLink>
//                     </BreadcrumbItem>
//                     <BreadcrumbSeparator />
//                     <BreadcrumbItem>
//                       <BreadcrumbPage>All Products</BreadcrumbPage>
//                     </BreadcrumbItem>
//                   </BreadcrumbList>
//                 </Breadcrumb>
//                 <div className="relative ml-auto flex-1 md:grow-0">
//                   <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     type="search"
//                     placeholder="Search..."
//                     className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
//                   />
//                 </div>
//               </header>
//               <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
//                 <Tabs defaultValue="all">
//                   <div className="flex items-center">
//                     <TabsList>
//                       <TabsTrigger value="all">All</TabsTrigger>
//                       <TabsTrigger value="active">Active</TabsTrigger>
//                       <TabsTrigger value="draft">Draft</TabsTrigger>
//                       <TabsTrigger value="archived" className="hidden sm:flex">
//                         Archived
//                       </TabsTrigger>
//                     </TabsList>
//                     <div className="ml-auto flex items-center gap-2">
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             className="h-8 gap-1"
//                           >
//                             <ListFilter className="h-3.5 w-3.5" />
//                             <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
//                               Filter
//                             </span>
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end">
//                           <DropdownMenuLabel>Filter by</DropdownMenuLabel>
//                           <DropdownMenuSeparator />
//                           <DropdownMenuCheckboxItem checked>
//                             Active
//                           </DropdownMenuCheckboxItem>
//                           <DropdownMenuCheckboxItem>
//                             Draft
//                           </DropdownMenuCheckboxItem>
//                           <DropdownMenuCheckboxItem>
//                             Archived
//                           </DropdownMenuCheckboxItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                       <Button size="sm" variant="outline" className="h-8 gap-1">
//                         <File className="h-3.5 w-3.5" />
//                         <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
//                           Export
//                         </span>
//                       </Button>
//                       <Button size="sm" className="h-8 gap-1">
//                         <PlusCircle className="h-3.5 w-3.5" />
//                         <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
//                           Add Product
//                         </span>
//                       </Button>
//                     </div>
//                   </div>
//                   <TabsContent value="all">
//                     <Card x-chunk="dashboard-06-chunk-0">
//                       <CardHeader>
//                         <CardTitle>Products</CardTitle>
//                         <CardDescription>
//                           Manage your products and view their sales performance.
//                         </CardDescription>
//                       </CardHeader>
//                       <CardContent>
//                         <Table>
//                           <TableHeader>
//                             <TableRow>
//                               <TableHead className="hidden w-[100px] sm:table-cell">
//                                 <span className="sr-only">Image</span>
//                               </TableHead>
//                               <TableHead>Name</TableHead>
//                               <TableHead>Status</TableHead>
//                               <TableHead className="hidden md:table-cell">
//                                 Price
//                               </TableHead>
//                               <TableHead className="hidden md:table-cell">
//                                 Total Sales
//                               </TableHead>
//                               <TableHead className="hidden md:table-cell">
//                                 Created at
//                               </TableHead>
//                               <TableHead>
//                                 <span className="sr-only">Actions</span>
//                               </TableHead>
//                             </TableRow>
//                           </TableHeader>
//                           <TableBody>
//                             <TableRow>
//                               <TableCell className="hidden sm:table-cell">
//                                 <img
//                                   alt="Product image"
//                                   className="aspect-square rounded-md object-cover"
//                                   height="64"
//                                   src={
//                                     'https://images.pexels.com/photos/327158/pexels-photo-327158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
//                                   }
//                                   width="64"
//                                 />
//                               </TableCell>
//                               <TableCell className="font-medium">
//                                 Laser Lemonade Machine
//                               </TableCell>
//                               <TableCell>
//                                 <Badge variant="outline">Draft</Badge>
//                               </TableCell>
//                               <TableCell className="hidden md:table-cell">
//                                 $499.99
//                               </TableCell>
//                               <TableCell className="hidden md:table-cell">
//                                 25
//                               </TableCell>
//                               <TableCell className="hidden md:table-cell">
//                                 2023-07-12 10:42 AM
//                               </TableCell>
//                               <TableCell>
//                                 <DropdownMenu>
//                                   <DropdownMenuTrigger asChild>
//                                     <Button
//                                       aria-haspopup="true"
//                                       size="icon"
//                                       variant="ghost"
//                                     >
//                                       <MoreHorizontal className="h-4 w-4" />
//                                       <span className="sr-only">
//                                         Toggle menu
//                                       </span>
//                                     </Button>
//                                   </DropdownMenuTrigger>
//                                   <DropdownMenuContent align="end">
//                                     <DropdownMenuLabel>
//                                       Actions
//                                     </DropdownMenuLabel>
//                                     <DropdownMenuItem>Edit</DropdownMenuItem>
//                                     <DropdownMenuItem>Delete</DropdownMenuItem>
//                                   </DropdownMenuContent>
//                                 </DropdownMenu>
//                               </TableCell>
//                             </TableRow>
//                             <TableRow>
//                               <TableCell className="hidden sm:table-cell">
//                                 <img
//                                   alt="Product image"
//                                   className="aspect-square rounded-md object-cover"
//                                   height="64"
//                                   src={
//                                     'https://images.pexels.com/photos/327158/pexels-photo-327158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
//                                   }
//                                   width="64"
//                                 />
//                               </TableCell>
//                               <TableCell className="font-medium">
//                                 Hypernova Headphones
//                               </TableCell>
//                               <TableCell>
//                                 <Badge variant="outline">Active</Badge>
//                               </TableCell>
//                               <TableCell className="hidden md:table-cell">
//                                 $129.99
//                               </TableCell>
//                               <TableCell className="hidden md:table-cell">
//                                 100
//                               </TableCell>
//                               <TableCell className="hidden md:table-cell">
//                                 2023-10-18 03:21 PM
//                               </TableCell>
//                               <TableCell>
//                                 <DropdownMenu>
//                                   <DropdownMenuTrigger asChild>
//                                     <Button
//                                       aria-haspopup="true"
//                                       size="icon"
//                                       variant="ghost"
//                                     >
//                                       <MoreHorizontal className="h-4 w-4" />
//                                       <span className="sr-only">
//                                         Toggle menu
//                                       </span>
//                                     </Button>
//                                   </DropdownMenuTrigger>
//                                   <DropdownMenuContent align="end">
//                                     <DropdownMenuLabel>
//                                       Actions
//                                     </DropdownMenuLabel>
//                                     <DropdownMenuItem>Edit</DropdownMenuItem>
//                                     <DropdownMenuItem>Delete</DropdownMenuItem>
//                                   </DropdownMenuContent>
//                                 </DropdownMenu>
//                               </TableCell>
//                             </TableRow>
//                             <TableRow>
//                               <TableCell className="hidden sm:table-cell">
//                                 <img
//                                   alt="Product image"
//                                   className="aspect-square rounded-md object-cover"
//                                   height="64"
//                                   src={
//                                     'https://images.pexels.com/photos/327158/pexels-photo-327158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
//                                   }
//                                   width="64"
//                                 />
//                               </TableCell>
//                               <TableCell className="font-medium">
//                                 AeroGlow Desk Lamp
//                               </TableCell>
//                               <TableCell>
//                                 <Badge variant="outline">Active</Badge>
//                               </TableCell>
//                               <TableCell className="hidden md:table-cell">
//                                 $39.99
//                               </TableCell>
//                               <TableCell className="hidden md:table-cell">
//                                 50
//                               </TableCell>
//                               <TableCell className="hidden md:table-cell">
//                                 2023-11-29 08:15 AM
//                               </TableCell>
//                               <TableCell>
//                                 <DropdownMenu>
//                                   <DropdownMenuTrigger asChild>
//                                     <Button
//                                       aria-haspopup="true"
//                                       size="icon"
//                                       variant="ghost"
//                                     >
//                                       <MoreHorizontal className="h-4 w-4" />
//                                       <span className="sr-only">
//                                         Toggle menu
//                                       </span>
//                                     </Button>
//                                   </DropdownMenuTrigger>
//                                   <DropdownMenuContent align="end">
//                                     <DropdownMenuLabel>
//                                       Actions
//                                     </DropdownMenuLabel>
//                                     <DropdownMenuItem>Edit</DropdownMenuItem>
//                                     <DropdownMenuItem>Delete</DropdownMenuItem>
//                                   </DropdownMenuContent>
//                                 </DropdownMenu>
//                               </TableCell>
//                             </TableRow>
//                             <TableRow>
//                               <TableCell className="hidden sm:table-cell">
//                                 <img
//                                   alt="Product image"
//                                   className="aspect-square rounded-md object-cover"
//                                   height="64"
//                                   src={
//                                     'https://images.pexels.com/photos/327158/pexels-photo-327158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
//                                   }
//                                   width="64"
//                                 />
//                               </TableCell>
//                               <TableCell className="font-medium">
//                                 TechTonic Energy Drink
//                               </TableCell>
//                               <TableCell>
//                                 <Badge variant="secondary">Draft</Badge>
//                               </TableCell>
//                               <TableCell className="hidden md:table-cell">
//                                 $2.99
//                               </TableCell>
//                               <TableCell className="hidden md:table-cell">
//                                 0
//                               </TableCell>
//                               <TableCell className="hidden md:table-cell">
//                                 2023-12-25 11:59 PM
//                               </TableCell>
//                               <TableCell>
//                                 <DropdownMenu>
//                                   <DropdownMenuTrigger asChild>
//                                     <Button
//                                       aria-haspopup="true"
//                                       size="icon"
//                                       variant="ghost"
//                                     >
//                                       <MoreHorizontal className="h-4 w-4" />
//                                       <span className="sr-only">
//                                         Toggle menu
//                                       </span>
//                                     </Button>
//                                   </DropdownMenuTrigger>
//                                   <DropdownMenuContent align="end">
//                                     <DropdownMenuLabel>
//                                       Actions
//                                     </DropdownMenuLabel>
//                                     <DropdownMenuItem>Edit</DropdownMenuItem>
//                                     <DropdownMenuItem>Delete</DropdownMenuItem>
//                                   </DropdownMenuContent>
//                                 </DropdownMenu>
//                               </TableCell>
//                             </TableRow>
//                             <TableRow>
//                               <TableCell className="hidden sm:table-cell">
//                                 <img
//                                   alt="Product image"
//                                   className="aspect-square rounded-md object-cover"
//                                   height="64"
//                                   src={
//                                     'https://images.pexels.com/photos/327158/pexels-photo-327158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
//                                   }
//                                   width="64"
//                                 />
//                               </TableCell>
//                               <TableCell className="font-medium">
//                                 Gamer Gear Pro Controller
//                               </TableCell>
//                               <TableCell>
//                                 <Badge variant="outline">Active</Badge>
//                               </TableCell>
//                               <TableCell className="hidden md:table-cell">
//                                 $59.99
//                               </TableCell>
//                               <TableCell className="hidden md:table-cell">
//                                 75
//                               </TableCell>
//                               <TableCell className="hidden md:table-cell">
//                                 2024-01-01 12:00 AM
//                               </TableCell>
//                               <TableCell>
//                                 <DropdownMenu>
//                                   <DropdownMenuTrigger asChild>
//                                     <Button
//                                       aria-haspopup="true"
//                                       size="icon"
//                                       variant="ghost"
//                                     >
//                                       <MoreHorizontal className="h-4 w-4" />
//                                       <span className="sr-only">
//                                         Toggle menu
//                                       </span>
//                                     </Button>
//                                   </DropdownMenuTrigger>
//                                   <DropdownMenuContent align="end">
//                                     <DropdownMenuLabel>
//                                       Actions
//                                     </DropdownMenuLabel>
//                                     <DropdownMenuItem>Edit</DropdownMenuItem>
//                                     <DropdownMenuItem>Delete</DropdownMenuItem>
//                                   </DropdownMenuContent>
//                                 </DropdownMenu>
//                               </TableCell>
//                             </TableRow>
//                             <TableRow>
//                               <TableCell className="hidden sm:table-cell">
//                                 <img
//                                   alt="Product image"
//                                   className="aspect-square rounded-md object-cover"
//                                   height="64"
//                                   src={
//                                     'https://images.pexels.com/photos/327158/pexels-photo-327158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
//                                   }
//                                   width="64"
//                                 />
//                               </TableCell>
//                               <TableCell className="font-medium">
//                                 Luminous VR Headset
//                               </TableCell>
//                               <TableCell>
//                                 <Badge variant="outline">Active</Badge>
//                               </TableCell>
//                               <TableCell className="hidden md:table-cell">
//                                 $199.99
//                               </TableCell>
//                               <TableCell className="hidden md:table-cell">
//                                 30
//                               </TableCell>
//                               <TableCell className="hidden md:table-cell">
//                                 2024-02-14 02:14 PM
//                               </TableCell>
//                               <TableCell>
//                                 <DropdownMenu>
//                                   <DropdownMenuTrigger asChild>
//                                     <Button
//                                       aria-haspopup="true"
//                                       size="icon"
//                                       variant="ghost"
//                                     >
//                                       <MoreHorizontal className="h-4 w-4" />
//                                       <span className="sr-only">
//                                         Toggle menu
//                                       </span>
//                                     </Button>
//                                   </DropdownMenuTrigger>
//                                   <DropdownMenuContent align="end">
//                                     <DropdownMenuLabel>
//                                       Actions
//                                     </DropdownMenuLabel>
//                                     <DropdownMenuItem>Edit</DropdownMenuItem>
//                                     <DropdownMenuItem>Delete</DropdownMenuItem>
//                                   </DropdownMenuContent>
//                                 </DropdownMenu>
//                               </TableCell>
//                             </TableRow>
//                           </TableBody>
//                         </Table>
//                       </CardContent>
//                       <CardFooter>
//                         <div className="text-xs text-muted-foreground">
//                           Showing <strong>1-10</strong> of <strong>32</strong>{' '}
//                           products
//                         </div>
//                       </CardFooter>
//                     </Card>
//                   </TabsContent>
//                 </Tabs>
//               </main>
//             </div>
//           </div>
//         ) : (
//           <EmptyState
//             title="You have no products"
//             subtitle="You can start selling as soon as you add a product."
//           >
//             <Button className="mt-4">Add Product</Button>
//           </EmptyState>
//         )}
//       </div>
//     </main>
//   );
// }

// export default ProductsPage;

import {
  GetFoodsQuery,
  GetFoodsQueryVariables,
  UserRole,
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
import DeleteStaffDialog from '@/modules/staff/components/delete-staff-dialog';
import UpdateStaffStatusDialog from '@/modules/staff/components/update-staff-status-dialog';
import { LoadingSpinner } from '@/components/ui/spinner';
import BreadcrumbBar from '@/components/shared/breadcrumb-bar';
import SearchInput from '@/components/shared/search-input';
import DashboardContentWrapper from '@/components/shared/dashboard-content-wrapper';
import RoleBasedWrapper from '@/components/shared/role-based-wrapper';

const GET_FOODS = gql`
  query getFoods($take: Int!, $skip: Int!, $search: String) {
    foods(skip: $skip, take: $take, search: $search) {
      items {
        id
        photoUrl
        categoryId
        description
        foodType
        name
        description
        createdAt
        updatedAt
        inStock
        customizations {
          costPrice
          sellingPrice
          name
          isDefault
        }
        category {
          id
          name
        }
      }
      totalCount
      conditionalTotalCount
      totalPages
      currentPage
    }
  }
`;

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
  const foods = data?.foods?.items ?? [];
  const {
    totalCount = 0,
    conditionalTotalCount = 0,
    totalPages = 0,
    currentPage = 0,
  } = data?.foods ?? {};

  console.log({ foods });

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
                        onClick={() => {}}
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
                  ) : foods.length > 0 ? (
                    // <Staffs staffs={staffs} />
                    <></>
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
              <Button className="mt-4" onClick={() => {}}>
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
    </DashboardContentWrapper>
  );
}

export default ProductsPage;
