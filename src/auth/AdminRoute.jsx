import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAdminHook from "../utils/adminAuthHook";
import { routerConstant } from "../utils/constants";

const AdminRoute = () => {
  const isAuthenticated =  useAdminHook();
  return isAuthenticated?.type == "admin" ? (
    <Outlet />
  ) : (
    <Navigate to={routerConstant.dashboard} />
  );
};

export default React.memo(AdminRoute);
