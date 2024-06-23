import { UserRole } from '@/__generated__/graphql';
import RoleBasedWrapper from '@/components/shared/role-based-wrapper';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SheetTrigger, SheetContent, Sheet } from '@/components/ui/sheet';
import { Menu, Package2, LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { Link, useLocation } from 'react-router-dom';

type SideMenuSheetProps = {
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

function SideMenuSheet(props: SideMenuSheetProps) {
  const { routes } = props;
  const location = useLocation();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
          <a href="#" className="flex items-center gap-2 text-lg font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Open Dine</span>
          </a>
          {routes.map((route) => {
            const active = location?.pathname === route.to;
            return (
              <RoleBasedWrapper
                key={route.to}
                allowedRoles={route.allowedRoles}
              >
                <Link
                  to={route.to}
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${active ? 'bg-muted' : ''} ${active ? 'text-foreground' : 'text-muted-foreground'} hover:text-foreground`}
                >
                  <route.icon className="h-5 w-5" />
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
      </SheetContent>
    </Sheet>
  );
}

export default SideMenuSheet;
