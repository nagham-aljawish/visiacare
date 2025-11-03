import React, { useState } from "react";
import { motion } from "framer-motion";
import EyeLogo from "/src/assets/eye-svgrepo-com.svg";

const PatientRegister: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!fullName || !nationalId || !phone || !password) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      // 📡 إرسال البيانات إلى الـ backend
      const response = await fetch("https://your-backend.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: "patient", // 👈 الدور الخاص بالمريض
          fullName,
          nationalId,
          phone,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Something went wrong. Try again.");
        return;
      }

      setSuccess("Patient account created successfully!");
      setFullName("");
      setNationalId("");
      setPhone("");
      setPassword("");
    } catch (err) {
      console.error("Error:", err);
      setError("Server connection failed. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/images/IMG_9406.JPG')",
      }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-[400px] bg-[#CCDCE9]/40 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/30"
      >
        {/* ✅ الشعار */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-2">
            <img
              src={EyeLogo}
              alt="VisiaCare logo"
              className="w-8 h-8"
              style={{
                filter:
                  "invert(18%) sepia(19%) saturate(936%) hue-rotate(176deg) brightness(92%) contrast(92%)",
              }}
            />
            <h1 className="text-3xl font-semibold text-[#1A2E44]">VisiaCare</h1>
          </div>
          <p className="text-[#1A2E44]/80 text-sm">Patient Registration Form</p>
        </div>

        {/* ✅ نموذج التسجيل */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3.5">
          <input
            type="text"
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-3 py-2.5 text-[14px] rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="text"
            placeholder="National ID"
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
            className="w-full px-3 py-2.5 text-[14px] rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="tel"
            placeholder="+963 xxx xxx xxx"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2.5 text-[14px] rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2.5 text-[14px] rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          {/* ✅ الرسائل */}
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          {success && (
            <p className="text-green-700 text-sm text-center">{success}</p>
          )}

          {/* ✅ زر التسجيل */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-[#1A2E44] text-white text-[14px] py-2.5 rounded-full font-medium hover:bg-[#16283b] transition"
          >
            Sign Up
          </motion.button>

          {/* ✅ رابط العودة */}
          <p className="text-center text-[#1A2E44]/80 text-sm mt-2">
            Already have an account?{" "}
            <a
              href="/patient-login"
              className="underline font-medium hover:text-[#1A2E44]"
            >
              Login here
            </a>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default PatientRegister;
