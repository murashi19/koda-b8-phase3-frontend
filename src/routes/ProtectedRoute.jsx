import { Navigate } from "react-router-dom";

/**
 * Wraps a page that requires the user to be logged in.
 * Redirects to /login when there's no auth token in localStorage.
 */
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("auth");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
