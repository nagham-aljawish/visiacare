import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PatientNavbar from "../sharedFile/PatientNavbar";

interface Prescription {
  id: number;
  medication_name: string;
  dosage: string;
  effective_period: string;
  right_sphere: number;
  right_cylinder: number;
  right_axis: number;
  left_sphere: number;
  left_cylinder: number;
  left_axis: number;
  created_at: string;
  doctor_name: string;
  patient_name: string;
}

const PatientPrescriptions: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const patient_profile_id = localStorage.getItem("patient_profile_id");

  useEffect(() => {
    const fetchPrescriptions = async () => {
      if (!token || !patient_profile_id) return;

      try {
        const res = await fetch(
          `http://127.0.0.1:8000/api/my-prescriptions/${patient_profile_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        const result = await res.json();
        
        if (result && Array.isArray(result.data)) {
          setPrescriptions(result.data);
        } else {
          setPrescriptions([]);
        }
      } catch (error) {
        toast.error("Failed to load prescriptions");
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, [token, patient_profile_id]);

  return (
    <div className="min-h-screen bg-[#E9F2FA] pt-28 pb-10">
      <PatientNavbar />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-[#1A2E44] mb-8 border-l-4 border-blue-600 pl-4">
          My Prescriptions
        </h1>

        {loading ? (
          <div className="flex justify-center p-10">
            <p className="text-gray-500 animate-pulse">Loading prescriptions...</p>
          </div>
        ) : prescriptions.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl shadow-sm text-center">
            <p className="text-gray-500 text-lg">No prescriptions found in your record.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {prescriptions.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100"
              >
                <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
                  <div>
                    <h2 className="font-bold text-xl text-blue-900 mb-1">
                      {p.medication_name}
                    </h2>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="font-semibold text-gray-800">Doctor:</span> {p.doctor_name}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="inline-block bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
                      {new Date(p.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 p-4 rounded-xl border border-blue-100">
                    <h3 className="text-xs font-bold text-blue-600 uppercase mb-3 tracking-wider">Right Eye (OD)</h3>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-[10px] text-gray-400">Sphere</p>
                        <p className="font-mono font-bold text-gray-800">{p.right_sphere || "0.00"}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400">Cylinder</p>
                        <p className="font-mono font-bold text-gray-800">{p.right_cylinder || "0.00"}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400">Axis</p>
                        <p className="font-mono font-bold text-gray-800">{p.right_axis || "0"}°</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl border border-green-100">
                    <h3 className="text-xs font-bold text-green-600 uppercase mb-3 tracking-wider">Left Eye (OS)</h3>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-[10px] text-gray-400">Sphere</p>
                        <p className="font-mono font-bold text-gray-800">{p.left_sphere || "0.00"}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400">Cylinder</p>
                        <p className="font-mono font-bold text-gray-800">{p.left_cylinder || "0.00"}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400">Axis</p>
                        <p className="font-mono font-bold text-gray-800">{p.left_axis || "0"}°</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-50">
                  <div className="flex-1 min-w-[200px]">
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Dosage Instruction</p>
                    <p className="text-sm text-gray-700">{p.dosage}</p>
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Effective Period</p>
                    <p className="text-sm text-gray-700">{p.effective_period || "Not specified"}</p>
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Medication Name</p>
                    <p className="text-sm text-gray-700">{p.medication_name || "Medication Name"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientPrescriptions;