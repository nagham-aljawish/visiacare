import React from "react";
import DoctorNavbar from "../sharedFile/DoctorNavbar";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";

const MedicalRecord: React.FC = () => {
  const { recordId } = useParams();
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const doctor_id = userData.id;

  return (
    <div className="min-h-screen bg-[#E9F2FA] flex flex-col">
      <DoctorNavbar />

      <div className="flex flex-col items-center flex-1 px-6 lg:px-20 pt-28">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-3xl bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/40"
        >
          {/* Title */}
          <h1 className="text-3xl font-bold text-[#1A2E44] mb-6">
            Medical Record
          </h1>

          {/* Info Card */}
          <div className="bg-[#EAF2FA] p-5 rounded-xl shadow-inner">
            <h2 className="text-xl font-semibold text-[#1A2E44] mb-4">
              Record Details
            </h2>

            <div className="space-y-3 text-[#1A2E44]">
              <p className="text-lg">
                <span className="font-semibold">Record ID:</span> {recordId}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Doctor ID:</span> {doctor_id}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex justify-between">
            <button
              onClick={() => navigate("/patients")}
              className="bg-gray-300 text-[#1A2E44] px-5 py-2 rounded-full shadow hover:bg-gray-400 transition"
            >
              Back
            </button>

            <button
              onClick={() =>
                navigate(`/medical-record/${recordId}/prescription`)
              }
              className="bg-[#1A2E44] text-white px-6 py-2 rounded-full shadow hover:bg-[#16283b] transition"
            >
              Create Prescription
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MedicalRecord;
