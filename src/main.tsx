import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "./index.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import AdminDashboard from "./components/admin/AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";
import DoctorHome from "./components/doctor/DoctorHome";
import DoctorRegister from "./components/login&register/DoctorRegister";
import DoctorDashboard from "./components/doctor/DoctorDashboard";
import Appointments from "./components/doctor/Appointments";
import PatientRegister from "./components/login&register/PatientRegister";
import Home from "./components/patient/Home";
import DoctorsList from "./components/patient/DoctorsList";
import DoctorDetails from "./components/patient/DoctorDetails";
import BookAppointment from "./components/patient/BookAppointment";
import PatientAppointments from "./components/patient/PatientAppointments";
import OpticalList from "./components/patient/OpticalList"
import PatientPrescriptions from "./components/patient/PatientPrescriptions";
import OpticalStoreProducts from "./components/patient/OpticalStoreProducts";
import PatientNotifications from "./components/patient/PatientNotifications";
import OpticalStoreRegister from "./components/login&register/OpticalStoreRegister";
import StoreOrders from "./components/optical/StoreOrders";
import StoreInventory from "./components/optical/StoreInventory";
import OpticalShops from "./components/patient/OpticalShops";
import AcceptedOrders from "./components/optical/Acceptedorder";
import PatientOrders from "./components/patient/PatientOrders";
import OpticalNotifications from "./components/optical/OpticalNotifications";
import OpticalProfile from "./components/optical/Profile";
import PatientProfile from "./components/patient/PatientProfile";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
        closeOnClick
        draggable
      />
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register/doctor" element={<DoctorRegister />} />
        <Route path="/register/store" element={<OpticalStoreRegister />} />
        <Route path="/register/patient" element={<PatientRegister />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
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
          path="/appointments"
          element={
            <ProtectedRoute allowedRoles={["doctor", "admin"]}>
              <Appointments />
            </ProtectedRoute>
          }
        />
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
        <Route
          path="/patient-optical-shops"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <OpticalList />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/patient-prescriptions"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <PatientPrescriptions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient-notifications"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <PatientNotifications />
            </ProtectedRoute>
          }
        />

        <Route path="/store-orders" element={<StoreOrders />} />
        <Route
          path="/accepted-orders"
          element={<AcceptedOrders />}
        />
        <Route path="/store-inventory" element={<StoreInventory />} />

        <Route
          path="/patient-prescriptions"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <PatientPrescriptions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient-optical-shops"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <OpticalShops />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient-orders"
          element={
              <PatientOrders/>
          }
        />

        <Route
          path="/optical-store/:id/products"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <OpticalStoreProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/opticl-notifications"
          element={
            <OpticalNotifications />
          }
        />

        <Route
          path="/optical-profile"
          element={
            <OpticalProfile />
          }
        />

        <Route
          path="/patient-profile"
          element={
            <PatientProfile />
          }
        />
      </Routes>
    </Router>
  </StrictMode>
);
