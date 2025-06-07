import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  // For localStorage users
  const user = localStorage.getItem('currentUser');
  const isLoggedInLocally = user && JSON.parse(user).email; // Check if there's a stored user

  if (isLoading) {
    return <div>Loading authentication...</div>;
  }

  // Allow access if authenticated via Auth0 or if a user is logged in locally
  if (isAuthenticated || isLoggedInLocally) {
    return children;
  }

  // Redirect to login if not authenticated
  return <Navigate to="/login" replace />;
};

export default PrivateRoute;