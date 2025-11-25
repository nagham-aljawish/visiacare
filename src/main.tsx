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

// Doctor Pages
import DoctorHome from "./components/doctor/DoctorHome";
import DoctorRegister from "./components/login&register/DoctorRegister";
import DoctorDashboard from "./components/doctor/DoctorDashboard";
import DoctorProfile from "./components/doctor/DoctorProfile";
import DoctorNotifications from "./components/doctor/DoctorNotifications";
import DoctorSettings from "./components/doctor/DoctorSettings";
import Appointments from "./components/doctor/Appointments";
import MedicalRecord from "./components/doctor/MedicalRecord";

// Patient Pages
import PatientRegister from "./components/login&register/PatientRegister";
import Home from "./components/patient/Home";
import DoctorsList from "./components/patient/DoctorsList"; // ⬅️ NEW

// Optical Store Pages
import OpticalStoreRegister from "./components/login&register/OpticalStoreRegister";
import DoctorDetails from "./components/patient/DoctorDetails";
import BookAppointment from "./components/patient/BookAppointment";

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

        {/* Register */}
        <Route path="/register/doctor" element={<DoctorRegister />} />
        <Route path="/register/store" element={<OpticalStoreRegister />} />
        <Route path="/register/patient" element={<PatientRegister />} />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Doctor Routes */}
        <Route
          path="/doctor-home"
          element={
            <ProtectedRoute allowedRoles={["doctor", "admin"]}>
              <DoctorHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor-dashboard"
          element={
            <ProtectedRoute allowedRoles={["doctor", "admin"]}>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor-profile"
          element={
            <ProtectedRoute allowedRoles={["doctor", "admin"]}>
              <DoctorProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor-notifications"
          element={
            <ProtectedRoute allowedRoles={["doctor", "admin"]}>
              <DoctorNotifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor-settings"
          element={
            <ProtectedRoute allowedRoles={["doctor", "admin"]}>
              <DoctorSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointments"
          element={
            <ProtectedRoute allowedRoles={["doctor", "admin"]}>
              <Appointments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/medical-record/:patientId"
          element={
            <ProtectedRoute allowedRoles={["doctor", "admin"]}>
              <MedicalRecord />
            </ProtectedRoute>
          }
        />

        {/* Patient Routes */}
        <Route
          path="/patient-home"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* ⬅️ NEW Doctors List Page */}
        <Route
          path="/patient-doctors"
          element={
            <ProtectedRoute allowedRoles={["patient", "admin"]}>
              <DoctorsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor-details/:id"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <DoctorDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient-book-appointment/:id"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <BookAppointment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient-appointments"
          element={
            <ProtectedRoute allowedRoles={["patient", "admin"]}>
              <h1>Patient Appointments Page</h1>
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient-prescriptions"
          element={
            <ProtectedRoute allowedRoles={["patient", "admin"]}>
              <h1>Patient Prescriptions Page</h1>
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient-profile"
          element={
            <ProtectedRoute allowedRoles={["patient", "admin"]}>
              <h1>Patient Profile Page</h1>
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient-optical-shops"
          element={
            <ProtectedRoute allowedRoles={["patient", "admin"]}>
              <h1>Patient Optical Shops Page</h1>
            </ProtectedRoute>
          }
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  </StrictMode>
);
