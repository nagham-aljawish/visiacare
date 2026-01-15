import React, { useState, useEffect } from "react";
import { Bell, Calendar, Info } from "lucide-react";
import PatientNavbar from "../sharedFile/PatientNavbar";

const PatientNotifications: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchNotifications = async () => {
    if (!token) return;
    try {
      const res = await fetch("http://127.0.0.1:8000/api/notifications/my", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const result = await res.json();
      
      if (result.success && Array.isArray(result.data)) {
        setNotifications(result.data);
      }
    } catch (err) {
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-[#E9F2FA] pt-28 pb-10">
    <PatientNavbar />
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <Bell size={24} />
          </div>
          <h1 className="text-2xl font-bold text-[#1A2E44]">Notifications</h1>
        </div>

        {loading ? (
          <div className="flex justify-center p-10">
            <p className="text-gray-500 animate-pulse">Loading notifications...</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl shadow-sm text-center">
            <div className="flex justify-center mb-4 text-gray-300">
              <Bell size={48} />
            </div>
            <p className="text-gray-500 text-lg font-medium">No new notifications</p>
            <p className="text-sm text-gray-400">We'll notify you when there's an update about your appointments.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((n) => (
              <div 
                key={n.id} 
                className="bg-white p-5 rounded-2xl shadow-sm border-l-4 border-blue-500 hover:shadow-md transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-[#0D1B2A] text-lg flex items-center gap-2">
                    {n.title.includes("Appointment") ? <Calendar size={18} className="text-blue-500" /> : <Info size={18} className="text-blue-500" />}
                    {n.title}
                  </h4>
                  <span className="text-[10px] font-medium bg-gray-100 text-gray-500 px-2 py-1 rounded-md">
                    {new Date(n.created_at).toLocaleDateString()}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 leading-relaxed">
                  {n.message}
                </p>
                
                <div className="mt-3 flex justify-end">
                  <span className="text-[10px] text-gray-400">
                    {new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientNotifications;