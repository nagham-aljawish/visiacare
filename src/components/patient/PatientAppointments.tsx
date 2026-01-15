import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PatientNavbar from "../sharedFile/PatientNavbar";

interface ApiAppointment {
  id: number;
  appointment_date: string;
  appointment_time: string;
  status: "pending" | "approved" | "rejected";
  doctor: {
    doctor_id: number;
    name: string;
    location: string;
  };
}

const PatientAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<ApiAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAppointments = async () => {
        const response = await fetch(
          "http://127.0.0.1:8000/api/patient/appointments",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load appointments");
        }

        setAppointments(data.data);
        setLoading(false);
    };

    fetchAppointments();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-600";
      case "pending":
        return "text-yellow-600";
      case "rejected":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const formatTime = (time: string) => time.slice(0, 5);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading appointments...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E9F2FA]">
      <PatientNavbar />

      <div className="pt-24 px-6 lg:px-20">
        <h1 className="text-3xl font-bold text-[#1A2E44] mb-8 text-center">
          My Appointments
        </h1>

        {appointments.length === 0 ? (
          <p className="text-center text-gray-600">
            You have no appointments yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointments.map((appt) => (
              <motion.div
                key={appt.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition"
              >
                <h2 className="text-xl font-semibold text-[#1A2E44]">
                  {appt.doctor.name}
                </h2>
                <p className="text-gray-600 mt-1">
                  Location: {appt.doctor.location}
                </p>

                <p className="text-gray-500 mt-2">
                  📅 {appt.appointment_date} ⏰{" "}
                  {formatTime(appt.appointment_time)}
                </p>

                <p
                  className={`mt-3 font-medium ${getStatusColor(
                    appt.status
                  )}`}
                >
                  Status: {appt.status}
                </p>

              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientAppointments;
