import { useState } from "react";
import PatientNavbar from "../sharedFile/PatientNavbar";
import { motion } from "framer-motion";

const BookAppointment: React.FC = () => {
  const [selectedDoctor, setSelectedDoctor] = useState("Dr. Sarah Khaled");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  // بيانات وهمية
  const doctors = ["Dr. Sarah Khaled", "Dr. Ahmad Hassan", "Dr. Lina Yousef"];
  const times = ["09:00 AM", "10:30 AM", "12:00 PM", "02:00 PM", "04:00 PM"];
  const dates = ["2025-11-26", "2025-11-27", "2025-11-28", "2025-11-29"];

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) return alert("Select date & time");
    setConfirmed(true);
  };

  return (
    <div className="min-h-screen bg-[#E9F2FA]">
      <PatientNavbar />

      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-[#1A2E44] mb-6 text-center">
          Book an Appointment
        </h1>

        <div className="bg-white p-6 rounded-2xl shadow-lg space-y-5">
          <div>
            <label className="block mb-1 font-medium text-[#1A2E44]">
              Doctor
            </label>
            <select
              className="w-full p-3 rounded-lg border border-gray-300"
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
            >
              {doctors.map((doc) => (
                <option key={doc} value={doc}>
                  {doc}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium text-[#1A2E44]">
              Date
            </label>
            <select
              className="w-full p-3 rounded-lg border border-gray-300"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              <option value="">Select Date</option>
              {dates.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium text-[#1A2E44]">
              Time
            </label>
            <select
              className="w-full p-3 rounded-lg border border-gray-300"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            >
              <option value="">Select Time</option>
              {times.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <button
            className="w-full bg-[#1A2E44] text-white py-3 rounded-full hover:bg-[#16283b] transition"
            onClick={handleBooking}
          >
            Book Appointment
          </button>

          {confirmed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg text-center"
            >
              Appointment booked with {selectedDoctor} on {selectedDate} at{" "}
              {selectedTime}!
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
