import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, TextField, Button } from '@mui/material';
import axios from 'axios';

function AddProduct() {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [active, setActive] = useState('');

  const handleAdd = async () => {
    try {
      const response = await axios.post('http://localhost:5000/add-product', {
        product_name: productName,
        description,
        image,
        price: Number(price),
        active: Number(active),
      });
      alert(response.data.message);
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>Add New Product</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Image Filename" value={image} onChange={(e) => setImage(e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label="Active (1 or 0)" value={active} onChange={(e) => setActive(e.target.value)} />
          </Grid>
        </Grid>
        <Button variant="contained" color="success" fullWidth sx={{ mt: 2 }} onClick={handleAdd}>
          Add Product
        </Button>
      </CardContent>
    </Card>
  );
}

export default AddProduct;
