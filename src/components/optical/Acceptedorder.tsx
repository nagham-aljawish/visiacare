import { useEffect, useState } from "react";
import { Package, Clock, CheckCircle2, User } from "lucide-react";
import OpticalShopNavbar from "../sharedFile/OpticalShopNavbar";
import { toast } from "react-toastify";

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
    prescription_id: number;
    patient: {
        patient_id: number;
        name: string;
    };
    items: OrderItem[];
}

const StoreOrders: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://127.0.0.1:8000/api/optical/orders/approved", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            if (data.success) {
                setOrders(data.data);
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to load orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const markAsReady = async (orderId: number) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/optical/orders/${orderId}/ready`, {
                method: "PATCH",
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            if (data.success) {
                toast.success("Order marked as ready!");
                fetchOrders();
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            toast.error("Failed to update order status");
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc]">
            <OpticalShopNavbar />
            
            <div className="max-w-7xl mx-auto px-6 py-10">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold text-[#1A2E44]">Store Orders</h1>
                    <p className="text-gray-500 mt-2">Manage customer orders and track prescriptions</p>
                </header>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    {loading ? (
                        <div className="p-20 text-center text-gray-400">Loading orders...</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-[#1A2E44] text-white">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold text-sm uppercase">Order Info</th>
                                        <th className="px-6 py-4 font-semibold text-sm uppercase">Patient</th>
                                        <th className="px-6 py-4 font-semibold text-sm uppercase">Items</th>
                                        <th className="px-6 py-4 font-semibold text-sm uppercase">Total</th>
                                        <th className="px-6 py-4 font-semibold text-sm uppercase">Status</th>
                                        <th className="px-6 py-4 font-semibold text-sm uppercase text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {orders.map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-[#1A2E44]">#{order.id}</span>
                                                    <span className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                                                        <Clock size={12} /> {new Date(order.created_at).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                                        <User size={16} />
                                                    </div>
                                                    <span className="font-medium">{order.patient.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {order.items.map((item, idx) => (
                                                    <div key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded mb-1 inline-block mr-1">
                                                        {item.product_name} (x{item.quantity})
                                                    </div>
                                                ))}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="font-bold text-green-600">${order.total_price}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                                                    order.status === 'ready' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                                }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {order.status !== 'ready' ? (
                                                    <button
                                                        onClick={() => markAsReady(order.id)}
                                                        className="bg-[#1A2E44] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-600 transition flex items-center gap-2 mx-auto"
                                                    >
                                                        <CheckCircle2 size={14} /> Mark Ready
                                                    </button>
                                                ) : (
                                                    <span className="text-green-500 font-medium text-xs">Ready for Pickup</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    
                    {!loading && orders.length === 0 && (
                        <div className="p-20 text-center flex flex-col items-center">
                            <Package size={48} className="text-gray-200 mb-4" />
                            <p className="text-gray-400 font-medium">No orders available yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StoreOrders;