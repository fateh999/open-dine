import useAuthState from '@/modules/auth/hooks/use-auth-state';
import { Navigate, RouteProps, useLocation } from 'react-router-dom';
import { LoadingSpinner } from '../ui/spinner';

function AuthRoute(props: Pick<RouteProps, 'children'>) {
  const loggedIn = useAuthState((state) => state.loggedIn);
  const initialized = useAuthState((state) => state.initialized);
  const location = useLocation();
  const isAlreadyInAuthRoute = ['/login', '/forgot-password'].includes(
    location.pathname,
  );

  if (!initialized) {
    return (
      <div className="h-lvh w-lvw flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (loggedIn && isAlreadyInAuthRoute && initialized) {
    return <Navigate to="/" />;
  }
  return props.children;
}

export default AuthRoute;
