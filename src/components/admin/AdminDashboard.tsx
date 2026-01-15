/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Loader2, Bell, Stethoscope, Briefcase, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EyeLogo from "/src/assets/eye-svgrepo-com.svg";

type UserType = "doctor" | "optical";
type StatusType = "pending" | "approved" | "rejected";
type Section = "dashboard" | "users" | "notifications";
type FilterType = "all" | StatusType;

interface Item {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  gender: string;
  status: StatusType;
  type: UserType;
  created_at: string;
}

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  read_at: string | null;
  created_at: string;
}

const AdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>("dashboard");
  const [pendingDoctors, setPendingDoctors] = useState<Item[]>([]);
  const [pendingOpticals, setPendingOpticals] = useState<Item[]>([]);
  const [approvedDoctors, setApprovedDoctors] = useState<Item[]>([]);
  const [approvedOpticals, setApprovedOpticals] = useState<Item[]>([]);
  const [rejectedDoctors, setRejectedDoctors] = useState<Item[]>([]);
  const [rejectedOpticals, setRejectedOpticals] = useState<Item[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const BASE_URL = "http://127.0.0.1:8000/api";

  const handleLogout = async () => {
    try {
      await fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  useEffect(() => {
    if (!token) {
        navigate("/");
        return;
    }

    const loadAll = async () => {
      setLoading(true);
      try {
        const adminEndpoints = [
          "admin/doctors/pending",
          "admin/opticals/pending",
          "admin/doctors/approved",
          "admin/opticals/approved",
          "admin/doctors/rejected",
          "admin/opticals/rejected",
        ];
        
        const notificationEndpoint = "notifications/my";

        const adminRequests = adminEndpoints.map((e) =>
          fetch(`${BASE_URL}/${e}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
          }).then((r) => r.json())
        );

        const notificationRequest = fetch(`${BASE_URL}/${notificationEndpoint}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        }).then((r) => r.json());

        const [pDocs, pOpts, aDocs, aOpts, rDocs, rOpts, notes] = await Promise.all([...adminRequests, notificationRequest]);

        setPendingDoctors(pDocs.data?.map((u: Item) => ({ ...u, type: "doctor" })) || []);
        setPendingOpticals(pOpts.data?.map((u: Item) => ({ ...u, type: "optical" })) || []);
        setApprovedDoctors(aDocs.data?.map((u: Item) => ({ ...u, type: "doctor" })) || []);
        setApprovedOpticals(aOpts.data?.map((u: Item) => ({ ...u, type: "optical" })) || []);
        setRejectedDoctors(rDocs.data?.map((u: Item) => ({ ...u, type: "doctor" })) || []);
        setRejectedOpticals(rOpts.data?.map((u: Item) => ({ ...u, type: "optical" })) || []);
        setNotifications(notes.data || []);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAll();
  }, [token, navigate]);

  const updateStatus = async (id: number, status: StatusType) => {
    await fetch(`${BASE_URL}/admin/update-status`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: id, status }),
    });
  };

  const approve = async (id: number, type: UserType) => {
    await updateStatus(id, "approved");
    removeFromLists(id, type);
  };

  const reject = async (id: number, type: UserType) => {
    await updateStatus(id, "rejected");
    removeFromLists(id, type);
  };

  const removeFromLists = (id: number, type: UserType) => {
    if (type === "doctor") setPendingDoctors((p) => p.filter((u) => u.id !== id));
    else setPendingOpticals((p) => p.filter((u) => u.id !== id));
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#A8CFEB] to-[#EAF2FA]">
      <aside className="w-64 bg-gradient-to-b from-[#0D1B2A] to-[#1A2E44] text-white p-6 shadow-2xl flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <img src={EyeLogo} className="w-8 h-8 invert" alt="Logo" />
          <h1 className="text-2xl font-bold">VisiaCare</h1>
        </div>

        <nav className="flex-1">
          {["dashboard", "users", "notifications"].map((s) => (
            <button
              key={s}
              onClick={() => setActiveSection(s as Section)}
              className={`w-full text-left px-4 py-3 rounded-xl mb-2 transition flex items-center gap-3 ${
                activeSection === s
                  ? "bg-white/20 font-bold text-white shadow-inner"
                  : "hover:bg-white/10 text-white/60"
              }`}
            >
              {s === "notifications" && <Bell size={18} />}
              {s === "dashboard" && <Briefcase size={18} />}
              {s === "users" && <Stethoscope size={18} />}
              {s.toUpperCase()}
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-200 font-bold"
          >
            <LogOut size={18} />
            LOGOUT
          </button>
        </div>
      </aside>

      <main className="flex-1 p-10 overflow-y-auto">
        {activeSection === "dashboard" && (
          <>
            <h1 className="text-3xl font-bold text-[#1A2E44] mb-6">Admin Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <StatCard title="Doctors" value={pendingDoctors.length + approvedDoctors.length + rejectedDoctors.length} icon={<Stethoscope />} />
              <StatCard title="Optical Stores" value={pendingOpticals.length + approvedOpticals.length + rejectedOpticals.length} icon={<Briefcase />} />
              <StatCard title="Pending" value={pendingDoctors.length + pendingOpticals.length} icon={<Clock />} />
              <StatCard title="Notifications" value={notifications.length} icon={<Bell />} />
            </div>
            <UsersTable users={[...pendingDoctors, ...pendingOpticals]} approve={approve} reject={reject} loading={loading} title="Recent Requests" />
          </>
        )}

        {activeSection === "users" && (
          <UsersSection loading={loading} users={[...pendingDoctors, ...pendingOpticals, ...approvedDoctors, ...approvedOpticals, ...rejectedDoctors, ...rejectedOpticals]} approve={approve} reject={reject} />
        )}

        {activeSection === "notifications" && (
          <NotificationsSection notifications={notifications} loading={loading} />
        )}
      </main>
    </div>
  );
};

const NotificationsSection = ({ notifications, loading }: any) => {
  if (loading) return <div className="p-10 text-center"><Loader2 className="animate-spin inline-block mr-2" /> Loading...</div>;
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold text-[#1A2E44] mb-6 tracking-tight">System Alerts</h2>
      {notifications.length === 0 ? (
        <div className="bg-white/50 p-20 rounded-3xl text-center text-gray-400 border-2 border-dashed border-gray-200">No notifications found</div>
      ) : (
        notifications.map((note: any) => (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} key={note.id} className={`p-6 rounded-2xl bg-white shadow-sm border-l-4 ${note.read_at ? "border-gray-100 opacity-60" : "border-[#1A2E44]"}`}>
            <h3 className="font-bold text-[#1A2E44]">{note.title}</h3>
            <p className="text-gray-500 text-sm mt-1">{note.message}</p>
            <span className="text-[10px] text-gray-400 block mt-2 font-mono uppercase tracking-widest">{new Date(note.created_at).toLocaleString()}</span>
          </motion.div>
        ))
      )}
    </div>
  );
};

const StatCard = ({ title, value, icon }: any) => (
  <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
    <div className="text-[#1A2E44] bg-blue-50 w-10 h-10 flex items-center justify-center rounded-xl mb-4">{icon}</div>
    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{title}</p>
    <p className="text-3xl font-black text-[#1A2E44] mt-1">{value}</p>
  </div>
);

const UsersTable = ({ users, approve, reject, loading, title }: any) => {
    if (loading) return <div className="text-center p-10 font-bold text-gray-400">Fetching Data...</div>;
    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 bg-gray-50/50 border-b border-gray-100 font-bold text-[#1A2E44]">{title}</div>
            <table className="w-full text-left">
                <thead>
                    <tr className="text-[10px] uppercase text-gray-400 font-black tracking-widest bg-white">
                        <th className="p-5">User</th>
                        <th className="p-5">Role</th>
                        <th className="p-5 text-center">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {users.map((u: any) => (
                        <tr key={u.id} className="hover:bg-blue-50/20 transition-colors">
                            <td className="p-5">
                                <div className="font-bold text-[#1A2E44] text-sm">{u.name}</div>
                                <div className="text-[11px] text-gray-400">{u.email}</div>
                            </td>
                            <td className="p-5"><span className="text-[10px] font-black uppercase tracking-tighter text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">{u.type}</span></td>
                            <td className="p-5">
                                <div className="flex justify-center gap-2">
                                    {u.status === 'pending' ? (
                                        <>
                                            <button onClick={() => approve(u.id, u.type)} className="text-[10px] font-bold bg-[#1A2E44] text-white px-4 py-1.5 rounded-lg">Approve</button>
                                            <button onClick={() => reject(u.id, u.type)} className="text-[10px] font-bold border border-red-100 text-red-500 px-4 py-1.5 rounded-lg">Reject</button>
                                        </>
                                    ) : (
                                        <span className={`text-[10px] font-black uppercase ${u.status === 'approved' ? 'text-green-500' : 'text-red-300'}`}>{u.status}</span>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const UsersSection = ({ users, approve, reject, loading }: any) => {
  const [filter, setFilter] = useState<FilterType>("all");
  const filtered = filter === "all" ? users : users.filter((u: any) => u.status === filter);
  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {["all", "pending", "approved", "rejected"].map((f) => (
          <button key={f} onClick={() => setFilter(f as FilterType)} className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${filter === f ? "bg-[#1A2E44] text-white shadow-lg shadow-blue-900/20" : "bg-white text-gray-400 hover:text-gray-600 border border-gray-100"}`}>{f.toUpperCase()}</button>
        ))}
      </div>
      <UsersTable users={filtered} approve={approve} reject={reject} loading={loading} title={`${filter} Users`} />
    </div>
  );
};

export default AdminDashboard;