import { QueryClient } from '@tanstack/react-query';
import { handleAuthError } from './firebase-config';
import { AuthError } from 'firebase/auth';

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (error) => {
        handleAuthError(error as AuthError);
      },
    },
  },
});

export default queryClient;
