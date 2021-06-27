import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import styled from 'styled-components/macro';
import ProductsCard from './components/ProductsCard';
import Sidebar from './components/Sidebar';

const Layout = styled.div`
  display: grid;
  grid-template-columns: 20em auto;
  height: 100vh;
`;

const SidebarContainer = styled.div`
  grid-column: 1 / 2;
`;

const ContentContainer = styled.div`
  grid-column: 2 / 3;
  padding: 2em;
  background-color: #e9ecff;
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
          <ProductsCard></ProductsCard>
        </ContentContainer>
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
