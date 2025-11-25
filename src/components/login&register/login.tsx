import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import EyeLogo from "/src/assets/eye-svgrepo-com.svg";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

    if (!validateInputs()) return;

    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
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

      console.log("Login response:", data);
      console.log("Token:", data.token);
      console.log("Role:", data.role);

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      const role = data.role.toLowerCase();

      switch (role) {
        case "admin":
          navigate("/admin");
          break;
        case "doctor":
          navigate("/doctor-dashboard");
          break;
        case "patient":
          navigate("/patient-home");
          break;
        case "store":
          navigate("/store-dashboard");
          break;
        default:
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
            <label className="block text-[#1A2E44] mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              placeholder="example@gmail.com"
              className="w-full px-5 py-3 text-[15px] rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[#1A2E44] mb-1 font-medium">
              Password
            </label>
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

          {error && (
            <p className="text-red-600 text-sm text-center mt-2">{error}</p>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-[#1A2E44]/70" : "bg-[#1A2E44]"
            } text-white text-[15px] py-3 rounded-full font-medium hover:bg-[#16283b] transition`}
            whileTap={{ scale: 0.97 }}
          >
            {loading ? "Logging in..." : "LOGIN"}
          </motion.button>

          <p className="text-center text-[#1A2E44]/80 text-sm mt-1">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="underline font-medium hover:text-[#1A2E44]"
            >
              Create One
            </a>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
