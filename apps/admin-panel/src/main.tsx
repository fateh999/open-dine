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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster />
      </QueryClientProvider>
    </ApolloProvider>
  </React.StrictMode>,
);
