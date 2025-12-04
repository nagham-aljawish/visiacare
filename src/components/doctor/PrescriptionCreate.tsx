import React, { useState } from "react";
import DoctorNavbar from "../sharedFile/DoctorNavbar";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";

const PrescriptionCreate: React.FC = () => {
  const { recordId } = useParams();
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const doctor_id = userData.id;

  // 👇 استخدام نفس مسميات الوصفة من كود MedicalRecord
  const [form, setForm] = useState({
    rightSphere: "",
    rightCylinder: "",
    rightAxis: "",
    leftSphere: "",
    leftCylinder: "",
    leftAxis: "",
    notes: "",
    medicationName: "",
    dosage: "",
    effectivePeriod: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const savePrescription = async () => {
    setLoading(true);
    setMessage(null);

    const payload = {
      doctor_id,
      medical_record_id: recordId,
      ...form,
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/api/medical-records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(await res.text());

      alert("Prescription Created Successfully!");
      navigate(`/medical-record/${recordId}`);
    } catch (error) {
      console.error(error);
      alert("Error creating prescription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#E9F2FA] flex flex-col">
      <DoctorNavbar />

      <div className="flex flex-col items-center flex-1 px-6 lg:px-20 pt-28">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-3xl bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/40"
        >
          <h1 className="text-3xl font-bold text-[#1A2E44] mb-6">
            Create Prescription
          </h1>

          {/* FORM */}
          <div className="space-y-6">
            {/* Right Eye */}
            <div>
              <h2 className="text-xl font-semibold text-[#1A2E44] mb-2">
                Right Eye 👁
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="number"
                  placeholder="Sphere"
                  className="p-3 border rounded-lg"
                  value={form.rightSphere}
                  onChange={(e) => handleChange("rightSphere", e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Cylinder"
                  className="p-3 border rounded-lg"
                  value={form.rightCylinder}
                  onChange={(e) =>
                    handleChange("rightCylinder", e.target.value)
                  }
                />
                <input
                  type="number"
                  placeholder="Axis"
                  className="p-3 border rounded-lg"
                  value={form.rightAxis}
                  onChange={(e) => handleChange("rightAxis", e.target.value)}
                />
              </div>
            </div>

            {/* Left Eye */}
            <div>
              <h2 className="text-xl font-semibold text-[#1A2E44] mb-2">
                Left Eye 👁
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="number"
                  placeholder="Sphere"
                  className="p-3 border rounded-lg"
                  value={form.leftSphere}
                  onChange={(e) => handleChange("leftSphere", e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Cylinder"
                  className="p-3 border rounded-lg"
                  value={form.leftCylinder}
                  onChange={(e) => handleChange("leftCylinder", e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Axis"
                  className="p-3 border rounded-lg"
                  value={form.leftAxis}
                  onChange={(e) => handleChange("leftAxis", e.target.value)}
                />
              </div>
            </div>

            {/* Notes */}
            <textarea
              className="w-full p-3 rounded-lg border my-1 mb-3"
              placeholder="Notes"
              value={form.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
            />

            {/* Medication */}
            <input
              type="text"
              className="w-full p-3 rounded-lg border my-1 mb-3"
              placeholder="Medication Name"
              value={form.medicationName}
              onChange={(e) => handleChange("medicationName", e.target.value)}
            />
            <input
              type="text"
              className="w-full p-3 rounded-lg border my-1 mb-3"
              placeholder="Dosage"
              value={form.dosage}
              onChange={(e) => handleChange("dosage", e.target.value)}
            />
            <input
              type="date"
              className="w-full p-3 rounded-lg border my-1"
              placeholder="Effective Period"
              value={form.effectivePeriod}
              onChange={(e) =>
                handleChange("effectivePeriod", e.target.value)
              }
            />
          </div>

          {/* Buttons */}
          <div className="mt-8 flex justify-between">
            <button
              onClick={() => navigate(`/medical-record/${recordId}`)}
              className="bg-gray-300 text-[#1A2E44] px-5 py-2 rounded-full shadow hover:bg-gray-400 transition"
            >
              Cancel
            </button>

            <button
              onClick={savePrescription}
              disabled={loading}
              className="bg-[#1A2E44] text-white px-6 py-2 rounded-full shadow hover:bg-[#16283b] transition"
            >
              {loading ? "Saving..." : "Save Prescription"}
            </button>
          </div>

          {message && (
            <p className="text-center mt-4 text-[#1A2E44] font-medium">
              {message}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PrescriptionCreate;
