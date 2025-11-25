import React from "react";
import { Bell, Settings } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import EyeLogo from "/src/assets/eye-svgrepo-com.svg";

const PatientNavbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="w-full flex justify-between items-center px-8 py-4 bg-[#1A2E44] shadow-md fixed top-0 z-50">
      {/* Logo */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/patient-home")}
      >
        <img
          src={EyeLogo}
          alt="VisiaCare Logo"
          className="w-8 h-8"
          style={{
            filter:
              "invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(104%) contrast(101%)",
          }}
        />
        <h1 className="text-2xl font-semibold text-white">VisiaCare</h1>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center bg-white px-8 py-2 rounded-full shadow-sm gap-8">
        <button
          onClick={() => navigate("/patient-home")}
          className={`pb-1 font-semibold transition ${
            isActive("/patient-home")
              ? "text-[#1A2E44] border-b-2 border-[#1A2E44]"
              : "text-[#1A2E44]/80 hover:text-[#1A2E44]"
          }`}
        >
          Home
        </button>

        <button
          onClick={() => navigate("/patient-doctors")}
          className={`pb-1 font-semibold transition ${
            isActive("/patient-doctors")
              ? "text-[#1A2E44] border-b-2 border-[#1A2E44]"
              : "text-[#1A2E44]/80 hover:text-[#1A2E44]"
          }`}
        >
          Doctors
        </button>

        <button
          onClick={() => navigate("/patient-appointments")}
          className={`pb-1 font-semibold transition ${
            isActive("/patient-appointments")
              ? "text-[#1A2E44] border-b-2 border-[#1A2E44]"
              : "text-[#1A2E44]/80 hover:text-[#1A2E44]"
          }`}
        >
          Appointments
        </button>

        <button
          onClick={() => navigate("/patient-prescriptions")}
          className={`pb-1 font-semibold transition ${
            isActive("/patient-prescriptions")
              ? "text-[#1A2E44] border-b-2 border-[#1A2E44]"
              : "text-[#1A2E44]/80 hover:text-[#1A2E44]"
          }`}
        >
          Prescriptions
        </button>

        <button
          onClick={() => navigate("/patient-optical-shops")}
          className={`pb-1 font-semibold transition ${
            isActive("/patient-optical-shops")
              ? "text-[#1A2E44] border-b-2 border-[#1A2E44]"
              : "text-[#1A2E44]/80 hover:text-[#1A2E44]"
          }`}
        >
          Optical Shops
        </button>

        <button
          onClick={() => navigate("/patient-profile")}
          className={`pb-1 font-semibold transition ${
            isActive("/patient-profile")
              ? "text-[#1A2E44] border-b-2 border-[#1A2E44]"
              : "text-[#1A2E44]/80 hover:text-[#1A2E44]"
          }`}
        >
          Profile
        </button>
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-5">
        <button
          className="relative"
          onClick={() => navigate("/patient-notifications")}
        >
          <Bell className="text-white" size={22} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
            3
          </span>
        </button>

        <button onClick={() => navigate("/patient-settings")}>
          <Settings className="text-white" size={22} />
        </button>

        <div className="relative">
          <img
            src="/images/patientPhoto.jpg"
            alt="Patient Avatar"
            className="w-10 h-10 rounded-full border-2 border-white object-cover"
          />
          <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-[2px] border-white shadow-sm"></span>
        </div>
      </div>
    </nav>
  );
};

export default PatientNavbar;
