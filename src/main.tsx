import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Pages
import App from "./App";

// Admin
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
import PatientHome from "./components/doctor/PatientHome";
import PrescriptionCreate from "./components/doctor/PrescriptionCreate";
// Patient Pages
import PatientRegister from "./components/login&register/PatientRegister";
import Home from "./components/patient/Home";
import DoctorsList from "./components/patient/DoctorsList";
import DoctorDetails from "./components/patient/DoctorDetails";
import BookAppointment from "./components/patient/BookAppointment";
import PatientAppointments from "./components/patient/PatientAppointments";

// Optical Store Pages
import OpticalStoreRegister from "./components/login&register/OpticalStoreRegister";

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

        {/* Admin Routes */}
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
          path="/patients-home"
          element={
            <ProtectedRoute allowedRoles={["doctor", "admin"]}>
              <PatientHome />
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
        <Route
          path="/medical-record/:recordId/prescription"
          element={
            <ProtectedRoute allowedRoles={["doctor", "admin"]}>
              <PrescriptionCreate />
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
        <Route
          path="/patient-doctors"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
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
            <ProtectedRoute allowedRoles={["patient"]}>
              <PatientAppointments />
            </ProtectedRoute>
          }
        />

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  </StrictMode>
);
