import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, TextField, Button } from '@mui/material';
import axios from 'axios';

function CheckBasketStock() {
  const [basketId, setBasketId] = useState('');
  const [message, setMessage] = useState('N/A');

  const handleCheckStock = async () => {
    try {
      const response = await axios.post("http://localhost:5000/check-basket-stock", {
        basket_id: Number(basketId),
      });
      setMessage(response.data.status);
    } catch (err) {
      console.error(err);
      setMessage("Error checking basket stock");
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>Check Basket Stock Status</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Basket ID"
              value={basketId}
              onChange={(e) => setBasketId(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button variant="contained" color="warning" fullWidth sx={{ mt: 2 }} onClick={handleCheckStock}>
          Check Stock
        </Button>
        <Typography variant="h6" align="center" sx={{ mt: 2 }}>
          Result: {message}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CheckBasketStock;
