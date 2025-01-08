import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('token'); // Check if the user is logged in

  if (!token) {
    console.log('No token found, redirecting to login'); // Debugging
    return <Navigate to="/login" replace />; // Redirect to login if no token
  }

  console.log('Token found, allowing access'); // Debugging
  return <Outlet />; // Render the protected route
};

export default ProtectedRoute;