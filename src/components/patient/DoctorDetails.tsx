import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import PatientNavbar from "../sharedFile/PatientNavbar";
import { motion } from "framer-motion";

interface Doctor {
  id: number;
  name: string;
  speciality: string;
  image: string;
  experience: string;
  location: string;
}

const DoctorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // 🔥 بيانات وهمية داخل نفس الصفحة (بدون API)
  const doctors: Doctor[] = [
    {
      id: 1,
      name: "Dr. Sarah Khaled",
      speciality: "Ophthalmologist",
      image: "/images/doctor1.jpg",
      experience: "10+ years",
      location: "Damascus, Syria",
    },
    {
      id: 2,
      name: "Dr. Ahmad Youssef",
      speciality: "Retina Specialist",
      image: "/images/doctor2.jpg",
      experience: "8+ years",
      location: "Aleppo, Syria",
    },
    {
      id: 3,
      name: "Dr. Lina Hamdan",
      speciality: "Cornea Specialist",
      image: "/images/doctor3.jpg",
      experience: "12+ years",
      location: "Latakia, Syria",
    },
  ];

  // إيجاد الدكتور حسب ID
  const doctor = doctors.find((d) => d.id === Number(id));

  if (!doctor) {
    return (
      <h1 className="text-center mt-24 text-xl font-semibold text-red-600">
        Doctor not found.
      </h1>
    );
  }

  return (
    <div className="min-h-screen bg-[#E9F2FA]">
      <PatientNavbar />

      <div className="pt-24 px-6 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-lg rounded-2xl p-8 max-w-3xl w-full"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-40 h-40 rounded-2xl object-cover shadow-lg"
            />

            <div>
              <h1 className="text-3xl font-bold text-[#1A2E44]">
                {doctor.name}
              </h1>
              <p className="text-[#1A2E44]/70 text-lg mt-1">
                {doctor.speciality}
              </p>

              <div className="mt-4 space-y-1">
                <p className="text-[#1A2E44]">
                  🧑‍⚕️ Experience: {doctor.experience}
                </p>
                <p className="text-[#1A2E44]">🎓 Certified Specialist</p>
                <p className="text-[#1A2E44]">📍 {doctor.location}</p>
              </div>
            </div>
          </div>

          {/* Doctor Description */}
          <p className="mt-8 text-[#1A2E44]/80 leading-relaxed">
            Dr. {doctor.name} is a highly experienced specialist in{" "}
            {doctor.speciality}. He provides advanced eye care using modern
            medical techniques to ensure accurate diagnosis and effective
            treatments.
          </p>

          {/* Button */}
          <div className="mt-8 flex justify-end">
            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => navigate(`/patient-book-appointment/${doctor.id}`)}
              className="bg-[#1A2E44] text-white px-8 py-3 rounded-full font-medium hover:bg-[#16283b] transition"
            >
              Book Appointment
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DoctorDetails;
