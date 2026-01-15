import React, { useState, useEffect } from "react";
import { User, Mail, MapPin, Hash, Activity, Calendar } from "lucide-react";
import PatientNavbar from "../sharedFile/PatientNavbar";

const PatientProfile: React.FC = () => {
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchProfile = async () => {
    if (!token) return;
    try {
      const res = await fetch("http://127.0.0.1:8000/api/me/patient", {
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
      console.error("Error fetching patient profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-[#E9F2FA] pt-28 pb-10">
      <PatientNavbar />
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-[#1A2E44] p-2 rounded-xl text-white shadow-lg">
            <User size={24} />
          </div>
          <h1 className="text-2xl font-bold text-[#1A2E44]">My Profile</h1>
        </div>

        {loading ? (
          <div className="flex justify-center p-20 text-gray-500 animate-pulse">Loading profile...</div>
        ) : profileData ? (
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border-b-4 border-blue-500">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center text-[#1A2E44] border-2 border-blue-100 shadow-inner">
                  <User size={48} />
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-extrabold text-[#1A2E44]">{profileData.user.name}</h2>
                  <p className="text-blue-500 font-medium uppercase tracking-wider text-sm">{profileData.user.role}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem 
                icon={<Mail className="text-blue-500" />} 
                label="Email" 
                value={profileData.user.email} 
              />
              <InfoItem 
                icon={<Hash className="text-purple-500" />} 
                label="National Number" 
                value={profileData.profile.national_number} 
              />
              <InfoItem 
                icon={<MapPin className="text-red-500" />} 
                label="Location" 
                value={profileData.profile.location} 
              />
              <InfoItem 
                icon={<Calendar className="text-green-500" />} 
                label="Joined Date" 
                value={new Date(profileData.profile.created_at).toLocaleDateString()} 
              />
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4 text-[#1A2E44] font-bold">
                <Activity size={20} className="text-orange-500" />
                <h3>Chronic Conditions</h3>
              </div>
              <p className="text-gray-600 bg-orange-50/50 p-4 rounded-2xl border border-orange-100 italic">
                {profileData.profile.chronic_conditions || "No chronic conditions reported."}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center p-10 bg-white rounded-3xl">No data found</div>
        )}
      </div>
    </div>
  );
};
const InfoItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-50 flex items-center gap-4 hover:shadow-md transition">
    <div className="p-3 bg-gray-50 rounded-xl">{icon}</div>
    <div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-sm font-bold text-[#1A2E44]">{value}</p>
    </div>
  </div>
);

export default PatientProfile;