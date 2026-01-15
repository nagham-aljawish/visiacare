import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Availability {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  id: any;
  day_in_week: string;
  start_time: string;
  end_time: string;
  doctor_name: string;
  location: string;
}

interface Doctor {
  id: number;
  doctor_name: string;
  availabilities: Availability[];
}

const DoctorDetails: React.FC = () => {
  const { id: doctorId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!doctorId) return;

    const fetchDoctorDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/api/doctor/${doctorId}/availabilities`,
          {
            headers: {
              "Content-Type": "application/json",
              ...(token && { Authorization: `Bearer ${token}` }),
            },
            credentials: "include",
          }
        );
        const data = await res.json();
        if (data.status === "success") {
          setDoctor({
            id: parseInt(doctorId),
            doctor_name: data.data[0].doctor_name,
            availabilities: data.data,
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [doctorId, token]);

  if (loading)
    return (
      <p className="text-white text-center mt-10">Loading doctor details...</p>
    );
  if (!doctor)
    return <p className="text-white text-center mt-10">Doctor not found.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] p-6">
      <div className="max-w-3xl mx-auto mt-6 bg-[#1e293b]/70 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          Available Times for {doctor.doctor_name}
        </h2>

        {doctor.availabilities && doctor.availabilities.length > 0 ? (
          <ul className="space-y-3">
            {doctor.availabilities.map((a) => {
              const days = a.day_in_week.split(",").map((d) => d.trim());
              return days.map((day) => (
                <li
                  key={`${a.id}-${day}`}
                  className="flex justify-between items-center bg-[#0f172a]/60 border border-white/5 p-4 rounded-xl shadow-inner text-gray-200"
                >
                  <span className="font-medium text-white">{day}</span>
                  <span className="text-gray-300">
                    {a.start_time} — {a.end_time}
                  </span>
                  <button
                    onClick={() =>
                      navigate(`/patient-book-appointment/${doctor.id}`, {
                        state: { availability: a, selectedDay: day },
                      })
                    }
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Book
                  </button>
                </li>
              ));
            })}
          </ul>
        ) : (
          <p className="text-gray-400 mt-4">No availabilities yet.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorDetails;
