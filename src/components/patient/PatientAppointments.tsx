import React from "react";
import { motion } from "framer-motion";
import PatientNavbar from "../sharedFile/PatientNavbar";

interface Appointment {
  id: number;
  doctorName: string;
  speciality: string;
  date: string;
  time: string;
  status: "Confirmed" | "Pending" | "Cancelled";
}

const PatientAppointments: React.FC = () => {
  // بيانات وهمية
  const appointments: Appointment[] = [
    {
      id: 1,
      doctorName: "Dr. Sarah Khaled",
      speciality: "Ophthalmologist",
      date: "2025-12-28",
      time: "10:00 AM",
      status: "Confirmed",
    },
    {
      id: 2,
      doctorName: "Dr. Ahmad Youssef",
      speciality: "Retina Specialist",
      date: "2025-12-30",
      time: "02:30 PM",
      status: "Pending",
    },
    {
      id: 3,
      doctorName: "Dr. Lina Hamdan",
      speciality: "Cornea Specialist",
      date: "2026-01-02",
      time: "11:15 AM",
      status: "Cancelled",
    },
  ];

  return (
    <div className="min-h-screen bg-[#E9F2FA]">
      <PatientNavbar />

      <div className="pt-24 px-6 lg:px-20">
        <h1 className="text-3xl font-bold text-[#1A2E44] mb-8 text-center">
          My Appointments
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((appt) => (
            <motion.div
              key={appt.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition"
            >
              <h2 className="text-xl font-semibold text-[#1A2E44]">
                {appt.doctorName}
              </h2>
              <p className="text-gray-600 mt-1">{appt.speciality}</p>
              <p className="text-gray-500 mt-2">
                📅 {appt.date} ⏰ {appt.time}
              </p>
              <p
                className={`mt-3 font-medium ${
                  appt.status === "Confirmed"
                    ? "text-green-600"
                    : appt.status === "Pending"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                Status: {appt.status}
              </p>
              <button
                className="mt-5 w-full bg-[#1A2E44] text-white py-2 rounded-full hover:bg-[#16283b] transition"
                // لاحقًا ممكن تضيف تعديل/إلغاء موعد
                onClick={() => alert(`Manage appointment #${appt.id}`)}
              >
                Manage Appointment
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientAppointments;
