import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Loader2,
  Users,
  Bell,
  Stethoscope,
  Briefcase,
} from "lucide-react";
import EyeLogo from "/src/assets/eye-svgrepo-com.svg";

interface Request {
  id: number;
  name: string;
  role: "Doctor" | "Optical Store" | "Patient";
  status: "approved" | "pending" | "rejected";
}

const AdminDashboard: React.FC = () => {
  const [filter, setFilter] = useState<
    "all" | "approved" | "pending" | "rejected"
  >("all");
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<
    "dashboard" | "users" | "notifications"
  >("dashboard");

  useEffect(() => {
    // بيانات تجريبية مؤقتة
    setTimeout(() => {
      setRequests([
        { id: 1, name: "Dr. John Smith", role: "Doctor", status: "pending" },
        {
          id: 2,
          name: "OptiView Store",
          role: "Optical Store",
          status: "approved",
        },
        { id: 3, name: "Emily Roberts", role: "Patient", status: "rejected" },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredRequests =
    filter === "all" ? requests : requests.filter((r) => r.status === filter);

  const updateStatus = (id: number, newStatus: "approved" | "rejected") => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: newStatus } : req))
    );
  };

  return (
    <div className="min-h-screen flex bg-[#DDE9F7] text-[#1A2E44]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0D1B2A] text-white flex flex-col p-6 space-y-8 shadow-xl">
        <div className="flex items-center gap-3 mb-8">
          <img src={EyeLogo} alt="VisaCare" className="w-8 h-8 invert" />
          <h2 className="text-2xl font-semibold">VisaCare</h2>
        </div>

        <nav className="flex flex-col space-y-2">
          <button
            className={`text-left px-4 py-2 rounded-lg font-medium ${
              activeSection === "dashboard" ? "bg-white/20" : ""
            }`}
            onClick={() => setActiveSection("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={`text-left px-4 py-2 rounded-lg font-medium ${
              activeSection === "users" ? "bg-white/20" : ""
            }`}
            onClick={() => setActiveSection("users")}
          >
            Users
          </button>
          <button
            className={`text-left px-4 py-2 rounded-lg font-medium ${
              activeSection === "notifications" ? "bg-white/20" : ""
            }`}
            onClick={() => setActiveSection("notifications")}
          >
            Notifications
          </button>
          <hr className="border-white/20 my-4" />
          <button className="text-left px-4 py-2 rounded-lg bg-[#1A2E44] hover:bg-red-700 transition">
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Section */}
      <main className="flex-1 min-h-screen p-10 overflow-y-auto bg-[#A8CFEB]">
        {activeSection === "dashboard" && (
          <>
            <h1 className="text-3xl font-bold mb-8 text-[#0D1B2A]">
              Admin Dashboard
            </h1>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 mb-10">
              {[
                {
                  label: "Doctors",
                  value: 24,
                  icon: <Stethoscope size={24} className="text-[#1A2E44]" />,
                },
                {
                  label: "Patients",
                  value: 52,
                  icon: <Users size={24} className="text-[#1A2E44]" />,
                },
                {
                  label: "Optical Stores",
                  value: 12,
                  icon: <Briefcase size={24} className="text-[#1A2E44]" />,
                },
                {
                  label: "Pending Requests",
                  value: 5,
                  color: "yellow-600",
                  icon: <Clock size={24} className="text-[#1A2E44]" />,
                },
                {
                  label: "Notifications",
                  value: 3,
                  color: "blue-600",
                  icon: <Bell size={24} className="text-[#1A2E44]" />,
                },
              ].map(({ label, value, icon, color }, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`bg-[#CCDCE9] shadow-lg rounded-xl p-6 text-center cursor-pointer`}
                >
                  <div className="flex justify-center mb-2">{icon}</div>
                  <p className="text-[#1A2E44]/70 text-sm">{label}</p>
                  <h2
                    className={`text-3xl font-bold text-${
                      color || "[#1A2E44]"
                    } mt-2`}
                  >
                    {value}
                  </h2>
                </motion.div>
              ))}
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
              {[
                { key: "all", label: "All", icon: null },
                {
                  key: "approved",
                  label: "Approved",
                  icon: <CheckCircle size={18} />,
                },
                { key: "pending", label: "Pending", icon: <Clock size={18} /> },
                {
                  key: "rejected",
                  label: "Rejected",
                  icon: <XCircle size={18} />,
                },
              ].map(({ key, label, icon }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key as never)}
                  className={`px-5 py-2 rounded-full flex items-center gap-2 font-medium shadow-md transition ${
                    filter === key
                      ? key === "approved"
                        ? "bg-green-600 text-white"
                        : key === "pending"
                        ? "bg-yellow-500 text-white"
                        : key === "rejected"
                        ? "bg-red-600 text-white"
                        : "bg-[#1A2E44] text-white"
                      : "bg-white text-[#1A2E44] hover:bg-[#DDE9F7]"
                  }`}
                >
                  {icon} {label}
                </button>
              ))}
            </div>

            {/* Requests Table */}
            {loading ? (
              <div className="flex justify-center items-center h-40 text-[#1A2E44]">
                <Loader2 size={28} className="animate-spin mr-2" />
                Loading requests...
              </div>
            ) : (
              <motion.div
                className="bg-[#CCDCE9] rounded-2xl shadow-xl p-6"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-xl font-semibold mb-4 text-[#1A2E44]">
                  Registration Requests ({filteredRequests.length})
                </h2>

                {filteredRequests.length === 0 ? (
                  <p className="text-gray-500 text-center py-10">
                    No requests found for this filter.
                  </p>
                ) : (
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-[#EAF2FA] text-left">
                        <th className="p-3 font-semibold">Name</th>
                        <th className="p-3 font-semibold">Type</th>
                        <th className="p-3 font-semibold">Status</th>
                        <th className="p-3 text-center font-semibold">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRequests.map((req) => (
                        <tr
                          key={req.id}
                          className="border-b hover:bg-[#F7FAFD] transition"
                        >
                          <td className="p-3 font-medium">{req.name}</td>
                          <td className="p-3">{req.role}</td>
                          <td
                            className={`p-3 font-semibold capitalize ${
                              req.status === "approved"
                                ? "text-green-600"
                                : req.status === "pending"
                                ? "text-yellow-600"
                                : "text-red-600"
                            }`}
                          >
                            {req.status}
                          </td>
                          <td className="p-3 flex justify-center items-center gap-2">
                            {req.status === "pending" ? (
                              <>
                                <button
                                  onClick={() =>
                                    updateStatus(req.id, "approved")
                                  }
                                  className="bg-green-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-green-700 transition"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() =>
                                    updateStatus(req.id, "rejected")
                                  }
                                  className="bg-red-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-red-700 transition"
                                >
                                  Reject
                                </button>
                              </>
                            ) : (
                              <button className="bg-[#1A2E44] text-white px-4 py-1.5 rounded-full text-sm flex items-center gap-1 hover:bg-[#16283b] transition">
                                <Eye size={16} /> View
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </motion.div>
            )}
          </>
        )}

        {activeSection === "users" && (
          <div className="text-[#1A2E44] font-semibold text-xl">
            Users Section -
          </div>
        )}

        {activeSection === "notifications" && (
          <div className="text-[#1A2E44] font-semibold text-xl">
            Notifications Section -
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
