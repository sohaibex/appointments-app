import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute = ({ roles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/portal/login" replace />;
  }

  if (roles && !roles.includes(user.type)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
