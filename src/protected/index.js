import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../libs/authContext";
import { AppProvider } from "../libs/appContext";

const Protected = () => {
  const { user } = useAuth();

  return user ? (
    <AppProvider>
      <Outlet />
    </AppProvider>
  ) : (
    <Navigate to="/login" />
  );
};

export default Protected;