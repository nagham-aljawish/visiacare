import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Clock, Eye, Loader2 } from "lucide-react";
import EyeLogo from "/src/assets/eye-svgrepo-com.svg";

interface Request {
  id: number;
  name: string;
  role: "Doctor" | "Optical Store";
  status: "approved" | "pending" | "rejected";
}

const AdminDashboard: React.FC = () => {
  const [filter, setFilter] = useState<
    "all" | "approved" | "pending" | "rejected"
  >("all");
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRequests = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://your-backend-api.com/api/requests");

      if (!response.ok) {
        throw new Error("Failed to fetch requests");
      }

      const data = await response.json();
      setRequests(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Error loading requests. Please try again later.";
      setError(errorMessage);
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const filteredRequests =
    filter === "all" ? requests : requests.filter((r) => r.status === filter);

  const updateStatus = async (
    id: number,
    newStatus: "approved" | "rejected"
  ) => {
    try {
      const response = await fetch(
        `https://your-backend-api.com/api/requests/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) throw new Error("Failed to update status");

      setRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, status: newStatus } : req))
      );
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error updating request.";
      alert(errorMessage);
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#E9F2FA] text-[#1A2E44]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1A2E44] text-white flex flex-col p-6 space-y-6">
        <div className="flex items-center gap-2 mb-6">
          <img src={EyeLogo} alt="VisaCare" className="w-7 h-7 invert" />
          <h2 className="text-2xl font-semibold">VisaCare</h2>
        </div>

        <nav className="flex flex-col space-y-3">
          <button className="text-left px-3 py-2 rounded-lg bg-white/20">
            Dashboard
          </button>
          <button className="text-left px-3 py-2 rounded-lg hover:bg-white/10">
            Logout
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <div className="flex items-center gap-3 mb-6 flex-wrap">
          {[
            { key: "all", label: "All" },
            {
              key: "approved",
              label: "Approved",
              icon: <CheckCircle size={18} />,
            },
            { key: "pending", label: "Pending", icon: <Clock size={18} /> },
            { key: "rejected", label: "Rejected", icon: <XCircle size={18} /> },
          ].map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setFilter(key as never)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition ${
                filter === key
                  ? key === "approved"
                    ? "bg-green-600 text-white"
                    : key === "pending"
                    ? "bg-yellow-500 text-white"
                    : key === "rejected"
                    ? "bg-red-600 text-white"
                    : "bg-[#1A2E44] text-white"
                  : "bg-white text-[#1A2E44] border"
              }`}
            >
              {icon} {label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40 text-[#1A2E44]">
            <Loader2 size={28} className="animate-spin mr-2" />
            Loading requests...
          </div>
        ) : error ? (
          <p className="text-center text-red-600 font-medium">{error}</p>
        ) : (
          <motion.div
            className="bg-white rounded-xl shadow-md p-6"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-xl font-semibold mb-4">
              Registration Requests ({filteredRequests.length})
            </h2>

            {filteredRequests.length === 0 ? (
              <p className="text-gray-500 text-center py-10">
                No requests found for this filter.
              </p>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#F5F8FC] text-left">
                    <th className="p-3">Name</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((req) => (
                    <tr
                      key={req.id}
                      className="border-b hover:bg-[#F9FBFD] transition"
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
                              onClick={() => updateStatus(req.id, "approved")}
                              className="bg-green-600 text-white px-3 py-1 rounded-full text-sm hover:bg-green-700 transition"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => updateStatus(req.id, "rejected")}
                              className="bg-red-600 text-white px-3 py-1 rounded-full text-sm hover:bg-red-700 transition"
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
      </main>
    </div>
  );
};

export default AdminDashboard;
