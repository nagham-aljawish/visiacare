import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Loader2, Bell, Stethoscope, Briefcase } from "lucide-react";
import EyeLogo from "/src/assets/eye-svgrepo-com.svg";

interface UserItem {
  id: number;
  name: string;
  phone_number: string;
  gender: string;
  email: string;
  status: string;
  created_at: string;
  updated_at: string;
  type?: string;
}

interface Item {
  id: number;
  name: string;
  email: string;
  status: "pending" | "approved" | "rejected";
  type: "doctor" | "optical";
  specialization?: string;
}

type Section = "dashboard" | "users" | "notifications";
type FilterType = "all" | "pending" | "approved" | "rejected";

const AdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>("dashboard");

  const [pendingDoctors, setPendingDoctors] = useState<Item[]>([]);
  const [pendingOpticals, setPendingOpticals] = useState<Item[]>([]);
  const [approvedDoctors, setApprovedDoctors] = useState<Item[]>([]);
  const [approvedOpticals, setApprovedOpticals] = useState<Item[]>([]);
  const [rejectedDoctors, setRejectedDoctors] = useState<Item[]>([]);
  const [rejectedOpticals, setRejectedOpticals] = useState<Item[]>([]);

  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return console.error("No admin token found");

    const loadAll = async () => {
      setLoading(true);
      try {
        const urls = [
          "doctors/pending",
          "opticals/pending",
          "doctors/approved",
          "opticals/approved",
          "doctors/rejected",
          "opticals/rejected",
        ].map((path) => `http://127.0.0.1:8000/api/admin/${path}`);

        const responses = await Promise.all(
          urls.map((url) =>
            fetch(url, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
          )
        );

        const data = await Promise.all(responses.map((res) => res.json()));
        setPendingDoctors(
          (data[0].data ?? []).map((u: UserItem) => ({
            ...u,
            type: "doctor",
          }))
        );

        setPendingOpticals(
          (data[1].data ?? []).map((u: UserItem) => ({
            ...u,
            type: "optical",
          }))
        );

        setApprovedDoctors(
          (data[2].data ?? []).map((u: UserItem) => ({
            ...u,
            type: "doctor",
          }))
        );

        setApprovedOpticals(
          (data[3].data ?? []).map((u: UserItem) => ({
            ...u,
            type: "optical",
          }))
        );

        setRejectedDoctors(
          (data[4].data ?? []).map((u: UserItem) => ({
            ...u,
            type: "doctor",
          }))
        );

        setRejectedOpticals(
          (data[5].data ?? []).map((u: UserItem) => ({
            ...u,
            type: "optical",
          }))
        );
      } catch (err) {
        console.error("API Load Error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadAll();
  }, [token]);

  // Approve user
  // Approve user
  const approve = (id: number, type: "doctor" | "optical") => {
    if (type === "doctor") {
      const user =
        pendingDoctors.find((d) => d.id === id) ||
        rejectedDoctors.find((d) => d.id === id);
      if (!user) return;
      // إزالة من القوائم السابقة
      setPendingDoctors((prev) => prev.filter((d) => d.id !== id));
      setRejectedDoctors((prev) => prev.filter((d) => d.id !== id));
      // إضافته لقائمة approved
      setApprovedDoctors((prev) => [...prev, { ...user, status: "approved" }]);
    } else {
      const user =
        pendingOpticals.find((o) => o.id === id) ||
        rejectedOpticals.find((o) => o.id === id);
      if (!user) return;
      setPendingOpticals((prev) => prev.filter((o) => o.id !== id));
      setRejectedOpticals((prev) => prev.filter((o) => o.id !== id));
      setApprovedOpticals((prev) => [...prev, { ...user, status: "approved" }]);
    }
  };

  // Reject user
  const reject = (id: number, type: "doctor" | "optical") => {
    if (type === "doctor") {
      const user =
        pendingDoctors.find((d) => d.id === id) ||
        approvedDoctors.find((d) => d.id === id);
      if (!user) return;
      // إزالة من القوائم السابقة
      setPendingDoctors((prev) => prev.filter((d) => d.id !== id));
      setApprovedDoctors((prev) => prev.filter((d) => d.id !== id));
      // إضافته لقائمة rejected
      setRejectedDoctors((prev) => [...prev, { ...user, status: "rejected" }]);
    } else {
      const user =
        pendingOpticals.find((o) => o.id === id) ||
        approvedOpticals.find((o) => o.id === id);
      if (!user) return;
      setPendingOpticals((prev) => prev.filter((o) => o.id !== id));
      setApprovedOpticals((prev) => prev.filter((o) => o.id !== id));
      setRejectedOpticals((prev) => [...prev, { ...user, status: "rejected" }]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col sm:flex-row bg-[#DDE9F7] text-[#1A2E44]">
      {/* Sidebar */}
      <aside className="w-full sm:w-64 bg-[#0D1B2A] text-white flex flex-col p-6 space-y-6 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <img src={EyeLogo} alt="VisaCare" className="w-8 h-8 invert" />
          <h2 className="text-2xl font-semibold">VisaCare</h2>
        </div>
        <nav className="flex flex-col space-y-2">
          <SidebarBtn
            active={activeSection === "dashboard"}
            label="Dashboard"
            onClick={() => setActiveSection("dashboard")}
          />
          <SidebarBtn
            active={activeSection === "users"}
            label="Users"
            onClick={() => setActiveSection("users")}
          />
          <SidebarBtn
            active={activeSection === "notifications"}
            label="Notifications"
            onClick={() => setActiveSection("notifications")}
          />
          <hr className="border-white/20 my-4" />
          <button className="text-left px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 w-full">
            Logout
          </button>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 min-h-screen p-4 sm:p-10 overflow-y-auto bg-[#A8CFEB]">
        {activeSection === "dashboard" && (
          <>
            <DashboardCards
              doctors={
                approvedDoctors.length +
                pendingDoctors.length +
                rejectedDoctors.length
              }
              stores={
                approvedOpticals.length +
                pendingOpticals.length +
                rejectedOpticals.length
              }
              pending={pendingDoctors.length + pendingOpticals.length}
              notifications={0}
            />
            <PendingRequestsTable
              users={[...pendingDoctors, ...pendingOpticals]}
              approve={approve}
              reject={reject}
            />
          </>
        )}

        {activeSection === "users" && (
          <UsersSection
            loading={loading}
            pendingDoctors={pendingDoctors}
            pendingOpticals={pendingOpticals}
            approvedDoctors={approvedDoctors}
            approvedOpticals={approvedOpticals}
            rejectedDoctors={rejectedDoctors}
            rejectedOpticals={rejectedOpticals}
            approve={approve}
            reject={reject}
          />
        )}

        {activeSection === "notifications" && (
          <div>
            <h1 className="text-3xl font-bold mb-4">Notifications</h1>
            <p>No notifications yet.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;

/* =========================
   Components
========================= */
const SidebarBtn = ({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg text-left ${
      active ? "bg-white/20 font-medium" : "hover:bg-white/10"
    }`}
  >
    {label}
  </button>
);

const DashboardCards = ({
  doctors,
  stores,
  pending,
  notifications,
}: {
  doctors: number;
  stores: number;
  pending: number;
  notifications: number;
}) => (
  <>
    <h1 className="text-3xl font-bold mb-6 text-[#0D1B2A]">Admin Dashboard</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      <StatCard title="Doctors" value={doctors} icon={<Stethoscope />} />
      <StatCard title="Optical Stores" value={stores} icon={<Briefcase />} />
      <StatCard title="Pending Requests" value={pending} icon={<Clock />} />
      <StatCard title="Notifications" value={notifications} icon={<Bell />} />
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

/* =========================
   Pending Requests Table
========================= */
const PendingRequestsTable = ({
  users,
  approve,
  reject,
}: {
  users: Item[];
  approve: (id: number, type: "doctor" | "optical") => void;
  reject: (id: number, type: "doctor" | "optical") => void;
}) => {
  if (users.length === 0)
    return <p className="text-gray-500 text-center py-10">No users found.</p>;

  return (
    <motion.div
      className="bg-[#CCDCE9] rounded-2xl shadow-xl p-6 mt-8"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-xl font-semibold mb-4 text-[#1A2E44]">Users</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#EAF2FA] text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Type</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b hover:bg-[#F9FBFD] transition">
              <td className="p-3 font-medium">{u.name}</td>
              <td className="p-3 font-medium">{u.email}</td>
              <td className="p-3">
                {u.type === "doctor" ? "Doctor" : "Optical Store"}
              </td>
              <td className="p-3 flex justify-center items-center gap-2 flex-wrap">
                {u.status !== "approved" && (
                  <button
                    onClick={() => approve(u.id, u.type)}
                    className="bg-green-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-green-700 transition"
                  >
                    Approve
                  </button>
                )}
                {u.status !== "rejected" && (
                  <button
                    onClick={() => reject(u.id, u.type)}
                    className="bg-red-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-red-700 transition"
                  >
                    Reject
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

/* =========================
   Users Section with Filter
========================= */
const UsersSection = ({
  loading,
  pendingDoctors,
  pendingOpticals,
  approvedDoctors,
  approvedOpticals,
  rejectedDoctors,
  rejectedOpticals,
  approve,
  reject,
}: {
  loading: boolean;
  pendingDoctors: Item[];
  pendingOpticals: Item[];
  approvedDoctors: Item[];
  approvedOpticals: Item[];
  rejectedDoctors: Item[];
  rejectedOpticals: Item[];
  approve: (id: number, type: "doctor" | "optical") => void;
  reject: (id: number, type: "doctor" | "optical") => void;
}) => {
  const [filter, setFilter] = useState<FilterType>("all");

  if (loading)
    return (
      <div className="flex justify-center items-center h-40 text-[#1A2E44]">
        <Loader2 className="animate-spin mr-2" />
        Loading users...
      </div>
    );

  const allUsers = [
    ...pendingDoctors,
    ...pendingOpticals,
    ...approvedDoctors,
    ...approvedOpticals,
    ...rejectedDoctors,
    ...rejectedOpticals,
  ];

  const filteredUsers =
    filter === "all" ? allUsers : allUsers.filter((u) => u.status === filter);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Users Management</h1>
      <div className="mb-4 flex flex-wrap gap-2">
        {(["all", "pending", "approved", "rejected"] as const).map((f) => (
          <button
            key={f}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === f
                ? "bg-[#0D1B2A] text-white"
                : "bg-white text-[#0D1B2A] hover:bg-[#EAF2FA]"
            }`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <PendingRequestsTable
        users={filteredUsers}
        approve={approve}
        reject={reject}
      />
    </div>
  );
};
