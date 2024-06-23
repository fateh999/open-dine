import { UserRole } from '@/__generated__/graphql';
import useAuthState from '@/modules/auth/hooks/use-auth-state';

type RoleBasedWrapperProps = {
  allowedRoles: UserRole[];
  children: JSX.Element | JSX.Element[];
};

function RoleBasedWrapper(props: RoleBasedWrapperProps) {
  const { allowedRoles, children } = props;
  const userRole = useAuthState((state) => state.role);

  if (userRole && allowedRoles.includes(userRole)) {
    return <>{children}</>;
  }
  return null;
}

export default RoleBasedWrapper;
