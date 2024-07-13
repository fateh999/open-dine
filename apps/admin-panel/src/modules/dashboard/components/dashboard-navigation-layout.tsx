import {
  Contact,
  CookingPot,
  Home,
  NotebookText,
  Package2,
  ShoppingCart,
  SquareMenu,
  User,
} from 'lucide-react';
import { useMemo } from 'react';
import { Link, Outlet } from 'react-router-dom';
import SideMenu from './side-menu';
import SideMenuSheet from './side-menu-sheet';
import UserDropdown from '@/modules/auth/components/user-dropdown';
import { UserRole } from '@/__generated__/graphql';

function DashboardNavigationLayout() {
  const routes = useMemo(
    () => [
      {
        title: 'Dashboard',
        to: '/',
        icon: Home,
        allowedRoles: [UserRole.Admin, UserRole.Staff, UserRole.SuperAdmin],
      },
      {
        title: 'Orders',
        to: '/orders',
        icon: ShoppingCart,
        count: 6,
        allowedRoles: [UserRole.Admin, UserRole.Staff, UserRole.SuperAdmin],
      },
      {
        title: 'Staffs',
        to: '/staffs',
        icon: Contact,
        allowedRoles: [UserRole.Admin, UserRole.SuperAdmin],
      },
      {
        title: 'Customers',
        to: '/customers',
        icon: User,
        allowedRoles: [UserRole.Admin, UserRole.SuperAdmin],
      },
      {
        title: 'Products',
        to: '/products',
        icon: CookingPot,
        allowedRoles: [UserRole.Admin, UserRole.SuperAdmin, UserRole.Staff],
      },
      {
        title: 'Categories',
        to: '/categories',
        icon: SquareMenu,
        allowedRoles: [UserRole.Admin, UserRole.SuperAdmin],
      },
      {
        title: 'Menus',
        to: '/menus',
        icon: NotebookText,
        allowedRoles: [UserRole.Admin, UserRole.SuperAdmin],
      },
    ],
    [],
  );

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Open Dine</span>
            </Link>
          </div>
          <SideMenu routes={routes} />
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <SideMenuSheet routes={routes} />
          <div className="w-full flex-1" />
          <UserDropdown />
        </header>
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardNavigationLayout;
