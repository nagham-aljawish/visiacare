import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PatientNavbar from "../sharedFile/PatientNavbar";

interface Doctor {
  id: number;
  doctor_profile_id: number; // مهم للـ navigation
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
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/doctor/approved?page=${currentPage}`,
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
        setCurrentPage(data.data.pagination.current_page);
        setLastPage(data.data.pagination.last_page);
      }
    } catch (err) {
      console.error("Error fetching doctors:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchDoctors();
}, [token, currentPage]);


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
      <h1 className="text-4xl font-bold text-[#1A2E44] text-center pt-24 mb-10">
        Available Doctors
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6 max-w-6xl mx-auto pb-10">
        {doctors.map((doctor) => (
          <motion.div
            key={doctor.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex justify-center">
              <img
                src={
                  doctor.gender === "male"
                    ? "/images/DoctorIMG.jpg"
                    : "/images/doctorFemale.jpg"
                }
                alt={doctor.name}
                className="w-32 h-32 rounded-xl shadow-md object-cover"
              />
            </div>

            <h2 className="text-xl font-semibold text-center mt-5 text-[#1A2E44]">
              {doctor.name}
            </h2>
            <p className="text-center text-gray-600 text-sm mt-1">
              {doctor.bio || doctor.role}
            </p>
            <p className="text-center text-gray-500 text-sm mt-1">
              {doctor.location}
            </p>

            <div className="flex justify-center mt-5">
              <button
                onClick={() => {
                  navigate(`/doctor-details/${doctor.doctor_profile_id}`);
                }}
                className="px-5 py-2 bg-[#1A2E44] text-white rounded-full"
              >
                Make an Appoiments
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center items-center gap-4 mt-10 pb-10">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className={`px-4 py-2 rounded-full transition ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#1A2E44] text-white hover:bg-[#16283b]"
            }`}
          >
            Previous
          </button>

          <span className="text-[#1A2E44] font-medium">
            Page {currentPage} of {lastPage}
          </span>

          <button
            disabled={currentPage === lastPage}
            onClick={() => setCurrentPage((p) => Math.min(lastPage, p + 1))}
            className={`px-4 py-2 rounded-full transition ${
              currentPage === lastPage
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#1A2E44] text-white hover:bg-[#16283b]"
            }`}
          >
            Next
          </button>
        </div> 

    </div>
  );
};

export default DoctorsList;
