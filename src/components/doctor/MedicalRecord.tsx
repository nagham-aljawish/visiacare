import React, { useState } from "react";
import DoctorNavbar from "../sharedFile/DoctorNavbar";

const fields: Array<"sphere" | "cylinder" | "add" | "axis"> = [
  "sphere",
  "cylinder",
  "add",
  "axis",
];

interface Prescription {
  right: Record<string, string>;
  left: Record<string, string>;
}

const MedicalRecord: React.FC = () => {
  // 👇 البيانات الأساسية للمريض
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientPhone, setPatientPhone] = useState("");

  const [prescription, setPrescription] = useState<Prescription>({
    right: { sphere: "", cylinder: "", add: "", axis: "" },
    left: { sphere: "", cylinder: "", add: "", axis: "" },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // 👇 الثوابت (تغيرها حسب المستخدم الحالي)
  const doctor_id = 8;
  const patient_profile_id = 2;

  // 👇 دالة حفظ البيانات
  const saveRecord = async () => {
    setLoading(true);
    setMessage(null);

    const payload = {
      patient_profile_id,
      doctor_id,
      name: patientName || "No Name",
      description: "Eye exam",
      prescription,
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/api/medical-records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      const data = await res.json();
      setMessage("Record saved successfully!");
      setIsEditing(false);
      console.log("Saved record:", data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Error saving record:", err);
      setMessage("Error saving record: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#E9F2FA]">
      <DoctorNavbar />

      <div className="pt-28 px-6 lg:px-20 flex justify-center">
        <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-lg">
          {/* HEADER */}
          <div className="flex items-center gap-4 border-b pb-4">
            <img
              src="/images/DoctorIMG.jpg"
              alt="patient"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold text-[#1A2E44]">
                <input
                  className="border-b p-1"
                  placeholder="Patient Name"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  disabled={!isEditing}
                />
              </h2>
              <p className="text-gray-600">
                <input
                  className="border-b p-1 w-16"
                  placeholder="Age"
                  value={patientAge}
                  onChange={(e) => setPatientAge(e.target.value)}
                  disabled={!isEditing}
                />{" "}
                years old
              </p>
              <p className="text-gray-600">
                <input
                  className="border-b p-1 w-32"
                  placeholder="Phone"
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  disabled={!isEditing}
                />
              </p>
            </div>
          </div>

          {/* PRESCRIPTION */}
          <div className="mt-6 bg-[#EAF4FF] p-4 rounded-xl shadow">
            <h3 className="font-bold text-xl text-[#1A2E44] mb-3">
              Prescription
            </h3>
            <div className="grid grid-cols-2 gap-6">
              {["right", "left"].map((eye) => (
                <div key={eye}>
                  <h4 className="font-semibold text-lg mb-2">
                    {eye === "right" ? "👁 Right Eye" : "👁 Left Eye"}
                  </h4>
                  {fields.map((field) => (
                    <input
                      key={field}
                      className="w-full p-2 rounded-lg border my-1"
                      placeholder={field}
                      value={prescription[eye as "right" | "left"][field]}
                      onChange={(e) =>
                        setPrescription((prev) => ({
                          ...prev,
                          [eye]: {
                            ...prev[eye as "right" | "left"],
                            [field]: e.target.value,
                          },
                        }))
                      }
                      disabled={!isEditing}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* BUTTONS */}
          <div className="mt-6 text-center">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-[#1A2E44] text-white px-6 py-2 rounded-full"
              >
                + Add / Edit Prescription
              </button>
            ) : (
              <button
                onClick={saveRecord}
                disabled={loading}
                className="bg-green-600 text-white px-6 py-2 rounded-full"
              >
                {loading ? "Saving..." : "Save Prescription"}
              </button>
            )}
            {message && <p className="mt-2 text-sm text-red-500">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecord;
