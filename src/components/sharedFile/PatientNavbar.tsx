import React, { useState } from "react";
import { Bell, Settings, Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import EyeLogo from "/src/assets/eye-svgrepo-com.svg";

const PatientNavbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { label: "Home", path: "/patient-home" },
    { label: "Doctors", path: "/patient-doctors" },
    { label: "Appointments", path: "/patient-appointments" },
    { label: "Prescriptions", path: "/patient-prescriptions" },
    { label: "Optical Shops", path: "/patient-optical-shops" },
    { label: "Profile", path: "/patient-profile" },
  ];

  return (
    <nav className="w-full flex justify-between items-center px-4 sm:px-8 py-4 bg-[#1A2E44] shadow-md fixed top-0 z-50">
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

      {/* Desktop Navigation */}
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

      {/* Right Icons (Desktop) */}
      <div className="hidden md:flex items-center gap-5">
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

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <X size={28} className="text-white" />
          ) : (
            <Menu size={28} className="text-white" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white text-[#1A2E44] w-full flex flex-col items-center gap-4 py-4 mt-4 rounded-xl shadow-lg">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => {
                navigate(link.path);
                setMenuOpen(false);
              }}
              className={`font-semibold transition ${
                isActive(link.path) ? "underline" : "hover:text-gray-600"
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
            className="relative font-semibold"
          >
            Notifications
            <span className="absolute -top-1 -right-3 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
              3
            </span>
          </button>

          <button
            onClick={() => {
              navigate("/patient-settings");
              setMenuOpen(false);
            }}
            className="font-semibold"
          >
            Settings
          </button>
        </div>
      )}
    </nav>
  );
};

export default PatientNavbar;
