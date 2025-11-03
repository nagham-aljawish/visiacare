import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// ✅ React Router
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// ✅ Firebase
import { initializeApp } from "firebase/app";

// ✅ صفحات المشروع
import App from "./App"; // صفحة تسجيل الدخول العامة (Login)

import AdminDashboard from "./AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";
import DoctorRegister from "./components/register/DoctorRegister";
import OpticalStoreRegister from "./components/register/OpticalStoreRegister";
import PatientRegister from "./components/register/PatientRegister";
// ✅ إعدادات Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBWUngYt84AdgAXiIoFrItYHgMowHczYWg",
  authDomain: "visacare-112b6.firebaseapp.com",
  projectId: "visacare-112b6",
  storageBucket: "visacare-112b6.firebasestorage.app",
  messagingSenderId: "980175293543",
  appId: "1:980175293543:web:c59c565fc4611b79bfd8c2",
  measurementId: "G-GDJBKG68FX",
};

initializeApp(firebaseConfig);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* 
         صفحة تسجيل الدخول الرئيسية */}
        <Route path="/" element={<App />} />

        {/*  صفحة إنشاء الحساب */}
        <Route path="/register" element={<DoctorRegister />} />
        <Route path="/register" element={<OpticalStoreRegister />} />
        <Route path="/register" element={<PatientRegister />} />

        {/*  لوحة تحكم الأدمن (محمية) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/*  لوحة تحكم الطبيب (محمية) */}
        <Route
          path="/doctor-dashboard"
          element={
            <ProtectedRoute allowedRoles={["doctor", "admin"]}>
              <h1>Doctor Dashboard</h1>
            </ProtectedRoute>
          }
        />

        {/* لوحة تحكم المتجر البصري (محمية) */}
        <Route
          path="/store-dashboard"
          element={
            <ProtectedRoute allowedRoles={["store", "admin"]}>
              <h1>Optical Store Dashboard</h1>
            </ProtectedRoute>
          }
        />

        {/*  لوحة تحكم المريض (محمية) */}
        <Route
          path="/patient-dashboard"
          element={
            <ProtectedRoute allowedRoles={["patient", "admin"]}>
              <h1>Patient Dashboard</h1>
            </ProtectedRoute>
          }
        />

        {/*  أي مسار غير معروف */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  </StrictMode>
);
