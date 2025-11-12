import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { initializeApp } from "firebase/app";

import App from "./App";

import AdminDashboard from "./components/admin/AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";
import DoctorHome from "./components/doctor/DoctorHome"; // ✅ صفحة الدكتور
import DoctorRegister from "./components/login&register/DoctorRegister";
import OpticalStoreRegister from "./components/login&register/OpticalStoreRegister";
import PatientRegister from "./components/login&register/PatientRegister";

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
        <Route path="/" element={<App />} />

        {/* صفحات التسجيل */}
        <Route path="/register/doctor" element={<DoctorRegister />} />
        <Route path="/register/store" element={<OpticalStoreRegister />} />
        <Route path="/register/patient" element={<PatientRegister />} />

        {/* لوحات التحكم */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* صفحة الدكتور بدون API */}
        <Route
          path="/doctor-home"
          element={
            <ProtectedRoute allowedRoles={["doctor", "admin"]}>
              <DoctorHome />
            </ProtectedRoute>
          }
        />

        {/* باقي الـ dashboards */}
        <Route
          path="/doctor-dashboard"
          element={
            <ProtectedRoute allowedRoles={["doctor", "admin"]}>
              <h1>Doctor Dashboard</h1>
            </ProtectedRoute>
          }
        />

        <Route
          path="/store-dashboard"
          element={
            <ProtectedRoute allowedRoles={["store", "admin"]}>
              <h1>Optical Store Dashboard</h1>
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient-dashboard"
          element={
            <ProtectedRoute allowedRoles={["patient", "admin"]}>
              <h1>Patient Dashboard</h1>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  </StrictMode>
);
