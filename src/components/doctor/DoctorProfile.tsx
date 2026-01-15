import React, { useState, useEffect } from "react";
import { 
  User, 
  Mail, 
  MapPin, 
  Award, 
  BookOpen, 
  Calendar as CalendarIcon, 
  ShieldCheck,
  ArrowRight
} from "lucide-react";

const DoctorProfile: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchProfile = async () => {
    if (!token) return;
    try {
      const res = await fetch("http://127.0.0.1:8000/api/me/doctor", {
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
      console.error("Error fetching doctor profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-[#E9F2FA] pb-10 px-4">
      <div className="max-w-4xl mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-20 bg-white rounded-3xl shadow-sm">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 animate-pulse font-medium">Loading your profile...</p>
          </div>
        ) : profileData ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl p-8 shadow-sm border-b-4 border-blue-600 flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center border-4 border-white shadow-md">
                    <User size={60} className="text-blue-600" />
                  </div>
                </div>
                
                <h2 className="text-xl font-extrabold text-[#1A2E44] mb-1">
                  {profileData.user.name}
                </h2>
                <span className="bg-blue-50 text-blue-600 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6">
                  {profileData.user.role}
                </span>

                <div className="w-full pt-6 border-t border-gray-50 space-y-4">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                        <CalendarIcon size={16} className="text-blue-400" />
                        <span>Joined {new Date(profileData.profile.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                        <ShieldCheck size={16} className="text-green-500" />
                        <span>Verified Medical Doctor</span>
                    </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <h3 className="text-lg font-bold text-[#1A2E44] mb-6 flex items-center gap-2">
                    <ArrowRight size={18} className="text-blue-600" />
                    Professional Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InfoCard 
                    icon={<Mail size={20} />} 
                    label="Email Address" 
                    value={profileData.user.email} 
                    color="text-blue-600"
                  />
                  <InfoCard 
                    icon={<Award size={20} />} 
                    label="Medical License" 
                    value={profileData.profile.license} 
                    color="text-yellow-600"
                  />
                  <div className="md:col-span-2">
                    <InfoCard 
                        icon={<MapPin size={20} />} 
                        label="Work Location" 
                        value={profileData.profile.location} 
                        color="text-red-500"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                </div>
                <h3 className="text-lg font-bold text-[#1A2E44] mb-4 flex items-center gap-2">
                    <BookOpen size={18} className="text-blue-600" />
                    Doctor's Bio
                </h3>
                <p className="text-[#1A2E44] leading-relaxed italic bg-blue-50/50 p-6 rounded-2xl border border-blue-50 shadow-inner">
                  "{profileData.profile.bio}"
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-12 rounded-3xl text-center shadow-sm">
            <p className="text-gray-500 italic">No profile data could be retrieved.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const InfoCard = ({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string, color: string }) => (
  <div className="group bg-gray-50 hover:bg-white hover:shadow-md hover:border-blue-100 border border-transparent p-5 rounded-2xl transition-all duration-300">
    <div className={`${color} mb-3 group-hover:scale-110 transition-transform duration-300`}>
      {icon}
    </div>
    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-sm font-bold text-[#1A2E44] break-words">{value}</p>
  </div>
);

export default DoctorProfile;