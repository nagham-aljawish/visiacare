import React, { useState } from "react";
import DoctorNavbar from "../sharedFile/DoctorNavbar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// نموذج بيانات المرضى
interface Patient {
  id: number;
  name: string;
  age: number;
  phone: string;
}

const samplePatients: Patient[] = [
  { id: 1, name: "Ahmad Ali", age: 25, phone: "0938609902" },
  { id: 2, name: "Sara Mohammed", age: 32, phone: "0944429087" },
  { id: 3, name: "Amr Khaled", age: 40, phone: "0999599944" },
  { id: 4, name: "Layla Omar", age: 28, phone: "0938609802" },
];

const PatientHome: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // فلترة المرضى حسب البحث
  const filteredPatients = samplePatients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.includes(search)
  );

  return (
    <div className="min-h-screen bg-[#E9F2FA] flex flex-col">
      <DoctorNavbar />

      <div className="flex flex-col items-center flex-1 px-6 lg:px-20 pt-28 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg"
        >
          <h1 className="text-2xl font-bold text-[#1A2E44] mb-4">Patients</h1>

          {/* حقل البحث */}
          <input
            type="text"
            placeholder="Search by name or phone..."
            className="w-full border border-[#1A2E44]/30 rounded-lg px-4 py-2 mb-6 text-[#1A2E44] focus:outline-none focus:ring-2 focus:ring-[#1A2E44]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* جدول المرضى */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[#1A2E44]">
              <thead>
                <tr className="bg-[#EAF2FA] text-left">
                  <th className="p-3">Name</th>
                  <th className="p-3">Age</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b hover:bg-[#F9FBFD] transition"
                  >
                    <td className="p-3 font-medium">{p.name}</td>
                    <td className="p-3 font-medium">{p.age}</td>
                    <td className="p-3 font-medium">{p.phone}</td>
                    <td className="p-3 flex justify-center">
                      <button
                        onClick={() => navigate(`/patient/${p.id}`)}
                        className="bg-[#1A2E44] text-white px-4 py-1.5 rounded-full text-sm hover:bg-[#16283b] transition"
                      >
                        View File
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredPatients.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-6 text-gray-500">
                      No patients found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PatientHome;
