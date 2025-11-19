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
import DoctorHome from "./components/doctor/DoctorHome";
import DoctorRegister from "./components/login&register/DoctorRegister";
import OpticalStoreRegister from "./components/login&register/OpticalStoreRegister";
import PatientRegister from "./components/login&register/PatientRegister";
import PatientHome from "./components/doctor/PatientHome";

// Appointments Page
import Appointments from "./components/doctor/Appointments";

// ⬅️ Doctor Profile Page (أضفها)
import DoctorProfile from "./components/doctor/DoctorProfile";

// Firebase config
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
        {/* Landing / Home */}
        <Route path="/home" element={<App />} />

        {/* Register Pages */}
        <Route path="/register/doctor" element={<DoctorRegister />} />
        <Route path="/register/store" element={<OpticalStoreRegister />} />
        <Route path="/register/patient" element={<PatientRegister />} />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Doctor Home */}
        <Route
          path="/doctor-home"
          element={
            <ProtectedRoute allowedRoles={["doctor", "admin"]}>
              <DoctorHome />
            </ProtectedRoute>
          }
        />

        {/* Redirect (deprecated) */}
        <Route
          path="/doctor-dashboard"
          element={<Navigate to="/doctor-home" replace />}
        />

        {/* Store Dashboard */}
        <Route
          path="/store-dashboard"
          element={
            <ProtectedRoute allowedRoles={["store", "admin"]}>
              <h1>Optical Store Dashboard</h1>
            </ProtectedRoute>
          }
        />

        {/* Patient Dashboard */}
        <Route
          path="/patient-dashboard"
          element={
            <ProtectedRoute allowedRoles={["patient", "admin"]}>
              <h1>Patient Dashboard</h1>
            </ProtectedRoute>
          }
        />

        {/* Patients Page */}
        <Route
          path="/patients"
          element={
            <ProtectedRoute allowedRoles={["doctor", "admin"]}>
              <PatientHome />
            </ProtectedRoute>
          }
        />

        {/* Appointments Page */}
        <Route
          path="/appointments"
          element={
            <ProtectedRoute allowedRoles={["doctor", "admin"]}>
              <Appointments />
            </ProtectedRoute>
          }
        />

        {/* ⭐ Doctor Profile Page (المسار الجديد) */}
        <Route
          path="/doctor-profile"
          element={
            <ProtectedRoute allowedRoles={["doctor", "admin"]}>
              <DoctorProfile />
            </ProtectedRoute>
          }
        />

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  </StrictMode>
);
