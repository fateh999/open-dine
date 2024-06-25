import { auth } from '@/utils/firebase-config';
import { useMutation } from '@tanstack/react-query';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

function useGoogleLogin() {
  return useMutation({
    mutationFn: () => signInWithPopup(auth, new GoogleAuthProvider()),
  });
}

export default useGoogleLogin;
