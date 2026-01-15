import React, { useState } from "react";
import { Bell, Menu, X, LogOut, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import EyeLogo from "/src/assets/eye-svgrepo-com.svg";

const PatientNavbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await fetch("http://127.0.0.1:8000/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("user_id");
      navigate("/");
    }
  };

  const navLinks = [
    { label: "Home", path: "/patient-home" },
    { label: "Doctors", path: "/patient-doctors" },
    { label: "Appointments", path: "/patient-appointments" },
    { label: "Prescriptions", path: "/patient-prescriptions" },
    { label: "Optical Shops", path: "/patient-optical-shops" },
    { label: "Orders", path: "/patient-orders" },
  ];

  return (
    <nav className="w-full flex justify-between items-center px-4 sm:px-8 py-4 bg-[#1A2E44] shadow-md fixed top-0 z-50">
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

      <div className="hidden md:flex items-center justify-center bg-white px-8 py-2 rounded-full shadow-sm gap-8">
        {navLinks.map((link) => (
          <button
            key={link.path}
            onClick={() => navigate(link.path)}
            className={`pb-1 font-semibold transition ${
              isActive(link.path)
                ? "text-[#1A2E44] border-b-2 border-[#1A2E44]"
                : "text-[#1A2E44]/80 hover:text-[#1A2E44]"
            }`}
          >
            {link.label}
          </button>
        ))}
      </div>

      <div className="hidden md:flex items-center gap-5">
        <button
          className="relative text-white hover:text-gray-300 transition"
          onClick={() => navigate("/patient-notifications")}
        >
          <Bell size={22} />
        </button>
        <button
          className={`relative text-white hover:text-gray-300 transition ${isActive("/patient-profile") ? "text-blue-400" : ""}`}
          onClick={() => navigate("/patient-profile")}
        >
          <User size={24} />
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold transition shadow-sm"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      <div className="md:hidden flex items-center">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <X size={28} className="text-white" />
          ) : (
            <Menu size={28} className="text-white" />
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white text-[#1A2E44] flex flex-col items-center gap-4 py-6 shadow-xl z-40 border-t border-gray-100">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => {
                navigate(link.path);
                setMenuOpen(false);
              }}
              className={`font-semibold text-lg transition ${
                isActive(link.path) ? "text-blue-600" : "hover:text-gray-600"
              }`}
            >
              {link.label}
            </button>
          ))}

          <button
            onClick={() => {
              navigate("/patient-notifications");
              setMenuOpen(false);
            }}
            className="font-semibold text-lg"
          >
            Notifications
          </button>

          <hr className="w-4/5 border-gray-200" />

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 font-bold text-lg"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default PatientNavbar;