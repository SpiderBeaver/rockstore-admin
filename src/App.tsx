import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import styled from 'styled-components/macro';
import NewProductForm from './components/NewProductForm';
import ProductsList from './components/ProductsList';
import Sidebar from './components/Sidebar';

const Layout = styled.div`
  display: grid;
  grid-template-columns: 20em auto;
`;

const SidebarContainer = styled.div`
  grid-column: 1 / 2;
`;

const ContentContainer = styled.div`
  grid-column: 2 / 3;
  padding: 2em;
`;

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <SidebarContainer>
          <Sidebar></Sidebar>
        </SidebarContainer>
        <ContentContainer>
          <ProductsList></ProductsList>
          <NewProductForm></NewProductForm>
        </ContentContainer>
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
