import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, TextField, Button } from '@mui/material';
import axios from 'axios';

function CheckSaleStatus() {
  const [productId, setProductId] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('N/A');

  const handleCheck = async () => {
    try {
      const res = await axios.post("http://localhost:5000/check-sale-status", {
        date,
        product_id: Number(productId)
      });
      setStatus(res.data.status);
    } catch (err) {
      console.error(err);
      alert("Failed to check sale status");
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>Check Product Sale Status</Typography>
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
              label="Date (e.g. 10-JUN-12)"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button variant="contained" color="info" fullWidth sx={{ mt: 2 }} onClick={handleCheck}>
          Check Status
        </Button>
        <Typography variant="h6" align="center" sx={{ mt: 2 }}>
          Result: {status}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CheckSaleStatus;
