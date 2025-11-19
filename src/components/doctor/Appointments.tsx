import React, { useState } from "react";
import Calendar from "react-calendar";
import type { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import DoctorNavbar from "../sharedFile/DoctorNavbar";

interface Appointment {
  id: number;
  patientName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  reason: string;
}

const Appointments: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [searchTerm, setSearchTerm] = useState<string>("");

  const appointments: Appointment[] = [
    {
      id: 1,
      patientName: "Amro",
      date: "2025-11-20",
      time: "10:00",
      reason: "Checkup",
    },
    {
      id: 2,
      patientName: "Nour",
      date: "2025-11-20",
      time: "11:00",
      reason: "Consultation",
    },
    {
      id: 3,
      patientName: "Sara",
      date: "2025-11-21",
      time: "09:30",
      reason: "Follow-up",
    },
    {
      id: 4,
      patientName: "Amro",
      date: "2025-11-21",
      time: "14:00",
      reason: "Consultation",
    },
  ];

  const selectedDateStr = selectedDate.toISOString().split("T")[0];

  const filteredAppointments = appointments
    .filter((a) => a.date === selectedDateStr)
    .filter((a) =>
      a.patientName.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleDateChange: CalendarProps["onChange"] = (value) => {
    if (value instanceof Date) setSelectedDate(value);
    else if (Array.isArray(value)) setSelectedDate(value[0] ?? new Date());
    else setSelectedDate(new Date());
  };

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

        {/* Appointments Table */}
        <div className="flex-1 bg-white p-6 rounded-2xl shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
            <h2 className="text-xl font-bold text-[#1A2E44]">
              Appointments on {selectedDate.toDateString()}
            </h2>
            <input
              type="text"
              placeholder="Search by patient name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D1B2A]"
            />
          </div>

          {filteredAppointments.length === 0 ? (
            <p className="text-gray-500">No appointments on this day.</p>
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
                      <button className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-blue-700 transition">
                        View File
                      </button>
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
