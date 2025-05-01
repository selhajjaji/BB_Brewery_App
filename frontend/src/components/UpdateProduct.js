import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, TextField, Button } from '@mui/material';
import axios from 'axios';

function UpdateProduct() {
  const [productId, setProductId] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const handleUpdate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/update-product', {
        product_id: Number(productId),
        new_description: newDescription,
      });
      alert(response.data.message);
    } catch (err) {
      console.error(err);
      alert("Failed to update product");
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>Update Product Description</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Product ID"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="New Description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleUpdate}
        >
          Update
        </Button>
      </CardContent>
    </Card>
  );
}

export default UpdateProduct;
