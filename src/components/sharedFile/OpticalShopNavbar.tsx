import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ClipboardList, Bell, Menu, X, LogOut, CheckCircle, User } from "lucide-react"; 
import EyeLogo from "/src/assets/eye-svgrepo-com.svg";

const OpticalShopNavbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const navLinks = [
        { name: "Orders", path: "/store-orders", icon: ClipboardList },
        { name: "Inventory", path: "/store-inventory", icon: ShoppingBag },
        { name: "Accepted", path: "/accepted-orders", icon: CheckCircle },
    ];

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/");
    };

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1A2E44]/90 backdrop-blur-xl border-b border-white/10 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate("/")}>
                            <div className="relative">
                                <div className="absolute inset-0 bg-blue-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-full" />
                                <img
                                    src={EyeLogo}
                                    alt="VisiaCare Logo"
                                    className="w-8 h-8 relative z-10 transition-transform duration-500 group-hover:rotate-12"
                                    style={{ filter: "invert(100%)" }}
                                />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white tracking-wide">VisiaCare</h1>
                                <p className="text-[10px] text-blue-300 font-medium tracking-widest uppercase">Optical Partner</p>
                            </div>
                        </div>

                        <div className="hidden md:flex items-center gap-2">
                            <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/5 backdrop-blur-md">
                                {navLinks.map((link) => {
                                    const isActive = location.pathname === link.path;
                                    return (
                                        <Link
                                            key={link.path}
                                            to={link.path}
                                            className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${isActive ? "text-white" : "text-gray-400 hover:text-white"}`}
                                        >
                                            {isActive && (
                                                <motion.div
                                                    layoutId="navbar-indicator"
                                                    className="absolute inset-0 bg-[#3B82F6] rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                                                />
                                            )}
                                            <span className="relative z-10 flex items-center gap-2">
                                                <link.icon size={18} />
                                                {link.name}
                                            </span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="hidden md:flex items-center gap-4">
                            <button 
                                className="relative p-2 text-gray-400 hover:text-white transition-colors group"
                                onClick={() => navigate("/opticl-notifications")}
                            >
                                <Bell size={22} className="group-hover:rotate-12 transition-transform duration-300" />
                            </button>

                            <button 
                                className={`p-2 rounded-full transition-all duration-300 ${location.pathname === "/optical-profile" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white hover:bg-white/10"}`}
                                onClick={() => navigate("/optical-profile")}
                            >
                                <User size={22} />
                            </button>

                            <div className="flex items-center pl-4 border-l border-white/10">
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 px-3 py-2 text-red-400 hover:bg-red-500/10 transition-colors rounded-lg text-sm font-medium"
                                >
                                    <LogOut size={16} />
                                    Sign Out
                                </button>
                            </div>
                        </div>

                        <div className="md:hidden">
                            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-300">
                                {isOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-[#1A2E44] border-t border-white/10"
                        >
                            <div className="px-4 py-6 space-y-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className="px-4 py-3 rounded-xl text-base font-medium flex items-center gap-3 text-gray-400 hover:bg-white/5"
                                    >
                                        <link.icon size={20} />
                                        {link.name}
                                    </Link>
                                ))}
                                <Link
                                    to="/profile"
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-3 rounded-xl text-base font-medium flex items-center gap-3 text-gray-400 hover:bg-white/5"
                                >
                                    <User size={20} />
                                    My Profile
                                </Link>
                                <div className="pt-4 border-t border-white/10 mt-4">
                                    <button onClick={handleLogout} className="w-full px-4 py-3 rounded-xl text-red-400 flex items-center gap-3">
                                        <LogOut size={20} />
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
            <div className="h-24" />
        </>
    );
};

export default OpticalShopNavbar;