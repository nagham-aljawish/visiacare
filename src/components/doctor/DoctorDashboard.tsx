import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Stethoscope, Home, X, PlusCircle, Eye } from "lucide-react";
import DoctorAvailability from "./DoctorAvailability";
import Appointments from "./Appointments";
import DoctorProfile from "./DoctorProfile";

const DoctorDashboard: React.FC = () => {
  const [active, setActive] = useState("patients");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await fetch("http://127.0.0.1:8000/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex flex-col sm:flex-row bg-[#DDE9F7] text-[#1A2E44]">
      <aside className="w-full sm:w-64 bg-[#0D1B2A] text-white flex flex-col p-6 space-y-6 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <Stethoscope className="w-8 h-8" />
          <h2 className="text-2xl font-semibold">Doctor Panel</h2>
        </div>
        <nav className="flex flex-col space-y-2">
          <SidebarBtn label="Patients" active={active} setActive={setActive} />
          <SidebarBtn label="Appointments" active={active} setActive={setActive} />
          <SidebarBtn label="Doctor Availability" active={active} setActive={setActive} />
          <SidebarBtn label="Notifications" active={active} setActive={setActive} />
          <SidebarBtn label="Profile" active={active} setActive={setActive} />
          <hr className="border-white/20 my-4" />
          <button onClick={() => navigate("/doctor-home")} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 w-full">
            <Home className="w-5 h-5" /> Back to Home
          </button>
          <button onClick={handleLogout} className="text-left px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 w-full">
            Logout
          </button>
        </nav>
      </aside>
      <main className="flex-1 min-h-screen flex flex-col">
        <div className="flex-1 p-6 sm:p-10 overflow-y-auto">
          {active === "patients" && <Patients />}
          {active === "appointments" && <Appointments />}
          {active === "notifications" && <Notifications />}
          {active === "doctor availability" && <DoctorAvailability />}
          {active === "profile" && <DoctorProfile />}
        </div>
      </main>
    </div>
  );
};

const SidebarBtn = ({ label, active, setActive }: { label: string; active: string; setActive: (val: string) => void }) => (
  <button onClick={() => setActive(label.toLowerCase())} className={`px-4 py-2 rounded-lg text-left transition ${active === label.toLowerCase() ? "bg-white/20 font-medium" : "hover:bg-white/10"}`}>
    {label}
  </button>
);

