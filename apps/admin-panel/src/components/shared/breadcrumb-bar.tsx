import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Link } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

type BreadcrumbBarProps = {
  routes: { label: string; to: string }[];
};

function BreadcrumbBar(props: BreadcrumbBarProps) {
  const { routes } = props;

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {routes.map(({ label, to }, index) => (
          <Fragment>
            <BreadcrumbItem key={to}>
              <BreadcrumbLink asChild>
                <Link to={to}>{label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {routes.length - 1 > index && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default BreadcrumbBar;
