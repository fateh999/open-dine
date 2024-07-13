import './utils/firebase-config';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './index.css';
import { ApolloProvider } from '@apollo/client';
import apolloClient from './utils/apollo-client';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './utils/tanstack-query-client';
import { Toaster } from './components/ui/toaster';
import { IKContext } from 'imagekitio-react';
import authenticator from './utils/imagekit-authenticator';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
        <IKContext
          publicKey={import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY as string}
          urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT as string}
          authenticator={authenticator}
        >
          <App />
          <Toaster />
        </IKContext>
      </QueryClientProvider>
    </ApolloProvider>
  </React.StrictMode>,
);
