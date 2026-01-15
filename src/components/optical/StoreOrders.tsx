import { CheckCircle, XCircle, Eye, FileText, Info } from "lucide-react";
import OpticalShopNavbar from "../sharedFile/OpticalShopNavbar";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface OrderItem {
  product_name: string;
  quantity: number;
  unit_price: string;
  total_price: string;
}

interface Prescription {
  id: number;
  doctor_name: string;
  details: string | null;
  created_at: string;
  right_sphere: number;
  right_cylinder: number;
  right_axis: number;
  left_sphere: number;
  left_cylinder: number;
  left_axis: number;
  medication_name: string;
  effective_period: string;
}

interface Order {
  id: number;
  status: string;
  total_price: string;
  created_at: string;
  patient: {
    name: string;
  };
  items: OrderItem[];
  prescription: Prescription;
}

const StoreOrders: React.FC = () => {
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/optical/orders/pending", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setOrders(data.data);
      }
    } catch (err) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (orderId: number, action: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/optical/orders/${orderId}/${action}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (result.success) {
        toast.success(`Order ${action}ed successfully`);
        fetchOrders();
      }
    } catch (err) {
      toast.error("Action failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f4f8]">
      <OpticalShopNavbar />
      
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-20">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#1A2E44]">Orders Management</h2>
          <p className="text-gray-500 mt-1">Manage pending orders and view prescription details.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-20 text-center text-gray-400">Loading orders...</div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-sm font-bold text-gray-600">ID</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-600">Patient</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-600">Items</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-600">Total</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-600 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition">
                    <td className="px-6 py-4 font-bold text-gray-700">#{order.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{order.patient.name}</td>
                    <td className="px-6 py-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="text-xs text-gray-500">
                          {item.product_name} <span className="font-bold text-gray-700">(x{item.quantity})</span>
                        </div>
                      ))}
                    </td>
                    <td className="px-6 py-4 font-bold text-blue-600">${order.total_price}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => setSelectedPrescription(order.prescription)}
                          className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition"
                          title="View Prescription"
                        >
                          <Eye size={18} />
                        </button>

                        {order.status === "pending" && (
                          <>
                            <button 
                              onClick={() => handleAction(order.id, "approve")}
                              className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition"
                            >
                              <CheckCircle size={18} />
                            </button>
                            <button 
                              onClick={() => handleAction(order.id, "cancelled")}
                              className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition"
                            >
                              <XCircle size={18} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          
          {!loading && orders.length === 0 && (
            <div className="p-20 text-center text-gray-400 font-medium">No pending orders.</div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedPrescription && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#1A2E44] text-white">
                <div className="flex items-center gap-3">
                  <FileText size={24} />
                  <h3 className="text-xl font-bold">Prescription Details</h3>
                </div>
                <button onClick={() => setSelectedPrescription(null)} className="hover:rotate-90 transition-transform">
                  <XCircle size={28} />
                </button>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Doctor</p>
                    <p className="text-lg font-semibold text-gray-800">{selectedPrescription.doctor_name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Date</p>
                    <p className="text-lg font-semibold text-gray-800">{new Date(selectedPrescription.created_at).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <h4 className="flex items-center gap-2 font-bold text-[#1A2E44] mb-4">
                    <Info size={18} /> Vision Measurements
                  </h4>
                  
                  <div className="grid grid-cols-4 gap-4 text-center border-b border-gray-200 pb-4 mb-4">
                    <div className="text-gray-400 font-bold text-xs">EYE</div>
                    <div className="text-gray-400 font-bold text-xs">SPHERE</div>
                    <div className="text-gray-400 font-bold text-xs">CYLINDER</div>
                    <div className="text-gray-400 font-bold text-xs">AXIS</div>
                    
                    <div className="font-bold text-blue-600">RIGHT</div>
                    <div className="bg-white p-2 rounded shadow-sm">{selectedPrescription.right_sphere}</div>
                    <div className="bg-white p-2 rounded shadow-sm">{selectedPrescription.right_cylinder}</div>
                    <div className="bg-white p-2 rounded shadow-sm">{selectedPrescription.right_axis}</div>

                    <div className="font-bold text-purple-600">LEFT</div>
                    <div className="bg-white p-2 rounded shadow-sm">{selectedPrescription.left_sphere}</div>
                    <div className="bg-white p-2 rounded shadow-sm">{selectedPrescription.left_cylinder}</div>
                    <div className="bg-white p-2 rounded shadow-sm">{selectedPrescription.left_axis}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-400 font-bold">Medication/Lens Type</p>
                      <p className="font-medium text-gray-700">{selectedPrescription.medication_name || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold">Effective Period</p>
                      <p className="font-medium text-gray-700">{selectedPrescription.effective_period} Months</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedPrescription(null)}
                  className="w-full mt-8 py-4 bg-[#1A2E44] text-white rounded-2xl font-bold hover:bg-blue-600 transition shadow-lg shadow-blue-900/10"
                >
                  Close Details
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StoreOrders;