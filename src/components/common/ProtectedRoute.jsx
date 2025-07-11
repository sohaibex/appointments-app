import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute = ({ roles }) => {
  const { user } = useAuth();

  if (!user) {
    // Redirect clients to client login, others to portal login
    if (roles && roles.includes('client')) {
      return <Navigate to="/client" replace />;
    }
    return <Navigate to="/portal/login" replace />;
  }

  if (roles && !roles.includes(user.type)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
