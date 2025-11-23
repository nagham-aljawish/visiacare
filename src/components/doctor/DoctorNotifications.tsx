import React, { useState } from "react";
import { Calendar, Bell } from "lucide-react";
import DoctorNavbar from "../sharedFile/DoctorNavbar";

const DoctorNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message:
        "A new appointment has been booked for patient Sarah Jones at 10:30 am.",
      time: "2 hours ago",
    },
    {
      id: 2,
      message:
        "A new appointment has been booked for patient Micheal Carter at 11:30 am.",
      time: "3 hours ago",
    },
    {
      id: 3,
      message:
        "A new appointment has been booked for patient Dana Carter at 11:30 am.",
      time: "5 hours ago",
    },
  ]);

  const clearAll = () => setNotifications([]);

  return (
    <div className="min-h-screen bg-[#E9F2FA]">
      <DoctorNavbar />

      <div className="px-6 lg:px-20 pt-28 pb-10">
        {/* Main Card */}
        <div className="bg-white p-10 rounded-3xl shadow-lg border border-[#1A2E4415]">
          {/* Title */}
          <div className="flex flex-col items-center mb-8">
            <Bell size={40} className="text-[#1A2E44]" />
            <h1 className="text-3xl font-semibold text-[#1A2E44] mt-3">
              Notifications
            </h1>
          </div>

          {/* Notification List */}
          <div className="space-y-5">
            {notifications.length === 0 ? (
              <p className="text-center text-[#1A2E44] opacity-70 text-lg">
                No notifications available.
              </p>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className="flex justify-between items-center bg-[#F9FBFD] px-6 py-5 rounded-2xl shadow-md border border-[#1A2E4415]"
                >
                  <div className="flex items-center gap-4">
                    <Calendar size={24} className="text-[#1A2E44]" />
                    <p className="text-[#1A2E44] text-[16px]">{n.message}</p>
                  </div>

                  <span className="text-gray-500 text-sm whitespace-nowrap">
                    {n.time}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Clear All Button */}
          {notifications.length > 0 && (
            <div className="flex justify-end mt-8">
              <button
                onClick={clearAll}
                className="bg-[#1A2E44] text-white px-8 py-3 rounded-full text-lg hover:bg-[#143047] transition"
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorNotifications;
