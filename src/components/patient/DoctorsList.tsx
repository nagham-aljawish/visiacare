import { motion } from "framer-motion";
import PatientNavbar from "../sharedFile/PatientNavbar";
const DoctorsList = () => {
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
      <h1 className="text-3xl font-bold text-[#1A2E44] mb-8 text-center">
        Available Doctors
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {dummyDoctors.map((doctor) => (
          <motion.div
            key={doctor.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition"
          >
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-28 h-28 object-cover rounded-full mx-auto border-4 border-[#1A2E44]/20 shadow-md"
            />

            <h2 className="text-xl font-semibold text-center mt-4 text-[#1A2E44]">
              {doctor.name}
            </h2>

            <p className="text-center text-gray-600 text-sm">
              {doctor.specialization}
            </p>

            <p className="text-center text-gray-500 text-sm mt-1">
              Experience: {doctor.experience}
            </p>

            <div className="flex justify-center gap-3 mt-5">
              <button className="px-4 py-2 bg-[#1A2E44] text-white text-sm rounded-full hover:bg-[#16283b] transition">
                View Profile
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition">
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
