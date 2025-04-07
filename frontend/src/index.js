<<<<<<< HEAD
import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom/client';
import BB_BreweryApp from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();
=======
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
>>>>>>> 1decdc42ea6f2bd5f2299a9c11198079368105a6

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<<<<<<< HEAD
    <ThemeProvider theme={theme}>
      <BB_BreweryApp />
    </ThemeProvider>
=======
    <App />
>>>>>>> 1decdc42ea6f2bd5f2299a9c11198079368105a6
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
