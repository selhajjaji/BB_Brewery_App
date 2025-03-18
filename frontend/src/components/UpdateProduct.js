import React, { useState } from "react";
import axios from "axios";

const UpdateProduct = () => {
  const [productId, setProductId] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdate = async () => {
    try {
      const response = await axios.post("http://localhost:5000/update-product", {
        product_id: productId,
        new_description: newDescription,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error updating product description");
    }
  };

  return (
    <div>
      <h2>Update Product Description</h2>
      <input
        type="text"
        placeholder="Product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <input
        type="text"
        placeholder="New Description"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
      />
      <button onClick={handleUpdate}>Update</button>
      <p>{message}</p>
    </div>
  );
};

export default UpdateProduct;
