import React from 'react';
import ReactDOM from 'react-dom/client';
import { StyledEngineProvider, styled } from '@mui/material/styles';
import SearchPage from './pages/page.search';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Card } from '@mui/material';
import { ApolloProvider } from '@apollo/client';
import GraphqlClient from './graphql/graphql.client';

const SearchCard = styled(Card)`
  margin: 16px;
`;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ApolloProvider client={GraphqlClient}>
        <SearchCard>
          <SearchPage/>
        </SearchCard>
      </ApolloProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
