import React, { useState } from 'react';
import {
  Card, CardContent, Typography, TextField, Button, Grid, List, ListItem, ListItemText
} from '@mui/material';
import axios from 'axios';

function ShopperSpendingReport() {
  const [shopperId, setShopperId] = useState('');
  const [result, setResult] = useState(null);
  const [list, setList] = useState([]);

  const handleFetch = async () => {
    if (shopperId.trim() === '') {
      try {
        const response = await axios.post('http://localhost:5000/get-total-spending', {});
        setResult(null);
        setList(response.data.shoppers);
      } catch (err) {
        alert('Error fetching shopper list');
      }
    } else {
      try {
        const response = await axios.post('http://localhost:5000/get-total-spending', {
          shopper_id: Number(shopperId)
        });
        setList([]);
        setResult(response.data.total);
      } catch (err) {
        alert('Invalid shopper ID');
        setResult(null);
        setList([]);
      }
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>Shopper Spending Report</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Shopper ID (Leave empty to list all)"
              value={shopperId}
              onChange={(e) => setShopperId(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleFetch}
        >
          Get Report
        </Button>

        {result !== null && (
          <Typography sx={{ mt: 3 }} align="center">
            Total Spending: ${result.toFixed(2)}
          </Typography>
        )}

        {list.length > 0 && (
          <List sx={{ mt: 3 }}>
            {list.map((shopper, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`Shopper #${shopper[0]} - ${shopper[1]}`}
                  secondary={`Total Spending: $${shopper[2].toFixed(2)}`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
}

export default ShopperSpendingReport;
