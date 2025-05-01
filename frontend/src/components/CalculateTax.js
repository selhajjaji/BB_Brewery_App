import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, TextField, Button } from '@mui/material';
import axios from 'axios';

function CalculateTax() {
  const [state, setState] = useState('');
  const [subtotal, setSubtotal] = useState('');
  const [tax, setTax] = useState('N/A');

  const handleCalculate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/calculate-tax', {
        state,
        subtotal: Number(subtotal),
      });
      setTax(`$${response.data.tax.toFixed(2)}`);
    } catch (err) {
      console.error(err);
      alert("Failed to calculate tax");
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>Calculate Tax</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="State (e.g. VA)" value={state} onChange={(e) => setState(e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Subtotal" value={subtotal} onChange={(e) => setSubtotal(e.target.value)} />
          </Grid>
        </Grid>
        <Button variant="contained" color="secondary" fullWidth sx={{ mt: 2 }} onClick={handleCalculate}>
          Calculate
        </Button>
        <Typography variant="h6" align="center" sx={{ mt: 2 }}>
          Tax: {tax}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CalculateTax;
