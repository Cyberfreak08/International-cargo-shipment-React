// src/auth/ProtectedRoute.jsx
import React from 'react';
import { Navigate,Outlet } from "react-router-dom";
import useProtectedRoute from '../utils/authHook';
import { routerConstant } from '../utils/constants';

const ProtectedRoute = () => {
  const isAuthenticated = useProtectedRoute();
  return isAuthenticated ? <Outlet /> : <Navigate to={routerConstant.login} />;
};

export default React.memo(ProtectedRoute);
