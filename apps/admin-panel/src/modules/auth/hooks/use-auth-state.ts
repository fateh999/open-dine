import { UserRole } from '@/__generated__/graphql';
import { create } from 'zustand';

export type AuthState = {
  loggedIn: boolean;
  initialized: boolean;
  role?: UserRole;
};

const useAuthState = create<AuthState>(() => ({
  loggedIn: false,
  initialized: false,
  role: undefined,
}));

export default useAuthState;
