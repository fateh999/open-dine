import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = JSON.parse(
  import.meta.env.VITE_FIREBASE_CONFIG as string
);

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);

signInWithEmailAndPassword(auth, 'superadmin@openmenu.com', '12345678').then(
  async (response) => {
    const token = await response.user.getIdToken();
    console.log({ token: `Bearer ${token}` });
  }
);
