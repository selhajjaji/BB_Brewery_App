import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, TextField, Button } from '@mui/material';
import axios from 'axios';

function AddToBasket() {
  const [basketId, setBasketId] = useState('');
  const [productId, setProductId] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [sizeCode, setSizeCode] = useState('');
  const [formCode, setFormCode] = useState('');

  const handleAdd = async () => {
    try {
      const res = await axios.post('http://localhost:5000/add-to-basket', {
        basket_id: Number(basketId),
        product_id: Number(productId),
        price: Number(price),
        quantity: Number(quantity),
        size_code: Number(sizeCode),
        form_code: Number(formCode),
      });
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert("Failed to add item to basket");
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>Add Item to Basket</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}><TextField fullWidth label="Basket ID" value={basketId} onChange={(e) => setBasketId(e.target.value)} /></Grid>
          <Grid item xs={6}><TextField fullWidth label="Product ID" value={productId} onChange={(e) => setProductId(e.target.value)} /></Grid>
          <Grid item xs={6}><TextField fullWidth label="Price" value={price} onChange={(e) => setPrice(e.target.value)} /></Grid>
          <Grid item xs={6}><TextField fullWidth label="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} /></Grid>
          <Grid item xs={6}><TextField fullWidth label="Size Code" value={sizeCode} onChange={(e) => setSizeCode(e.target.value)} /></Grid>
          <Grid item xs={6}><TextField fullWidth label="Form Code" value={formCode} onChange={(e) => setFormCode(e.target.value)} /></Grid>
        </Grid>
        <Button variant="contained" color="success" fullWidth sx={{ mt: 2 }} onClick={handleAdd}>
          Add to Basket
        </Button>
      </CardContent>
    </Card>
  );
}

export default AddToBasket;
