import React, { useState } from "react";
import { motion } from "framer-motion";
import EyeLogo from "/src/assets/eye-svgrepo-com.svg";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PatientRegister: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [national_number, setNationalNumber] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [chronic_conditions, setChronicConditions] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setFieldErrors({});
    setLoading(true);

    if (
      !name ||
      !email ||
      !national_number ||
      !phone_number ||
      !gender ||
      !location ||
      !password
    ) {
      setError("Please fill out all required fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/auth/register/patient",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            national_number,
            phone_number,
            gender,
            location,
            password,
            chronic_conditions,
          }),
        }
      );

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        if (data.errors) {
          setFieldErrors(data.errors);
        } else {
          setError(data.message || "Something went wrong");
        }
        return;
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("user_id", data.data.id.toString());
      const role = data.data.role ? data.data.role.toLowerCase() : "patient";
      localStorage.setItem("my_role", role);
      localStorage.setItem("patient_profile_id",data.data.patient_profile_id.toString());

      navigate("/patient-home");
      setSuccess(
        "Your account has been created successfully! You can now log in."
      );

      setName("");
      setEmail("");
      setNationalNumber("");
      setPhoneNumber("");
      setGender("");
      setLocation("");
      setChronicConditions("");
      setPassword("");
    } catch (err) {
      console.error("Error:", err);
      setError("Server connection failed. Please try again.");
      setLoading(false);
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
        className="relative z-10 w-[420px] bg-[#CCDCE9]/40 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/30"
      >
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

        <form onSubmit={handleSubmit} className="flex flex-col space-y-3.5">
          {fieldErrors.name && (
            <p className="text-red-600 text-xs mt-1">
              {fieldErrors.name[0]}
            </p>
          )}
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2.5 text-[14px] rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {fieldErrors.email && (
            <p className="text-red-600 text-xs mt-1">
              {fieldErrors.email[0]}
            </p>
          )}
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2.5 text-[14px] rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {fieldErrors.national_number && (
            <p className="text-red-600 text-xs mt-1">
              {fieldErrors.national_number[0]}
            </p>
          )}
          <input
            type="text"
            placeholder="National ID"
            value={national_number}
            onChange={(e) => setNationalNumber(e.target.value)}
            className="w-full px-3 py-2.5 text-[14px] rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          {fieldErrors.phone_number && (
            <p className="text-red-600 text-xs mt-1">
              {fieldErrors.phone_number[0]}
            </p>
          )}

          <input
            type="tel"
            placeholder="+963 xxx xxx xxx"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-3 py-2.5 text-[14px] rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          {fieldErrors.gender && (
            <p className="text-red-600 text-xs mt-1">
              {fieldErrors.gender[0]}
            </p>
          )}

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-3 py-2.5 text-[14px] rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          {fieldErrors.location && (
            <p className="text-red-600 text-xs mt-1">
              {fieldErrors.location[0]}
            </p>
          )}

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2.5 text-[14px] rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          <textarea
            placeholder="Chronic conditions (optional)"
            value={chronic_conditions}
            onChange={(e) => setChronicConditions(e.target.value)}
            className="w-full px-3 py-2.5 text-[14px] rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
          />

          {fieldErrors.password && (
            <p className="text-red-600 text-xs mt-1">
              {fieldErrors.password[0]}
            </p>
          )}

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2.5 pr-10 text-[14px] rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-[#1A2E44] transition"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          {success && (
            <p className="text-green-700 text-sm text-center">{success}</p>
          )}

          <motion.button
            whileHover={!loading ? { scale: 1.03 } : {}}
            whileTap={!loading ? { scale: 0.97 } : {}}
            type="submit"
            disabled={loading}
            className={`w-full text-white text-[14px] py-2.5 rounded-full font-medium transition ${
              loading
                ? "bg-[#1A2E44]/60 cursor-not-allowed"
                : "bg-[#1A2E44] hover:bg-[#16283b]"
            }`}
          >
            {loading ? "Submitting..." : "Sign Up"}
          </motion.button>

          <p className="text-center text-[#1A2E44]/80 text-sm mt-2">
            Already have an account?{" "}
            <a
              href="/"
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
