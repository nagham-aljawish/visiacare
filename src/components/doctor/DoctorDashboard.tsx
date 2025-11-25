import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  CalendarDays,
  FileText,
  Users,
  Stethoscope,
  Home,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const DoctorDashboard: React.FC = () => {
  const [active, setActive] = useState("dashboard");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col sm:flex-row bg-[#DDE9F7] text-[#1A2E44]">
      {/* Sidebar */}
      <aside className="w-full sm:w-64 bg-[#0D1B2A] text-white flex flex-col p-6 space-y-6 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <Stethoscope className="w-8 h-8" />
          <h2 className="text-2xl font-semibold">Doctor Panel</h2>
        </div>

        <nav className="flex flex-col space-y-2">
          <SidebarBtn label="Dashboard" active={active} setActive={setActive} />
          <SidebarBtn label="Patients" active={active} setActive={setActive} />
          <SidebarBtn
            label="Appointments"
            active={active}
            setActive={setActive}
          />
          <SidebarBtn
            label="Medical Records"
            active={active}
            setActive={setActive}
          />
          <SidebarBtn
            label="Notifications"
            active={active}
            setActive={setActive}
          />
          <SidebarBtn label="Profile" active={active} setActive={setActive} />
          <SidebarBtn label="Settings" active={active} setActive={setActive} />

          <hr className="border-white/20 my-4" />

          <button
            onClick={() => navigate("/doctor-home")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 w-full"
          >
            <Home className="w-5 h-5" /> Back to Home
          </button>

          <button className="text-left px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 w-full">
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen flex flex-col">
        {/* Dashboard Content */}
        <div className="flex-1 p-6 sm:p-10 overflow-y-auto">
          {active === "dashboard" && <DoctorDashboardHome />}
          {active === "patients" && <Patients />}
          {active === "appointments" && <Appointments />}
          {active === "medical records" && <MedicalRecords />}
          {active === "notifications" && <Notifications />}
          {active === "profile" && <Profile />}
          {active === "settings" && <SettingsPage />}
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;

/* Sidebar button */
const SidebarBtn = ({
  label,
  active,
  setActive,
}: {
  label: string;
  active: string;
  setActive: (val: string) => void;
}) => (
  <button
    onClick={() => setActive(label.toLowerCase())}
    className={`px-4 py-2 rounded-lg text-left transition ${
      active === label.toLowerCase()
        ? "bg-white/20 font-medium"
        : "hover:bg-white/10"
    }`}
  >
    {label}
  </button>
);

/* ===== Dashboard Home ===== */
const DoctorDashboardHome = () => (
  <>
    <h1 className="text-3xl font-bold mb-6 text-[#0D1B2A]">Doctor Dashboard</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard title="Patients" value={58} icon={<Users />} />
      <StatCard title="Appointments Today" value={12} icon={<CalendarDays />} />
      <StatCard title="Pending Reports" value={7} icon={<FileText />} />
      <StatCard title="Notifications" value={3} icon={<Bell />} />
    </div>
  </>
);

const StatCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className="shadow-lg rounded-xl p-6 text-center bg-[#CCDCE9]"
  >
    <div className="flex justify-center mb-2 text-[#1A2E44]">{icon}</div>
    <p className="text-[#1A2E44]/70 text-sm">{title}</p>
    <h2 className="text-2xl font-bold text-[#1A2E44] mt-1">{value}</h2>
  </motion.div>
);

/* ===== Dummy Data Sections ===== */
const Patients = () => {
  const patients = [
    { id: 1, name: "Ahmad Khaled", age: 32, gender: "Male" },
    { id: 2, name: "Sara Youssef", age: 27, gender: "Female" },
    { id: 3, name: "Omar Ali", age: 45, gender: "Male" },
  ];
  return (
    <Section title="Patients List">
      <table className="w-full">
        <thead>
          <tr className="bg-[#EAF2FA]">
            <th className="p-3">Name</th>
            <th className="p-3">Age</th>
            <th className="p-3">Gender</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p.id} className="border-b hover:bg-[#F9FBFD] transition">
              <td className="p-3 font-medium">{p.name}</td>
              <td className="p-3">{p.age}</td>
              <td className="p-3">{p.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  );
};

const Appointments = () => {
  const data = [
    { id: 1, name: "Ahmad Khaled", time: "10:00 AM", status: "Upcoming" },
    { id: 2, name: "Maya Ali", time: "12:30 PM", status: "Upcoming" },
    { id: 3, name: "Rami Youssef", time: "03:00 PM", status: "Completed" },
  ];
  return (
    <Section title="Appointments">
      <table className="w-full">
        <thead>
          <tr className="bg-[#EAF2FA]">
            <th className="p-3">Patient</th>
            <th className="p-3">Time</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className="border-b hover:bg-[#F9FBFD] transition"
            >
              <td className="p-3 font-medium">{item.name}</td>
              <td className="p-3">{item.time}</td>
              <td className="p-3">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  );
};

const MedicalRecords = () => {
  const records = [
    { id: 1, name: "Ahmad Khaled", report: "Eye dryness & redness" },
    { id: 2, name: "Sara Youssef", report: "Myopia -1.00" },
    { id: 3, name: "Omar Ali", report: "Follow-up needed" },
  ];
  return (
    <Section title="Medical Records">
      <ul className="space-y-3">
        {records.map((r) => (
          <li key={r.id} className="p-4 bg-white rounded-xl shadow">
            <p className="font-bold">{r.name}</p>
            <p className="text-sm text-gray-600">{r.report}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
};

const Notifications = () => {
  const notifications = [
    "New appointment booked with Rana.",
    "Medical report updated for Ahmad.",
    "Reminder: Meeting at 5 PM.",
  ];
  return (
    <Section title="Notifications">
      <ul className="space-y-3">
        {notifications.map((n, i) => (
          <li key={i} className="p-4 bg-white rounded-xl shadow">
            {n}
          </li>
        ))}
      </ul>
    </Section>
  );
};

const Profile = () => {
  const doctor = {
    name: "Dr. Ali Hassan",
    specialization: "Ophthalmologist",
    email: "doctor@example.com",
    phone: "+963 991 234 567",
  };
  return (
    <Section title="Profile">
      <p>
        <strong>Name:</strong> {doctor.name}
      </p>
      <p>
        <strong>Specialization:</strong> {doctor.specialization}
      </p>
      <p>
        <strong>Email:</strong> {doctor.email}
      </p>
      <p>
        <strong>Phone:</strong> {doctor.phone}
      </p>
    </Section>
  );
};

const SettingsPage = () => (
  <Section title="Settings">
    <p>System preferences and general settings will be here.</p>
  </Section>
);

/* ===== Wrapper Section Component ===== */
const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-[#CCDCE9] rounded-2xl shadow-xl p-6"
  >
    <h1 className="text-2xl font-bold mb-4 text-[#0D1B2A]">{title}</h1>
    {children}
  </motion.div>
);
