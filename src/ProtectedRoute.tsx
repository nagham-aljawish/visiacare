import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("my_role");

  if (!token) {
    console.warn("User not authenticated. Redirecting to login.");
    return <Navigate to="/" replace />;
  }
  const normalizedRole = role?.toLowerCase();
  const normalizedAllowedRoles = allowedRoles.map((r) => r.toLowerCase());

  if (!normalizedRole || !normalizedAllowedRoles.includes(normalizedRole)) {
    console.warn(`User role "${role}" not allowed. Redirecting to login.`);
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
