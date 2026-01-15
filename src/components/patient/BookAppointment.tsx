import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface Availability {
  id: number;
  day_in_week: string;
  start_time: string;
  end_time: string;
  doctor_id: number;
  doctor_availabilities_id: number;
}

const BookAppointment: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const { availability, selectedDay } = location.state as {
    availability: Availability;
    selectedDay: string;
  };

  const token = localStorage.getItem("token");

  const [appointmentDate, setAppointmentDate] = useState<string>("");
  const [appointmentTime, setAppointmentTime] = useState<string>("");
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!appointmentDate || !appointmentTime) {
    toast.warning("Please select the date and time");
    return;
  }

  setLoading(true);

  try {
    const res = await fetch("http://127.0.0.1:8000/api/appointments/book", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        availability_id: availability.doctor_availabilities_id,
        appointment_date: appointmentDate,
        appointment_time: appointmentTime,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      if (data.errors) {
      Object.values(data.errors as Record<string, string[]>).forEach(
        (messages) => {
          messages.forEach((msg) => {
            toast.error(msg);
          });
        }
      );
      return;
    }
    else if (data.message) {
      toast.error(data.message);
    }
    
    return;
  }
  
    navigate("/patient-appointments");
    toast.success("The appointment was booked successfully.");

  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#1e293b]/70 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
        <h2 className="text-2xl font-semibold text-white mb-4 text-center">
          Book Appointment for {selectedDay}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-300 mb-1 block">Date:</label>
            <input
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              className="w-full p-2 rounded-md border border-gray-600 bg-[#0f172a] text-white"
            />
          </div>
          <div>
            <label className="text-gray-300 mb-1 block">Time:</label>
            <input
              type="time"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              className="w-full p-2 rounded-md border border-gray-600 bg-[#0f172a] text-white"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-medium transition"
          >
            {loading ? "Booking..." : "Book Appointment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
