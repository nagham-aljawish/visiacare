import React, { useState } from "react";
import { User, Lock, Bell, Globe, Shield } from "lucide-react";
import DoctorNavbar from "../sharedFile/DoctorNavbar";

const DoctorSettings: React.FC = () => {
  const [selected, setSelected] = useState("account");

  const menuItems = [
    { id: "account", label: "Account Settings", icon: <User size={18} /> },
    { id: "security", label: "Security", icon: <Lock size={18} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
    { id: "language", label: "Language", icon: <Globe size={18} /> },
    { id: "privacy", label: "Privacy", icon: <Shield size={18} /> },
  ];

  return (
    <>
      <DoctorNavbar />

      <div className="pt-28 px-10 pb-10 bg-[#f7f9fc] min-h-screen">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#1A2E44]">
            <span className="bg-gradient-to-r from-[#1A2E44] to-[#274866] bg-clip-text text-transparent">
              Settings
            </span>
          </h1>
          <p className="text-[#1A2E44]/60 mt-1">
            Manage your account and system preferences
          </p>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="col-span-3 bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
            <h2 className="text-lg font-semibold text-[#1A2E44] mb-4">Menu</h2>

            <div className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-2xl text-left font-medium
                    transition-all duration-200
                    ${
                      selected === item.id
                        ? "bg-[#1A2E44] text-white shadow-md scale-[1.02]"
                        : "text-[#1A2E44]/80 hover:bg-[#1A2E44]/10 hover:text-[#1A2E44]"
                    }
                  `}
                  onClick={() => setSelected(item.id)}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="col-span-9 bg-white p-10 rounded-3xl shadow-lg border border-gray-100 transition-all">
            {/* Account */}
            {selected === "account" && (
              <>
                <h2 className="text-3xl font-semibold text-[#1A2E44] mb-2">
                  Account Settings
                </h2>
                <p className="text-[#1A2E44]/60 mb-6">
                  Update your personal information
                </p>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="font-semibold text-[#1A2E44]">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full mt-2 p-3 border rounded-2xl bg-gray-50 focus:ring-2 focus:ring-[#1A2E44] outline-none"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#1A2E44]">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full mt-2 p-3 border rounded-2xl bg-gray-50 focus:ring-2 focus:ring-[#1A2E44] outline-none"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <button className="mt-8 px-8 py-3 bg-[#1A2E44] text-white rounded-2xl shadow hover:bg-[#163044] transition">
                  Save Changes
                </button>
              </>
            )}

            {/* Security */}
            {selected === "security" && (
              <>
                <h2 className="text-3xl font-semibold text-[#1A2E44] mb-2">
                  Security
                </h2>
                <p className="text-[#1A2E44]/60 mb-6">
                  Change your password or security preferences
                </p>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="font-semibold text-[#1A2E44]">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="w-full mt-2 p-3 border rounded-2xl bg-gray-50 focus:ring-2 focus:ring-[#1A2E44] outline-none"
                      placeholder="********"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#1A2E44]">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="w-full mt-2 p-3 border rounded-2xl bg-gray-50 focus:ring-2 focus:ring-[#1A2E44] outline-none"
                      placeholder="********"
                    />
                  </div>
                </div>

                <button className="mt-8 px-8 py-3 bg-[#1A2E44] text-white rounded-2xl shadow hover:bg-[#163044] transition">
                  Update Password
                </button>
              </>
            )}

            {/* Notifications */}
            {selected === "notifications" && (
              <>
                <h2 className="text-3xl font-semibold text-[#1A2E44] mb-2">
                  Notifications
                </h2>
                <p className="text-[#1A2E44]/60 mb-6">
                  Choose what you want to be notified about
                </p>

                <div className="flex flex-col gap-4">
                  {[
                    "Appointment reminders",
                    "New patient messages",
                    "System alerts",
                  ].map((label) => (
                    <label className="flex items-center gap-4" key={label}>
                      <input type="checkbox" className="w-5 h-5" />
                      <span className="text-[#1A2E44] font-medium">
                        {label}
                      </span>
                    </label>
                  ))}
                </div>

                <button className="mt-8 px-8 py-3 bg-[#1A2E44] text-white rounded-2xl shadow hover:bg-[#163044] transition">
                  Save Preferences
                </button>
              </>
            )}

            {/* Language */}
            {selected === "language" && (
              <>
                <h2 className="text-3xl font-semibold text-[#1A2E44] mb-4">
                  Language
                </h2>

                <select className="w-72 p-3 border rounded-2xl bg-gray-50 focus:ring-2 focus:ring-[#1A2E44] outline-none">
                  <option>English</option>
                  <option>Arabic</option>
                </select>
              </>
            )}

            {/* Privacy */}
            {selected === "privacy" && (
              <>
                <h2 className="text-3xl font-semibold text-[#1A2E44] mb-2">
                  Privacy Settings
                </h2>
                <p className="text-[#1A2E44]/60 mb-4">
                  Manage what data is visible and stored
                </p>

                <button className="px-8 py-3 bg-red-600 text-white rounded-2xl shadow hover:bg-red-700 transition">
                  Delete Account
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorSettings;
