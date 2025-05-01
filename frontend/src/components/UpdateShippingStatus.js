import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, TextField, Button } from '@mui/material';
import axios from 'axios';

function UpdateShippingStatus() {
  const [basketId, setBasketId] = useState('');
  const [dateShipped, setDateShipped] = useState('');
  const [shipper, setShipper] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:5000/update-shipping-status', {
        basket_id: Number(basketId),
        date_shipped: dateShipped,
        shipper,
        tracking_number: trackingNumber
      });
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert('Failed to update shipping status');
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>Update Shipping Status</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Basket ID" value={basketId} onChange={(e) => setBasketId(e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Date Shipped (e.g. 20-FEB-12)" value={dateShipped} onChange={(e) => setDateShipped(e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Shipper" value={shipper} onChange={(e) => setShipper(e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Tracking Number" value={trackingNumber} onChange={(e) => setTrackingNumber(e.target.value)} />
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>
          Submit
        </Button>
      </CardContent>
    </Card>
  );
}

export default UpdateShippingStatus;