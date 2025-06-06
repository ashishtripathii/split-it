import { Navigate } from 'react-router-dom';
import React from 'react';
function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

export default PrivateRoute;   

