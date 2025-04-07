import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    product_name: "",
    description: "",
    image: "",
    price: "",
    active: 1,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async () => {
    try {
      const response = await axios.post("http://localhost:5000/add-product", productData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error adding product");
    }
  };

  return (
    <div>
      <h2>Add New Product</h2>
      <input type="text" name="product_name" placeholder="Product Name" onChange={handleChange} />
      <input type="text" name="description" placeholder="Description" onChange={handleChange} />
      <input type="text" name="image" placeholder="Image Filename" onChange={handleChange} />
      <input type="number" name="price" placeholder="Price" onChange={handleChange} />
      <input type="number" name="Active" placeholder="Active" onChange={handleChange} />
      <button onClick={handleAddProduct}>Add Product</button>
      <p>{message}</p>
    </div>
  );
};

export default AddProduct;
