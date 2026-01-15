import React, { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import EyeLogo from "/src/assets/eye-svgrepo-com.svg";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const validateInputs = () => {
    if (!email || !password) {
      setError("Please enter your email and password.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email address.");
      return false;
    }
    return true;
  };

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!validateInputs()) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        setError(data.message || "Login failed. Please try again.");
        return;
      }
      
      localStorage.setItem("token", data.token);
      localStorage.setItem("my_role", data.role);
      localStorage.setItem("user_id", data.user_id.toString());
      
      if (data.optical_store_id) {
        localStorage.setItem("optical_store_id", data.optical_store_id.toString());
      }
      const role = data.role;

      if (role === "Admin") {
        navigate("/admin");
      } else if (role === "Doctor") {
        navigate("/doctor-dashboard");
      } else if (role === "Patient") {
        navigate("/patient-home");
      } else if (role === "OpticalStore") {
        navigate("/store-orders");
      } else {
        navigate("/");
      }

    } catch (err) {
      console.error("Login error:", err);
      setError("Server connection error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4"
      style={{ backgroundImage: "url('/images/IMG_9406.JPG')" }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <motion.div
        className="relative z-10 w-full max-w-md bg-[#CCDCE9]/40 backdrop-blur-md p-8 sm:p-10 rounded-2xl shadow-xl border border-white/30"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-2">
            <img
              src={EyeLogo}
              alt="VisaCare logo"
              className="w-9 h-9"
              style={{
                filter:
                  "invert(18%) sepia(19%) saturate(936%) hue-rotate(176deg) brightness(92%) contrast(92%)",
              }}
            />
            <h1 className="text-3xl font-semibold text-[#1A2E44]">VisiaCare</h1>
          </div>
          <p className="text-[#1A2E44]/80 text-sm">
            Your digital eye care connection
          </p>
        </div>

        <form onSubmit={login} className="flex flex-col space-y-5">
          <div>
            <label className="block text-[#1A2E44] mb-1 font-medium">Email</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              className="w-full px-5 py-3 text-[15px] rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[#1A2E44] mb-1 font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-5 py-3 text-[15px] rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-gray-500 hover:text-[#1A2E44] transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-600 text-sm text-center mt-2">{error}</p>}

          <motion.button
            type="submit"
            disabled={loading}
            className={`w-full ${loading ? "bg-[#1A2E44]/70" : "bg-[#1A2E44]"} text-white text-[15px] py-3 rounded-full font-medium hover:bg-[#16283b] transition`}
            whileTap={{ scale: 0.97 }}
          >
            {loading ? "Logging in..." : "LOGIN"}
          </motion.button>

          <p className="text-center text-[#1A2E44]/80 text-sm mt-1">
            Don’t have an account?{" "}
            <button
              type="button"
              onClick={() => setShowRegisterModal(true)}
              className="underline font-medium hover:text-[#1A2E44]"
            >
              Create One
            </button>
          </p>
        </form>
      </motion.div>

      <AnimatePresence>
        {showRegisterModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-3xl mx-4 rounded-2xl bg-[#CCDCE9] p-8 shadow-2xl"
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
            >
              <button
                onClick={() => setShowRegisterModal(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-black"
              >
                <X size={22} />
              </button>
              <h2 className="text-2xl font-bold text-center text-[#1A2E44] mb-8">Register As</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <RegisterCard title="Doctor" desc="Register as a doctor" onClick={() => navigate("/register/doctor")} />
                <RegisterCard title="Patient" desc="Register as a patient" onClick={() => navigate("/register/patient")} />
                <RegisterCard title="Optical Store" desc="Register an optical store" onClick={() => navigate("/register/store")} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const RegisterCard = ({ title, desc, onClick }: { title: string; desc: string; onClick: () => void }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    onClick={onClick}
    className="cursor-pointer rounded-xl bg-white p-6 text-center shadow-md hover:shadow-xl transition"
  >
    <h3 className="text-xl font-semibold text-[#1A2E44]">{title}</h3>
    <p className="mt-2 text-sm text-gray-600">{desc}</p>
  </motion.div>
);

export default Login;