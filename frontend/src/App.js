import './App.css';
import React from "react";
import UpdateProduct from "./components/UpdateProduct";
import AddProduct from "./components/AddProduct";
import CalculateTax from "./components/CalculateTax";

function App() {
  return (
    <div>
      <h1>BB Brewery Application</h1>
      <UpdateProduct />
      <AddProduct />
      <CalculateTax />
    </div>
  );
}

export default App;
