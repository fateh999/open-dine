import { auth } from '@/utils/firebase-config';
import { useEffect, useState } from 'react';
import useAuthState from './use-auth-state';
import { GetUserProfileQuery } from '@/__generated__/graphql';
import { gql, useQuery } from '@apollo/client';
import { signOut } from 'firebase/auth';

const GET_USER_PROFILE = gql`
  query getUserProfile {
    userProfile {
      id
      displayName
      role
    }
  }
`;

function useAuthStateChanged() {
  const [firebaseLoggedIn, setFirebaseLoggedIn] = useState(false);

  const { refetch } = useQuery<GetUserProfileQuery>(GET_USER_PROFILE, {
    onCompleted: (data) => {
      const { id, role } = data?.userProfile ?? {};
      if (id) {
        useAuthState.setState({ loggedIn: true, initialized: true, role });
      } else {
        signOut(auth);
      }
    },
    skip: !firebaseLoggedIn,
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setFirebaseLoggedIn(user ? true : false);
      if (user) {
        refetch();
      }
      if (!user) {
        useAuthState.setState({
          loggedIn: false,
          initialized: true,
          role: undefined,
        });
      }
    });

    return unsubscribe;
  }, [refetch]);
}

export default useAuthStateChanged;
