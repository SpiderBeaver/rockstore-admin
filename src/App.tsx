import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import NewProductForm from './components/NewProductForm';
import ProductsList from './components/ProductsList';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <ProductsList></ProductsList>
        <NewProductForm></NewProductForm>
      </div>
    </QueryClientProvider>
  );
}

export default App;
