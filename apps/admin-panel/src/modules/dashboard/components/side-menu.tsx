import { LucideProps } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserRole } from '@/__generated__/graphql';
import RoleBasedWrapper from '@/components/shared/role-based-wrapper';

type SideMenuProps = {
  routes: {
    title: string;
    to: string;
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
    >;
    count?: number;
    allowedRoles: UserRole[];
  }[];
};

function SideMenu(props: SideMenuProps) {
  const { routes } = props;
  const location = useLocation();

  return (
    <div className="flex-1">
      <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
        {routes.map((route) => {
          const active = location?.pathname === route.to;
          return (
            <RoleBasedWrapper allowedRoles={route.allowedRoles}>
              <Link
                key={route.to}
                to={route.to}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${active ? 'bg-muted' : ''} ${active ? 'text-primary' : 'text-muted-foreground'}`}
              >
                <route.icon className="h-4 w-4" />
                {route.title}
                {route.count ? (
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    {route.count}
                  </Badge>
                ) : (
                  <></>
                )}
              </Link>
            </RoleBasedWrapper>
          );
        })}
      </nav>
    </div>
  );
}

export default SideMenu;
