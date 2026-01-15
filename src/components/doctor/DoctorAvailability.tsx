import React, { useState } from "react";
import { motion } from "framer-motion";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const DoctorAvailability: React.FC = () => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const submitAvailability = async (method: "POST" | "PUT") => {
    if (!startTime || !endTime || selectedDays.length === 0) {
      setMessage("Please select days and time.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/doctor/availability",
        {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            day_in_week: selectedDays.join(","),
            start_time: startTime,
            end_time: endTime,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage("Failed to save availability");
      } else {
        setMessage(data.message);
      }
    } catch {
      setMessage("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#CCDCE9] rounded-2xl shadow-xl p-6"
    >
      <h1 className="text-2xl font-bold mb-6 text-[#0D1B2A]">
        Doctor Availability
      </h1>

      <div className="mb-4">
        <p className="font-medium mb-2">Select Working Days</p>
        <div className="flex flex-wrap gap-2">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => toggleDay(day)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedDays.includes(day)
                  ? "bg-[#0D1B2A] text-white"
                  : "bg-white text-[#0D1B2A]"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm mb-1">Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full px-3 py-2 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full px-3 py-2 rounded-lg"
          />
        </div>
      </div>

      {message && <p className="text-sm mb-3">{message}</p>}

      <div className="flex gap-4">
        <button
          disabled={loading}
          onClick={() => submitAvailability("POST")}
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Create
        </button>

        <button
          disabled={loading}
          onClick={() => submitAvailability("PUT")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Update
        </button>
      </div>
    </motion.div>
  );
};

export default DoctorAvailability;
