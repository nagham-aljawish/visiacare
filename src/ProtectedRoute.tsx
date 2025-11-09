import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // إذا لم يكن المستخدم مسجّل دخول
  if (!token) {
    console.warn("User not authenticated. Redirecting to login.");
    return <Navigate to="/" replace />;
  }

  // إذا كان الدور غير مسموح (غير حساس لحالة الأحرف)
  const normalizedRole = role?.toLowerCase();
  const normalizedAllowedRoles = allowedRoles.map((r) => r.toLowerCase());

  if (!normalizedRole || !normalizedAllowedRoles.includes(normalizedRole)) {
    console.warn(`User role "${role}" not allowed. Redirecting to login.`);
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
