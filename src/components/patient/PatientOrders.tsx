import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package, Clock, RefreshCw,Store } from "lucide-react";
import { toast } from "react-toastify";
import Navbar from "../sharedFile/PatientNavbar";

interface OrderItem {
    product_id: number;
    product_name: string;
    quantity: number;
    unit_price: string;
    total_price: string;
}

interface Order {
    id: number;
    status: string;
    total_price: string;
    created_at: string;
    optical_store: {
        optical_id: number;
        store_name: string;
    };
    items: OrderItem[];
}

const PatientOrders: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    const fetchMyOrders = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://127.0.0.1:8000/api/optical/orders/my-orders", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            if (data.success) {
                setOrders(data.data);
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            toast.error("Failed to load your orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleReorder = async (orderId: number) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/optical/orders/${orderId}/reorder`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` 
                },
            });
            const data = await response.json();
            if (data.success) {
                toast.success(data.message || "Order created successfully!");
                fetchMyOrders();
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            toast.error("Failed to re-order");
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-orange-100 text-orange-600';
            case 'approved': return 'bg-blue-100 text-blue-600';
            case 'ready': return 'bg-green-100 text-green-600';
            case 'cancelled': return 'bg-red-100 text-red-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc]">
            <Navbar />
            
            <div className="max-w-5xl mx-auto px-6 pt-28 pb-20">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-[#1A2E44]">My Orders</h1>
                        <p className="text-gray-500 mt-2">Track your eyewear orders and prescriptions</p>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100">
                        <span className="text-sm text-gray-500">Total Orders: </span>
                        <span className="font-bold text-[#1A2E44]">{orders.length}</span>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-gray-400 italic">Loading your history...</div>
                ) : (
                    <div className="grid gap-6">
                        {orders.map((order) => (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                key={order.id}
                                className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                            >
                                <div className="flex flex-wrap justify-between items-start gap-4">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                                            <Package size={24} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <h3 className="font-bold text-lg text-[#1A2E44]">Order #{order.id}</h3>
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusStyle(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
                                                <span className="flex items-center gap-1"><Store size={14}/> {order.optical_store.store_name}</span>
                                                <span className="flex items-center gap-1"><Clock size={14}/> {new Date(order.created_at).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Total Amount</p>
                                            <p className="text-xl font-black text-[#1A2E44]">${order.total_price}</p>
                                        </div>
                                        <button 
                                            onClick={() => handleReorder(order.id)}
                                            className="flex items-center gap-2 bg-[#1A2E44] text-white px-5 py-3 rounded-2xl hover:bg-blue-600 transition-colors shadow-lg shadow-blue-900/10"
                                        >
                                            <RefreshCw size={18} />
                                            <span className="font-bold text-sm">Re-order</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-gray-50">
                                    <p className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-widest">Ordered Items</p>
                                    <div className="flex flex-wrap gap-3">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl">
                                                <span className="text-sm font-medium text-gray-700">{item.product_name}</span>
                                                <span className="text-xs bg-white px-2 py-0.5 rounded-md border text-gray-400">x{item.quantity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {orders.length === 0 && (
                            <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-gray-100">
                                <Package size={48} className="mx-auto text-gray-200 mb-4" />
                                <p className="text-gray-400">You haven't placed any orders yet.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientOrders;