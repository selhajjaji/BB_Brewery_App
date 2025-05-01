import React from "react";
import './App.css';
import UpdateProduct from "./components/UpdateProduct";
import AddProduct from "./components/AddProduct";
import CalculateTax from "./components/CalculateTax";
import UpdateShippingStatus from './components/UpdateShippingStatus';
import AddToBasket from './components/AddToBasket';
import CheckSaleStatus from './components/CheckSaleStatus';
import CheckBasketStock from './components/CheckBasketStock';
import ShopperSpendingReport from './components/ShopperSpendingReport';


function App() {
  return (
    <div className="App" style={{ padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', color: '#6a1b9a' }}>BB Brewery Application</h1>
      
      <div style={{ marginBottom: '3rem' }}>
        <UpdateProduct />
      </div>

      <div style={{ marginBottom: '3rem' }}>
        <AddProduct />
      </div>

      <div>
        <CalculateTax />
      </div>
      <div>
      <UpdateShippingStatus />
      </div>     
      <div>
      <AddToBasket />
      </div>
      <div>
      <CheckSaleStatus  />
      </div>
      <div>
      <CheckBasketStock />
      </div>
      <div>
      <ShopperSpendingReport />
      </div>
      
    </div>
    
  );
}

export default App;
