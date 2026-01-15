import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Appointment {
  id: number;
  appointment_date: string;
  appointment_time: string;
  status: "pending" | "confirmed";
  doctor: {
    doctor_id: number;
    name: string;
  };
  patient: {
    patient_id: number;
    name: string;
  };
}
type TabType = "pending" | "approved";

const Appointments: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("pending");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedForPrescription, setSelectedForPrescription] = useState<Appointment | null>(null);

  const [formData, setFormData] = useState({
    right_sphere: "", right_cylinder: "", right_axis: "",
    left_sphere: "", left_cylinder: "", left_axis: "",
    dosage: "", medication_name: "", effective_period: ""
  });

  const token = localStorage.getItem("token");

  const fetchAppointments = async (tab: TabType) => {
    if (!token) return;
    setLoading(true);
    const url = tab === "pending" 
      ? "http://127.0.0.1:8000/api/appointments/pending" 
      : "http://127.0.0.1:8000/api/appointments/approved";

    try {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (result.status === "success") {
        setAppointments(result.data);
      } else {
        setAppointments([]);
      }
    } catch {
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments(activeTab);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const updateAppointmentStatus = async (id: number, action: "approve" | "reject") => {
    if (!token) return;
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/appointments/${id}/${action}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setAppointments((prev) => prev.filter((a) => a.id !== id));
        toast.success(action === "approve" ? "Appointment approved" : "Appointment rejected");
      }
    } catch {
      toast.error("Error updating status");
    }
  };

  const handleCreatePrescription = async () => {
    if (!selectedForPrescription || !token) return;
    try {
      const response = await fetch("http://127.0.0.1:8000/api/prescriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          patient_profile_id: selectedForPrescription.patient.patient_id,
          doctor_id: selectedForPrescription.doctor.doctor_id,
        }),
      });

      if (response.ok) {
        toast.success("Prescription added successfully");
        setShowPrescriptionModal(false);
      }
    } catch {
      toast.error("Failed to add prescription");
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <div className="flex gap-4 mb-6 border-b pb-2">
        {(["pending", "approved"] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-semibold ${activeTab === tab ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {loading ? <p>Loading...</p> : (
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="p-3">Patient</th>
              <th className="p-3">Date</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a.id} className="border-b">
                <td className="p-3 font-medium">{a.patient.name}</td>
                <td className="p-3">{a.appointment_date}</td>
                <td className="p-3 text-center">
                  {activeTab === "pending" ? (
                    <div className="flex gap-2 justify-center">
                      <button onClick={() => updateAppointmentStatus(a.id, "approve")} className="bg-green-600 text-white px-4 py-1 rounded-full text-sm">Approve</button>
                      <button onClick={() => updateAppointmentStatus(a.id, "reject")} className="bg-red-600 text-white px-4 py-1 rounded-full text-sm">Reject</button>
                    </div>
                  ) : (
                     <p className="text-green-500">Approved</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showPrescriptionModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-4">Add Prescription</h3>
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="Right Sphere" onChange={(e) => setFormData({...formData, right_sphere: e.target.value})} className="border p-2 rounded" />
              <input placeholder="Right Cylinder" onChange={(e) => setFormData({...formData, right_cylinder: e.target.value})} className="border p-2 rounded" />
              <input placeholder="Left Sphere" onChange={(e) => setFormData({...formData, left_sphere: e.target.value})} className="border p-2 rounded" />
              <input placeholder="Left Cylinder" onChange={(e) => setFormData({...formData, left_cylinder: e.target.value})} className="border p-2 rounded" />
            </div>
            <input placeholder="Medication Name" onChange={(e) => setFormData({...formData, medication_name: e.target.value})} className="border p-2 rounded w-full mt-3" />
            <input placeholder="Dosage" onChange={(e) => setFormData({...formData, dosage: e.target.value})} className="border p-2 rounded w-full mt-3" />
            <div className="flex justify-end gap-3 mt-5">
              <button onClick={() => setShowPrescriptionModal(false)} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
              <button onClick={handleCreatePrescription} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;