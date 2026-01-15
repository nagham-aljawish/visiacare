import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import EyeLogo from "/src/assets/eye-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";

const OpticalStoreRegister: React.FC = () => {
  const [storeName, setStoreName] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [shift, setShift] = useState(""); // date

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (
      !storeName ||
      !name ||
      !gender ||
      !email ||
      !phone_number ||
      !password
    ) {
      setError("Please fill out all required fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/auth/register/opticalstore",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            storeName,
            name,
            gender,
            email,
            phone_number,
            password,
            location,
            description,
            shift,
          }),
        }
      );

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        setError(data.message || "Something went wrong. Try again.");
        return;
      }
      
      navigate("/")
      setSuccess(
        "Your registration request has been sent successfully. Please wait for admin approval before logging in."
      );

      setStoreName("");
      setName("");
      setGender("");
      setEmail("");
      setPhoneNumber("");
      setPassword("");
      setLocation("");
      setDescription("");
      setShift("");
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
        className="relative z-10 w-[400px] bg-[#CCDCE9]/40 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/30"
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
          <p className="text-[#1A2E44]/80 text-sm">
            Optical Store Registration Form
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-3.5">
          <input
            type="text"
            placeholder="Store name"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            className="w-full px-3 py-2.5 text-[14px] rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2.5 text-[14px] rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-3 py-2.5 text-[14px] rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <input
            type="email"
            placeholder="example@store.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2.5 text-[14px] rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          <input
            type="tel"
            placeholder="+963 xxx xxx xxx"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-3 py-2.5 text-[14px] rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

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

          <input
            type="text"
            placeholder="Store location (optional)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2.5 text-[14px] rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          <div>
            <label className="block text-[#1A2E44] mb-1 text-sm font-medium">
              Work Shift Date
            </label>
            <input
              type="date"
              value={shift}
              onChange={(e) => setShift(e.target.value)}
              className="w-full px-3 py-2.5 text-[14px] rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <textarea
            placeholder="Description about the store (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2.5 text-[14px] rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
            rows={3}
          />

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
              href="/home"
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

export default OpticalStoreRegister;
