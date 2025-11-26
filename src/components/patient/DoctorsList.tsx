import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PatientNavbar from "../sharedFile/PatientNavbar";

interface Doctor {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  gender: string;
  status: string;
  license: string;
  location: string;
  shift: string;
  bio: string;
  role: string;
}

const DoctorsList: React.FC = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token"); // إذا فيه توكن مصادقة

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/doctor/approved",
          {
            headers: {
              "Content-Type": "application/json",
              ...(token && { Authorization: `Bearer ${token}` }),
            },
          }
        );

        const data = await response.json();
        if (data.status === "success") {
          setDoctors(data.data.doctors);
        } else {
          console.error("Failed to fetch doctors:", data.message);
        }
      } catch (err) {
        console.error("Error fetching doctors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-[#1A2E44] text-lg">Loading doctors...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E9F2FA]">
      <PatientNavbar />

      <h1 className="text-4xl font-bold text-[#1A2E44] text-center pt-24 mb-10 tracking-wide">
        Available Doctors
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6 max-w-6xl mx-auto pb-16">
        {doctors.map((doctor) => (
          <motion.div
            key={doctor.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6 border border-gray-100"
          >
            <div className="flex justify-center">
              <img
                src={
                  doctor.gender === "male"
                    ? "/images/DoctorIMG.jpg"
                    : "/images/doctorFemale.jpg"
                }
                alt={doctor.name}
                className="w-32 h-32 object-cover rounded-xl shadow-md border-2 border-gray-200"
              />
            </div>

            <h2 className="text-xl font-semibold text-center mt-5 text-[#1A2E44]">
              {doctor.name}
            </h2>

            <p className="text-center text-gray-600 text-sm mt-1">
              {doctor.bio || doctor.role}
            </p>

            <p className="text-center text-gray-500 text-sm mt-1">
              Location: {doctor.location}
            </p>

            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => navigate(`/doctor-details/${doctor.id}`)}
                className="px-5 py-2 bg-[#1A2E44] text-white text-sm rounded-full hover:bg-[#16283b] transition"
              >
                View Profile
              </button>

              <button
                onClick={() =>
                  navigate(`/patient-book-appointment/${doctor.id}`)
                }
                className="px-5 py-2 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition"
              >
                Book Appointment
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
