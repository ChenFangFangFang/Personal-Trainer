import React from 'react';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import App from './App';
import Home from './components/Home'
import Customer from './components/Customer';
import Training from './components/Training';
import Calendar from './components/Calendar';
import Statistics from './components/Statistics';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    training: {
      main: '#c68f40',
    }
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" />
      },
      {
        path: "customer",
        element: <Customer />
      },
      {
        path: "home",
        element: <Home />
      },
      {
        path: "training",
        element: <Training />
      }, {
        path: "calendar",
        element: <Calendar />
      }, {
        path: "statistics",
        element: <Statistics />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} /></ThemeProvider>
  </StrictMode>
);
