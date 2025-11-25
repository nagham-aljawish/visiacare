import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PatientNavbar from "../sharedFile/PatientNavbar";

const DoctorsList = () => {
  const navigate = useNavigate();

  const dummyDoctors = [
    {
      id: 1,
      name: "Dr. Sarah Khaled",
      specialization: "Ophthalmologist",
      experience: "8 Years",
      image: "/images/female-doctor.jpg",
    },
    {
      id: 2,
      name: "Dr. Ahmad Hassan",
      specialization: "Eye Surgeon",
      experience: "12 Years",
      image: "/images/male-doctor.jpg",
    },
    {
      id: 3,
      name: "Dr. Lina Yousef",
      specialization: "Retina Specialist",
      experience: "6 Years",
      image: "/images/female-doctor2.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-[#E9F2FA]">
      <PatientNavbar />

      {/* Title */}
      <h1 className="text-4xl font-bold text-[#1A2E44] text-center pt-24 mb-10 tracking-wide">
        Available Doctors
      </h1>

      {/* Cards Wrapper */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6 max-w-6xl mx-auto pb-16">
        {dummyDoctors.map((doctor) => (
          <motion.div
            key={doctor.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6 border border-gray-100"
          >
            {/* Doctor Image */}
            <div className="flex justify-center">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-32 h-32 object-cover rounded-xl shadow-md border-2 border-gray-200"
              />
            </div>

            {/* Info */}
            <h2 className="text-xl font-semibold text-center mt-5 text-[#1A2E44]">
              {doctor.name}
            </h2>

            <p className="text-center text-gray-600 text-sm mt-1">
              {doctor.specialization}
            </p>

            <p className="text-center text-gray-500 text-sm mt-1">
              Experience: {doctor.experience}
            </p>

            {/* Buttons */}
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