const Patients = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    right_sphere: "", right_cylinder: "", right_axis: "",
    left_sphere: "", left_cylinder: "", left_axis: "",
    dosage: "", medication_name: "", effective_period: ""
  });

  const token = localStorage.getItem("token");

  const fetchApprovedPatients = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/appointments/approved", {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
      });
      const result = await res.json();
      if (result.status === "success" && Array.isArray(result.data)) {
        setPatients(result.data);
      }
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchApprovedPatients(); }, []);

  const handleViewPrescriptions = async (patientId: number) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/my-prescriptions/${patientId}`, {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
      });
      const result = await res.json();
      setPrescriptions(Array.isArray(result.data) ? result.data : []);
      setSelectedPatient(patientId);
    } catch (err) { console.error(err); }
  };

  const handleAddPrescription = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        doctor_id: 4,
        patient_profile_id: selectedPatient,
        right_sphere: formData.right_sphere ? parseFloat(formData.right_sphere) : null,
        right_cylinder: formData.right_cylinder ? parseFloat(formData.right_cylinder) : null,
        right_axis: formData.right_axis ? parseInt(formData.right_axis) : null,
        left_sphere: formData.left_sphere ? parseFloat(formData.left_sphere) : null,
        left_cylinder: formData.left_cylinder ? parseFloat(formData.left_cylinder) : null,
        left_axis: formData.left_axis ? parseInt(formData.left_axis) : null,
        dosage: formData.dosage,
        medication_name: formData.medication_name,
        effective_period: formData.effective_period
      };

      const res = await fetch("http://127.0.0.1:8000/api/prescriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setShowAddModal(false);
        handleViewPrescriptions(selectedPatient);
        setFormData({
          right_sphere: "", right_cylinder: "", right_axis: "",
          left_sphere: "", left_cylinder: "", left_axis: "",
          dosage: "", medication_name: "", effective_period: ""
        });
      }
    } catch (err) { console.error(err); }
  };

  return (
    <Section title="Patients List (Approved)">
      <div className="bg-white rounded-xl overflow-hidden shadow">
        <table className="w-full">
          <thead>
            <tr className="bg-[#EAF2FA]">
              <th className="p-4 text-left">Patient Name</th>
              <th className="p-4 text-left">Appointment Date</th>
              <th className="p-4 text-left">Appointment Time</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((item: any) => (
              <tr key={item.id} className="border-b hover:bg-gray-50 transition">
                <td className="p-4 font-medium">{item.patient.name}</td>
                <td className="p-4">{item.appointment_date}</td>
                <td className="p-4">{item.appointment_time}</td>
                <td className="p-4 flex justify-center gap-2">
                  <button onClick={() => handleViewPrescriptions(item.patient.patient_id)} className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"><Eye size={18} /></button>
                  <button onClick={() => { setSelectedPatient(item.patient.patient_id); setShowAddModal(true); }} className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200"><PlusCircle size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {selectedPatient && !showAddModal && (
          <Modal title="Medical Record" onClose={() => setSelectedPatient(null)}>
            <div className="space-y-4">
              {prescriptions.length > 0 ? prescriptions.map((pre: any) => (
                <div key={pre.id} className="p-4 border rounded-lg bg-gray-50 shadow-sm">
                  <div className="flex justify-between border-b pb-2 mb-2">
                    <span className="font-bold text-blue-800">{pre.medication_name}</span>
                    <span className="text-xs text-gray-500">{new Date(pre.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[10px] mb-2">
                    <div className="bg-blue-50 p-1 rounded"><strong>R:</strong> S:{pre.right_sphere} C:{pre.right_cylinder} A:{pre.right_axis}</div>
                    <div className="bg-green-50 p-1 rounded"><strong>L:</strong> S:{pre.left_sphere} C:{pre.left_cylinder} A:{pre.left_axis}</div>
                  </div>
                  <p className="text-xs"><strong>Dosage:</strong> {pre.dosage}</p>
                  <p className="text-xs"><strong>Period:</strong> {pre.effective_period || "N/A"}</p>
                </div>
              )) : <p className="text-center text-gray-500">No prescriptions found.</p>}
            </div>
          </Modal>
        )}

        {showAddModal && (
          <Modal title="New Prescription" onClose={() => setShowAddModal(false)}>
            <form onSubmit={handleAddPrescription} className="space-y-3">
              <div className="grid grid-cols-3 gap-2 p-2 bg-blue-50 rounded-lg">
                <h4 className="col-span-3 text-[10px] font-bold text-blue-700">Right Eye</h4>
                <input type="number" step="0.01" placeholder="Sphere" className="p-1.5 border rounded text-xs" onChange={(e)=>setFormData({...formData, right_sphere: e.target.value})} />
                <input type="number" step="0.01" placeholder="Cylinder" className="p-1.5 border rounded text-xs" onChange={(e)=>setFormData({...formData, right_cylinder: e.target.value})} />
                <input type="number" placeholder="Axis" className="p-1.5 border rounded text-xs" onChange={(e)=>setFormData({...formData, right_axis: e.target.value})} />
              </div>
              <div className="grid grid-cols-3 gap-2 p-2 bg-green-50 rounded-lg">
                <h4 className="col-span-3 text-[10px] font-bold text-green-700">Left Eye</h4>
                <input type="number" step="0.01" placeholder="Sphere" className="p-1.5 border rounded text-xs" onChange={(e)=>setFormData({...formData, left_sphere: e.target.value})} />
                <input type="number" step="0.01" placeholder="Cylinder" className="p-1.5 border rounded text-xs" onChange={(e)=>setFormData({...formData, left_cylinder: e.target.value})} />
                <input type="number" placeholder="Axis" className="p-1.5 border rounded text-xs" onChange={(e)=>setFormData({...formData, left_axis: e.target.value})} />
              </div>
              <input required placeholder="Medication Name" className="w-full p-2 border rounded text-sm" onChange={(e)=>setFormData({...formData, medication_name: e.target.value})} />
              <input required placeholder="Dosage" className="w-full p-2 border rounded text-sm" onChange={(e)=>setFormData({...formData, dosage: e.target.value})} />
              <input placeholder="Effective Period" className="w-full p-2 border rounded text-sm" onChange={(e)=>setFormData({...formData, effective_period: e.target.value})} />
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700">Save</button>
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </Section>
  );
};

const Notifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/notifications/my", {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
    })
    .then(res => res.json())
    .then(res => {
      if (res.success && Array.isArray(res.data)) {
        setNotifications(res.data);
      }
    })
    .catch(err => console.error(err));
  }, []);

  return (
    <Section title="Notifications">
      <div className="space-y-3">
        {notifications.map((n: any) => (
          <div key={n.id} className="p-4 bg-white rounded-xl shadow border-l-4 border-blue-500">
            <h4 className="font-bold text-[#0D1B2A]">{n.title}</h4>
            <p className="text-sm text-gray-600">{n.message}</p>
            <span className="text-[10px] text-gray-400">{new Date(n.created_at).toLocaleString()}</span>
          </div>
        ))}
      </div>
    </Section>
  );
};

const Modal = ({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center bg-[#0D1B2A] text-white">
        <h3 className="font-bold text-sm">{title}</h3>
        <button onClick={onClose}><X size={18}/></button>
      </div>
      <div className="p-5 max-h-[80vh] overflow-y-auto">{children}</div>
    </motion.div>
  </div>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#CCDCE9] rounded-2xl shadow-lg p-6 mb-6">
    <h1 className="text-xl font-bold mb-4 text-[#0D1B2A]">{title}</h1>
    {children}
  </motion.div>
);

export default DoctorDashboard;