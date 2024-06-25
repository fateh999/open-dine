import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { AuthError } from 'firebase/auth';
import { toast } from '@/components/ui/use-toast';

const firebaseConfig = JSON.parse(
  import.meta.env.VITE_FIREBASE_CONFIG as string,
);

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);

export const handleAuthError = (error: AuthError) => {
  switch (error.code) {
    case 'auth/invalid-email':
      toast({
        variant: 'destructive',
        title: 'Invalid Email',
        description: 'The email address is not valid.',
      });
      break;
    case 'auth/user-disabled':
      toast({
        variant: 'destructive',
        title: 'User Disabled',
        description:
          'The user corresponding to the given email has been disabled.',
      });
      break;
    case 'auth/user-not-found':
      toast({
        variant: 'destructive',
        title: 'User Not Found',
        description: 'There is no user corresponding to the given email.',
      });
      break;
    case 'auth/wrong-password':
      toast({
        variant: 'destructive',
        title: 'Wrong Password',
        description: 'The password is invalid for the given email.',
      });
      break;
    case 'auth/email-already-in-use':
      toast({
        variant: 'destructive',
        title: 'Email Already in Use',
        description: 'The email address is already in use by another account.',
      });
      break;
    case 'auth/operation-not-allowed':
      toast({
        variant: 'destructive',
        title: 'Operation Not Allowed',
        description:
          'Operation not allowed. Please enable in the Firebase console.',
      });
      break;
    case 'auth/weak-password':
      toast({
        variant: 'destructive',
        title: 'Weak Password',
        description: 'The password is too weak.',
      });
      break;
    case 'auth/too-many-requests':
      toast({
        variant: 'destructive',
        title: 'Too Many Requests',
        description: 'Too many requests. Try again later.',
      });
      break;
    case 'auth/network-request-failed':
      toast({
        variant: 'destructive',
        title: 'Network Error',
        description: 'Network error. Check your internet connection.',
      });
      break;
    case 'auth/invalid-credential':
      toast({
        variant: 'destructive',
        title: 'Invalid Credentials',
        description: 'Please check your credentials and try again',
      });
      break;
    default:
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      });
      console.error('An unknown error occurred:', error.message);
      break;
  }
};
