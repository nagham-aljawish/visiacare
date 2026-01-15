import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Image as ImageIcon } from "lucide-react";
import OpticalShopNavbar from "../sharedFile/OpticalShopNavbar";
import { toast } from "react-toastify";

interface Product {
    id: number;
    name: string;
    type: string;
    price: string;
    amount: number;
    image_url: string;
}

const StoreOrders: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        type: "glasses",
        price: "",
        amount: "",
        image: null as File | null,
    });

    const token = localStorage.getItem("token");
    const storeId = localStorage.getItem("optical_store_id") || "1";

    const fetchProducts = async () => {
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/optical/${storeId}/products`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const result = await res.json();
            if (result.success) setProducts(result.data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            toast.error("Failed to load products");
        } finally {
            setLoading(false);
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { fetchProducts(); }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", formData.name);
        data.append("type", formData.type);
        data.append("price", formData.price);
        data.append("amount", formData.amount);
        if (formData.image) data.append("image", formData.image);

        const url = editingProduct 
            ? `http://127.0.0.1:8000/api/optical/products-update/${editingProduct.id}` 
            : `http://127.0.0.1:8000/api/optical/products`;

        try {
            const res = await fetch(url, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: data,
            });
            const result = await res.json();
            if (result.success) {
                toast.success(result.message);
                setIsModalOpen(false);
                setEditingProduct(null);
                resetForm();
                fetchProducts();
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            toast.error("Operation failed");
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/optical/products/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            const result = await res.json();
            if (result.success) {
                toast.success("Product deleted");
                fetchProducts();
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            toast.error("Delete failed");
        }
    };

    const resetForm = () => {
        setFormData({ name: "", type: "glasses", price: "", amount: "", image: null });
    };

    const openEditModal = (product: Product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            type: product.type,
            price: product.price,
            amount: product.amount.toString(),
            image: null,
        });
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-[#f3f6f9]">
            <OpticalShopNavbar />
            <div className="max-w-7xl mx-auto px-6 pt-24 pb-10">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-[#1A2E44]">Products Management</h2>
                        <p className="text-gray-500 mt-1">Manage your store inventory and items.</p>
                    </div>
                    <button 
                        onClick={() => { resetForm(); setEditingProduct(null); setIsModalOpen(true); }}
                        className="bg-[#1A2E44] text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-[#2a4563] transition shadow-lg"
                    >
                        <Plus size={20} /> Add New Product
                    </button>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-[#1A2E44] font-bold">Product</th>
                                <th className="px-6 py-4 text-[#1A2E44] font-bold">Type</th>
                                <th className="px-6 py-4 text-[#1A2E44] font-bold">Price</th>
                                <th className="px-6 py-4 text-[#1A2E44] font-bold">Stock</th>
                                <th className="px-6 py-4 text-[#1A2E44] font-bold text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr><td colSpan={5} className="p-10 text-center text-gray-400">Loading products...</td></tr>
                            ) : products.length === 0 ? (
                                <tr><td colSpan={5} className="p-10 text-center text-gray-400">No products found.</td></tr>
                            ) : products.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50/50 transition">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img src={item.image_url} alt="" className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                                            <span className="font-semibold text-[#1A2E44]">{item.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 capitalize">{item.type}</td>
                                    <td className="px-6 py-4 font-bold text-blue-600">${item.price}</td>
                                    <td className="px-6 py-4 text-gray-600">{item.amount} units</td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center gap-2">
                                            <button onClick={() => openEditModal(item)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition"><Edit2 size={18} /></button>
                                            <button onClick={() => handleDelete(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"><Trash2 size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl relative">
                        <h3 className="text-xl font-bold text-[#1A2E44] mb-6">
                            {editingProduct ? "Edit Product" : "Add New Product"}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                                <input 
                                    type="text" required
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                                    <input 
                                        type="number" required
                                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                        value={formData.price} 
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            if (parseFloat(val) >= 0 || val === "") {
                                                setFormData({...formData, price: val});
                                            }
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                                    <input 
                                        type="number" required
                                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                        value={formData.amount} 
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            if (parseInt(val) >= 0 || val === "") {
                                                setFormData({...formData, amount: val});
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                                <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center cursor-pointer hover:bg-gray-50 transition relative">
                                    <input 
                                        type="file" accept="image/*" 
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={(e) => setFormData({...formData, image: e.target.files ? e.target.files[0] : null})}
                                    />
                                    <ImageIcon className="mx-auto text-gray-400 mb-2" />
                                    <p className="text-xs text-gray-500">
                                        {formData.image ? formData.image.name : "Click to upload product image"}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button 
                                    type="button" onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="flex-1 px-4 py-2 bg-[#1A2E44] text-white rounded-xl hover:bg-[#2a4563] transition"
                                >
                                    {editingProduct ? "Update" : "Save Product"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StoreOrders;