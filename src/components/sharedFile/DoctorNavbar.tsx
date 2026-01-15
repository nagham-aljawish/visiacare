import React from "react";
import { Bell, Settings } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import EyeLogo from "/src/assets/eye-svgrepo-com.svg";

const DoctorNavbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="w-full flex justify-between items-center px-8 py-4 bg-[#1A2E44] shadow-md fixed top-0 z-50">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/doctor-home")}
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

      <div className="flex items-center justify-center bg-white px-8 py-2 rounded-full shadow-sm gap-8">
        <button
          onClick={() => navigate("/doctor-home")}
          className={`pb-1 font-semibold transition ${
            isActive("/doctor-home")
              ? "text-[#1A2E44] border-b-2 border-[#1A2E44]"
              : "text-[#1A2E44]/80 hover:text-[#1A2E44]"
          }`}
        >
          Home
        </button>

        <button
          onClick={() => navigate("/patients-home")}
          className={`pb-1 font-semibold transition ${
            isActive("/patients-home")
              ? "text-[#1A2E44] border-b-2 border-[#1A2E44]"
              : "text-[#1A2E44]/80 hover:text-[#1A2E44]"
          }`}
        >
          Patient
        </button>

        <button
          onClick={() => navigate("/appointments")}
          className={`pb-1 font-semibold transition ${
            isActive("/appointments")
              ? "text-[#1A2E44] border-b-2 border-[#1A2E44]"
              : "text-[#1A2E44]/80 hover:text-[#1A2E44]"
          }`}
        >
          Appointments
        </button>
      </div>

      <div className="flex items-center gap-5">
        <button
          className="relative"
          onClick={() => navigate("/doctor-notifications")}
        >
          <Bell className="text-white" size={22} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
            3
          </span>
        </button>

        <button onClick={() => navigate("/doctor-settings")}>
          <Settings className="text-white" size={22} />
        </button>

        <div className="relative">
          <img
            src="/images/DoctorIMG.jpg"
            alt="Doctor Avatar"
            className="w-10 h-10 rounded-full border-2 border-white object-cover"
          />

          <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-[2px] border-white shadow-sm"></span>
        </div>
      </div>
    </nav>
  );
};

export default DoctorNavbar;
