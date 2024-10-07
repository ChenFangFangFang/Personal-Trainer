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
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,  // App 组件在这里被渲染
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
    <RouterProvider router={router} />
  </StrictMode>
);
