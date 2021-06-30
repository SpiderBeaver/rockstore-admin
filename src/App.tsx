import { StylesProvider } from '@material-ui/core';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components/macro';
import EditProductCard from './components/products/EditProductCard';
import NewProductCard from './components/products/NewProductCard';
import OrdersCard from './components/orders/OrdersCard';
import ProductsCard from './components/products/ProductsCard';
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
    // Use inject first to properly override styles using styled-components.
    // For details: https://material-ui.com/guides/interoperability/#controlling-priority-3
    <StylesProvider injectFirst>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Layout>
            <SidebarContainer>
              <Sidebar></Sidebar>
            </SidebarContainer>
            <ContentContainer>
              <Switch>
                <Route path="/products/new">
                  <NewProductCard></NewProductCard>
                </Route>
                <Route path="/products/:productId/edit">
                  <EditProductCard></EditProductCard>
                </Route>
                <Route path="/products">
                  <ProductsCard></ProductsCard>
                </Route>
                <Route path="/orders">
                  <OrdersCard></OrdersCard>
                </Route>
                <Route path="/">
                  <div>Home</div>
                </Route>
              </Switch>
            </ContentContainer>
          </Layout>
        </BrowserRouter>
      </QueryClientProvider>
    </StylesProvider>
  );
}

export default App;
