import React from 'react';
import './App.css';
import NewProductForm from './components/NewProductForm';
import ProductsList from './components/ProductsList';

function App() {
  return (
    <div className="App">
      <ProductsList></ProductsList>
      <NewProductForm></NewProductForm>
    </div>
  );
}

export default App;
