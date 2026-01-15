import React, { useState, useEffect } from "react";
import { User, Store, MapPin, Clock, Mail, FileText } from "lucide-react";
import OpticalShopNavbar from "../sharedFile/OpticalShopNavbar";

const OpticalProfile: React.FC = () => {
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchProfile = async () => {
    if (!token) return;
    try {
      const res = await fetch("http://127.0.0.1:8000/api/me/optical-store", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const result = await res.json();

      if (result.status === "success") {
        setProfileData(result.data);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-[#E9F2FA] pt-12 pb-10">
      <OpticalShopNavbar />
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <User size={24} />
          </div>
          <h1 className="text-2xl font-bold text-[#1A2E44]">Store Profile</h1>
        </div>

        {loading ? (
          <div className="flex justify-center p-10">
            <p className="text-gray-500 animate-pulse">Loading profile information...</p>
          </div>
        ) : !profileData ? (
          <div className="bg-white p-12 rounded-2xl shadow-sm text-center">
            <p className="text-gray-500 text-lg">No profile data found.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border-b-4 border-blue-500 transition-all duration-300">
              <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 border border-blue-100">
                  <Store size={40} />
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-extrabold text-[#1A2E44]">
                    {profileData.profile.storeName}
                  </h2>
                  <p className="text-blue-500 font-medium">{profileData.user.role}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="text-blue-500 mt-1">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Email Address</p>
                    <p className="text-[#1A2E44] font-medium">{profileData.user.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="text-blue-500 mt-1">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Work Shift</p>
                    <p className="text-[#1A2E44] font-medium">{profileData.profile.shift}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="text-blue-500 mt-1">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Location</p>
                    <p className="text-[#1A2E44] font-medium">{profileData.profile.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="text-blue-500 mt-1">
                    <FileText size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Description</p>
                    <p className="text-[#1A2E44] font-medium">{profileData.profile.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OpticalProfile;