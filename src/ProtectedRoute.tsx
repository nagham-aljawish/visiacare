import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  //  إذا ما في token → رجّع المستخدم لتسجيل الدخول
  if (!token) {
    return <Navigate to="/" replace />;
  }

  //  تحقق إذا كان الدور من ضمن الأدوار المسموح بها
  if (!role || !allowedRoles.includes(role)) {
    // مثلاً إذا طبيب حاول يدخل صفحة الأدمن
    return <Navigate to="/" replace />;
  }

  //  إذا كل شيء تمام → عرض الصفحة المحمية
  return children;
};

export default ProtectedRoute;
