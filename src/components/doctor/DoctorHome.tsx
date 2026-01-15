import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const DoctorHome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#E9F2FA] flex flex-col">
      <div className="flex flex-col lg:flex-row items-center justify-center flex-1 px-6 lg:px-20 gap-16">
        <motion.img
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          src="/images/DoctorIMG.jpg"
          alt="Doctor illustration"
          className="w-[280px] sm:w-[340px] lg:w-[460px] drop-shadow-2xl order-2 lg:order-1"
        />

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/80 backdrop-blur-md p-6 lg:p-8 rounded-2xl shadow-lg text-center lg:text-left max-w-lg order-1 lg:order-2"
        >
          <h1 className="text-2xl lg:text-3xl font-bold text-[#1A2E44] leading-snug mb-4">
            Welcome Back,
            <br />
            <span className="text-[#0D1B2A]">Doctor 👋</span>
          </h1>

          <p className="text-[#1A2E44]/80 text-sm lg:text-base mb-6 leading-relaxed">
            Manage appointments, connect with patients, and keep track of your
            workday effortlessly — all in one clean, smart dashboard.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/doctor-dashboard")}
            className="bg-[#1A2E44] text-white px-8 py-2.5 rounded-full text-sm lg:text-base font-medium hover:bg-[#16283b] transition float-right lg:float-left"
          >
            Go to Dashboard
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default DoctorHome;
