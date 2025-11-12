import React from "react";
import { Bell, MessageSquare } from "lucide-react";
import EyeLogo from "/src/assets/eye-svgrepo-com.svg";

const DoctorNavbar: React.FC = () => {
  return (
    <nav className="w-full flex justify-between items-center px-8 py-4 bg-[#1A2E44] shadow-md fixed top-0 z-50">
      <div className="flex items-center gap-2">
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
        <button className="text-[#1A2E44] font-semibold border-b-2 border-[#1A2E44] pb-1 transition">
          Home
        </button>
        <button className="text-[#1A2E44]/80 font-medium hover:text-[#1A2E44] transition">
          Patient
        </button>
        <button className="text-[#1A2E44]/80 font-medium hover:text-[#1A2E44] transition">
          Appointments
        </button>
        <button className="text-[#1A2E44]/80 font-medium hover:text-[#1A2E44] transition">
          Profile
        </button>
      </div>

      <div className="flex items-center gap-5">
        <button className="relative">
          <Bell className="text-white" size={22} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
            3
          </span>
        </button>

        <button>
          <MessageSquare className="text-white" size={22} />
        </button>

        <img
          src="/images/DoctorIMG.jpg"
          alt="Doctor Avatar"
          className="w-10 h-10 rounded-full border-2 border-white object-cover"
        />
      </div>
    </nav>
  );
};

export default DoctorNavbar;
