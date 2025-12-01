import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import type { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import DoctorNavbar from "../sharedFile/DoctorNavbar";

interface Appointment {
  id: number;
  patientName: string;
  date: string;
  time: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
}

const Appointments: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeTab, setActiveTab] = useState<
    "pending" | "approved" | "rejected"
  >("pending");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const token = localStorage.getItem("token");

  // ================================
  // FETCH APPOINTMENTS (API)
  // ================================
  const fetchAppointments = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/appointments/pending",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      if (result.status === "success") {
        setAppointments(result.data);
      } else {
        console.error("API error:", result);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedDateStr = selectedDate.toISOString().split("T")[0];

  const filteredAppointments = appointments
    .filter((a) => a.date === selectedDateStr)
    .filter((a) => a.status === activeTab)
    .filter((a) =>
      a.patientName.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleDateChange: CalendarProps["onChange"] = (value) => {
    if (value instanceof Date) setSelectedDate(value);
  };

  // ================================
  // APPROVE / REJECT FUNCTIONS
  // ================================
  const updateAppointmentStatus = async (
    id: number,
    action: "approve" | "reject"
  ) => {
    if (!token) return;
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/appointments/${id}/${action}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error(`Failed to ${action} appointment`);

      // تحديث الـ state مباشرة بعد النجاح
      setAppointments((prev) =>
        prev.map((a) =>
          a.id === id
            ? { ...a, status: action === "approve" ? "approved" : "rejected" }
            : a
        )
      );
    } catch (error) {
      console.error(`Error ${action} appointment:`, error);
    }
  };

  const approveAppointment = (id: number) =>
    updateAppointmentStatus(id, "approve");
  const rejectAppointment = (id: number) =>
    updateAppointmentStatus(id, "reject");

  // ================================
  // RENDER
  // ================================
  return (
    <div className="min-h-screen bg-[#E9F2FA] flex flex-col">
      <DoctorNavbar />

      <div className="flex flex-col lg:flex-row p-6 pt-28 gap-8">
        {/* Calendar */}
        <div className="bg-white p-6 rounded-2xl shadow-lg w-full lg:w-1/3">
          <h2 className="text-xl font-bold mb-4 text-[#1A2E44]">Calendar</h2>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            className="text-[#1A2E44]"
          />
        </div>

        {/* Appointments Section */}
        <div className="flex-1 bg-white p-6 rounded-2xl shadow-lg">
          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b pb-2">
            <button
              onClick={() => setActiveTab("pending")}
              className={`px-4 py-2 font-semibold ${
                activeTab === "pending"
                  ? "border-b-2 border-[#1A2E44] text-[#1A2E44]"
                  : "text-gray-500"
              }`}
            >
              Pending
            </button>

            <button
              onClick={() => setActiveTab("approved")}
              className={`px-4 py-2 font-semibold ${
                activeTab === "approved"
                  ? "border-b-2 border-green-600 text-green-700"
                  : "text-gray-500"
              }`}
            >
              Approved
            </button>

            <button
              onClick={() => setActiveTab("rejected")}
              className={`px-4 py-2 font-semibold ${
                activeTab === "rejected"
                  ? "border-b-2 border-red-600 text-red-700"
                  : "text-gray-500"
              }`}
            >
              Rejected
            </button>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search by patient name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D1B2A]"
          />

          {/* Table */}
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : filteredAppointments.length === 0 ? (
            <p className="text-gray-500">Nothing to show.</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#EAF2FA] text-left">
                  <th className="p-3">Patient</th>
                  <th className="p-3">Time</th>
                  <th className="p-3">Reason</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredAppointments.map((a) => (
                  <tr
                    key={a.id}
                    className="border-b hover:bg-[#F9FBFD] transition"
                  >
                    <td className="p-3 font-medium">{a.patientName}</td>
                    <td className="p-3 font-medium">{a.time}</td>
                    <td className="p-3 font-medium">{a.reason}</td>

                    <td className="p-3 text-center">
                      {activeTab === "pending" && (
                        <div className="flex gap-3 justify-center">
                          <button
                            onClick={() => approveAppointment(a.id)}
                            className="bg-green-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-green-700 transition"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() => rejectAppointment(a.id)}
                            className="bg-red-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-red-700 transition"
                          >
                            Reject
                          </button>
                        </div>
                      )}

                      {activeTab !== "pending" && (
                        <span
                          className={`font-semibold ${
                            a.status === "approved"
                              ? "text-green-700"
                              : "text-red-700"
                          }`}
                        >
                          {a.status.toUpperCase()}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointments;
