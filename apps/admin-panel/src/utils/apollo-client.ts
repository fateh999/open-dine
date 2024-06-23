import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getIdToken } from 'firebase/auth';
import { auth } from './firebase-config';

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_API_URL as string,
});

const authLink = setContext(async (_, { headers }) => {
  const token = auth.currentUser ? await getIdToken(auth.currentUser) : '';
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
      'x-restaurant-slug': 'restaurant',
    },
  };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default apolloClient;
