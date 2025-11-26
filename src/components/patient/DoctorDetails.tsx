import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PatientNavbar from "../sharedFile/PatientNavbar";
import { motion } from "framer-motion";

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

interface Availability {
  day_in_week: string;
  start_time: string;
  end_time: string;
}

const DoctorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      setLoading(true);
      try {
        // جلب الأطباء المعتمدين
        const res = await fetch("http://127.0.0.1:8000/api/doctor/approved");
        const data = await res.json();

        if (data.status === "success") {
          const found = data.data.doctors.find(
            (d: Doctor) => d.id === Number(id)
          );
          if (found) setDoctor(found);

          // جلب التوافر
          const availRes = await fetch(
            `http://127.0.0.1:8000/api/doctor/${id}/availabilities`
          );
          const availData = await availRes.json();
          if (availData.status === "success") {
            setAvailability(availData.data);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-[#1A2E44] text-lg">Loading doctor details...</p>
      </div>
    );
  }

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
              src={
                doctor.gender === "male"
                  ? "/images/DoctorIMG.jpg"
                  : "/images/doctorFemale.jpg"
              }
              alt={doctor.name}
              className="w-40 h-40 rounded-2xl object-cover shadow-lg"
            />

            <div>
              <h1 className="text-3xl font-bold text-[#1A2E44]">
                {doctor.name}
              </h1>
              <p className="text-[#1A2E44]/70 text-lg mt-1">{doctor.role}</p>

              <div className="mt-4 space-y-1">
                <p className="text-[#1A2E44]">📍 {doctor.location}</p>
                <p className="text-[#1A2E44]">📧 {doctor.email}</p>
                <p className="text-[#1A2E44]">📞 {doctor.phone_number}</p>
              </div>
            </div>
          </div>

          {/* Doctor Bio */}
          <p className="mt-8 text-[#1A2E44]/80 leading-relaxed">{doctor.bio}</p>

          {/* Availability */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-[#1A2E44] mb-2">
              Availability
            </h2>
            {availability.length === 0 ? (
              <p className="text-gray-500">
                This doctor has no availability records yet.
              </p>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#C2DAED]">
                    <th className="p-3">Days</th>
                    <th className="p-3 text-center">Start Time</th>
                    <th className="p-3 text-center">End Time</th>
                  </tr>
                </thead>
                <tbody>
                  {availability.map((a, idx) => (
                    <tr key={idx} className="border-b hover:bg-[#F9FBFD]">
                      <td className="p-3">{a.day_in_week}</td>
                      <td className="p-3 text-center">{a.start_time}</td>
                      <td className="p-3 text-center">{a.end_time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Book Button */}
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
