import useAuthStore from "@/store/useAuthStore";
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = useAuthStore((state) => state.token);
  if (!token) {
    return <Navigate to="/register" />;
  }
  return children;
};

export default PrivateRoute;
