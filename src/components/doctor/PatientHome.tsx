import React, { useState } from "react";
import DoctorNavbar from "../sharedFile/DoctorNavbar";
import { motion } from "framer-motion";

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
  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isAddingPrescription, setIsAddingPrescription] = useState(false);

  const filteredPatients = samplePatients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.includes(search)
  );

  return (
    <div className="min-h-screen bg-[#E9F2FA] flex flex-col">
      <DoctorNavbar />

      <div className="flex flex-col items-center flex-1 px-6 lg:px-20 pt-28 gap-8">
        {/* -------------------- جدول المرضى ---------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg"
        >
          <h1 className="text-2xl font-bold text-[#1A2E44] mb-4">Patients</h1>

          <input
            type="text"
            placeholder="Search by name or phone..."
            className="w-full border border-[#1A2E44]/30 rounded-lg px-4 py-2 mb-6 text-[#1A2E44] focus:outline-none focus:ring-2 focus:ring-[#1A2E44]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

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
                        onClick={() => {
                          setIsAddingPrescription(false);
                          setSelectedPatient(p);
                        }}
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

        {/* -------------------- ملف المريض ---------------------- */}
        {selectedPatient && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl bg-[#C6E2FF] p-6 rounded-2xl shadow-lg"
          >
            <div className="flex items-center gap-4">
              <img
                src="/images/DoctorIMG.jpg"
                alt="patient"
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h2 className="text-xl font-bold">{selectedPatient.name}</h2>
                <p>{selectedPatient.age} years</p>
                <p>#{selectedPatient.id}</p>
              </div>
            </div>

            {/* Medical History */}
            <div className="bg-[#D9EBFF] p-4 rounded-xl mt-6 shadow">
              <h3 className="font-semibold text-lg underline text-center mb-3">
                Medical History
              </h3>

              {!isAddingPrescription ? (
                <>
                  <p>
                    <strong>Diagnosis:</strong> Nearsightedness
                  </p>
                  <p>
                    <strong>Last Check:</strong> 3 months ago
                  </p>
                  <p>
                    <strong>Doctor Notes:</strong> Artificial tears 2× daily
                  </p>
                </>
              ) : (
                <>
                  <input
                    className="w-full my-2 p-2 rounded-lg"
                    placeholder="Diagnosis"
                  />
                  <input
                    className="w-full my-2 p-2 rounded-lg"
                    placeholder="Last Check"
                  />
                  <input
                    className="w-full my-2 p-2 rounded-lg"
                    placeholder="Doctor Notes"
                  />
                </>
              )}
            </div>

            {/* Last Glasses / Lens */}
            <div className="bg-[#D9EBFF] p-4 rounded-xl mt-6 shadow">
              <h3 className="font-semibold text-lg underline text-center mb-3">
                Last Glasses / Lens
              </h3>

              {/* Form */}
              <div className="grid grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-2">👁 Right</h4>
                  <input
                    className="w-full p-2 my-1 rounded-lg"
                    placeholder="Sphere"
                    defaultValue={!isAddingPrescription ? "-2.00" : ""}
                  />
                  <input
                    className="w-full p-2 my-1 rounded-lg"
                    placeholder="Cylinder"
                    defaultValue={!isAddingPrescription ? "-0.75" : ""}
                  />
                  <input
                    className="w-full p-2 my-1 rounded-lg"
                    placeholder="Add"
                    defaultValue={!isAddingPrescription ? "+0.75" : ""}
                  />
                  <input
                    className="w-full p-2 my-1 rounded-lg"
                    placeholder="Axis"
                    defaultValue={!isAddingPrescription ? "180" : ""}
                  />
                </div>

                <div>
                  <h4 className="font-semibold mb-2">👁 Left</h4>
                  <input
                    className="w-full p-2 my-1 rounded-lg"
                    placeholder="Sphere"
                    defaultValue={!isAddingPrescription ? "-1.75" : ""}
                  />
                  <input
                    className="w-full p-2 my-1 rounded-lg"
                    placeholder="Cylinder"
                    defaultValue={!isAddingPrescription ? "-0.50" : ""}
                  />
                  <input
                    className="w-full p-2 my-1 rounded-lg"
                    placeholder="Add"
                    defaultValue={!isAddingPrescription ? "+0.75" : ""}
                  />
                  <input
                    className="w-full p-2 my-1 rounded-lg"
                    placeholder="Axis"
                    defaultValue={!isAddingPrescription ? "170" : ""}
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="text-center mt-6">
              {!isAddingPrescription ? (
                <button
                  onClick={() => setIsAddingPrescription(true)}
                  className="bg-black text-white px-6 py-2 rounded-full"
                >
                  + Add New Prescription
                </button>
              ) : (
                <button className="bg-black text-white px-6 py-2 rounded-full">
                  Save Prescription
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PatientHome;
