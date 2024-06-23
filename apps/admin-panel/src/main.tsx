import './utils/firebase-config';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './index.css';
import { ApolloProvider } from '@apollo/client';
import apolloClient from './utils/apollo-client';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
);
