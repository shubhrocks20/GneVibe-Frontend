// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import useAuthStore from "@/store/useAuthStore";
const ProtectedRoute = ({ children }) => {
  const token = useAuthStore((state) => state.token);

  // If token exists, redirect to the home page
  if (token) {
    return <Navigate to="/" />;
  }

  // If no token, allow access to the route
  return children;
};

export default ProtectedRoute;
