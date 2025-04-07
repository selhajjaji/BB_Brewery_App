<<<<<<< HEAD
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Card, CardContent, Grid, Divider } from '@mui/material';
import axios from 'axios';
import { Box } from '@mui/material';

function BB_BreweryApp() {
  const [productId, setProductId] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [tax, setTax] = useState('N/A');

  const handleUpdateProduct = async () => {
    try {
      await axios.post('http://localhost:5001/update-product', {
        product_id: productId, // Now using real input
        new_description: newDescription, // Now using real input
      });
      alert('Product description updated successfully!');
    } catch (error) {
      console.error(error);
      alert('Error updating product');
    }
  };

  const handleAddProduct = async () => {
    try {
      await axios.post('http://localhost:5001/add-product', {
        product_name: "Espresso", // Replace with input if needed
        description: "Strong coffee",
        image: "espresso.jpg",
        price: 5.99,
        active: 1,
      });
      alert('Product added successfully!');
    } catch (error) {
      console.error(error);
      alert('Error adding product');
    }
  };

  const handleCalculateTax = async () => {
    try {
      const response = await axios.post('http://localhost:5001/calculate-tax', {
        state: "VA", // Replace with real input later
        subtotal: 100,
      });
      setTax(`$${response.data.tax.toFixed(2)}`);
    } catch (error) {
      console.error(error);
      alert('Error calculating tax');
    }
  };
  

  return (
<Container maxWidth="lg" sx={{ mt: 5, px: 2, minHeight: '100vh' }}>
<Typography
    variant="h2"
    align="center"
    sx={{
      fontWeight: 'bold',
      color: '#673ab7',
      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.3)',
      mb: 4,
    }}
  >
     Brewery Application 
  </Typography>




      {/* Update Product Description Section */}
      <Card sx={{ p: 4, borderRadius: 4 }}>
      <CardContent>
          <Typography variant="h5" gutterBottom>Update Product Description</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Product ID"
                variant="outlined"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="New Description"
                variant="outlined"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleUpdateProduct}>
            Update
          </Button>
        </CardContent>
      </Card>

      <Divider sx={{ mb: 4 }} />

      {/* Add New Product Section */}
      <Card sx={{ p: 4, borderRadius: 4 }}>
      <CardContent>
          <Typography variant="h5" gutterBottom>Add New Product</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Product Name" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Description" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Image Filename" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField fullWidth label="Price" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField fullWidth label="Active" variant="outlined" />
            </Grid>
          </Grid>
          <Button variant="contained" color="success" fullWidth sx={{ mt: 2 }} onClick={handleAddProduct}>
            Add Product
          </Button>
        </CardContent>
      </Card>

      <Divider sx={{ mb: 4 }} />

      {/* Calculate Tax Section */}
      <Card sx={{ p: 4, borderRadius: 4 }}>
      <CardContent>
          <Typography variant="h5" gutterBottom>Calculate Tax</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="State" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Subtotal" variant="outlined" />
            </Grid>
          </Grid>
          <Button variant="contained" color="secondary" fullWidth sx={{ mt: 2 }} onClick={handleCalculateTax}>
            Calculate
          </Button>
          <Typography variant="h6" align="center" sx={{ mt: 2 }}>
            Tax: {tax}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default BB_BreweryApp;

=======
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
>>>>>>> 1decdc42ea6f2bd5f2299a9c11198079368105a6
