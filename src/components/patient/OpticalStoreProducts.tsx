import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import {  X, Plus, Minus, FileText, CheckCircle } from "lucide-react";
import PatientNavbar from "../sharedFile/PatientNavbar";
import { toast } from "react-toastify";

interface Product {
  id: number;
  name: string;
  type: string;
  price: number;
  amount: number;
  image_url: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface Prescription {
  id: number;
  doctor_name: string;
  created_at: string;
  medication_name: string;
  effective_period: string;
  dosage: string;
  left_axis: string;
  left_cylinder: string;
  left_sphere: string;
  right_axis: string;
  right_cylinder: string;
  right_sphere: string;
}

const OpticalStoreProducts: React.FC = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const patientProfileId = localStorage.getItem("patient_profile_id"); 

  const [products, setProducts] = useState<Product[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [lastPage, setLastPage] = useState(1);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [selectedPrescriptionId, setSelectedPrescriptionId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/optical/${id}/products?page=${currentPage}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (data.success) {
          setProducts(data.data);
          setCurrentPage(data.pagination.current_page);
          setLastPage(data.pagination.last_page);
        }
      } catch (err) { console.error(err); } finally { setLoading(false); }
    };
    fetchProducts();
  }, [id, currentPage, token]);

  const fetchPrescriptions = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/my-prescriptions/${patientProfileId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setPrescriptions(data.data);
      setIsPrescriptionModalOpen(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      alert("Failed to load prescriptions");
    }
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prev => prev.map(i => i.id === productId ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const submitOrder = async () => {
    if (!selectedPrescriptionId) return alert("Please select a prescription first");
    
    setIsSubmitting(true);
    const orderBody = {
      prescription_id: selectedPrescriptionId,
      items: cart.map(item => ({
        optical_product_id: item.id,
        quantity: item.quantity
      }))
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/product/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(orderBody),
      });
      const result = await response.json();
      if (result.success) {
        toast.success("Order Success!")
        setCart([]);
        setIsCartOpen(false);
        setIsPrescriptionModalOpen(false);
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) { alert("Order failed"); } finally { setIsSubmitting(false); }
  };

  return (
    <div className="min-h-screen bg-[#f0f4f8]">
      <PatientNavbar />
      <h1 className="text-3xl font-bold text-[#1A2E44] text-center pt-28 mb-8">Store Inventory</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 max-w-6xl mx-auto pb-20">
        {products.map(product => (
          <div key={product.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <img src={product.image_url} className="w-full h-48 object-contain mb-4" alt={product.name} />
            <h3 className="font-bold text-lg text-[#1A2E44]">{product.name}</h3>
            <div className="flex justify-between items-center mt-4">
              <span className="text-xl font-bold text-blue-600">${product.price}</span>
              <button onClick={() => addToCart(product)} className="bg-[#1A2E44] text-white px-4 py-2 rounded-lg hover:bg-black transition">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {isCartOpen && (
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col">
            <div className="p-6 bg-[#1A2E44] text-white flex justify-between">
              <h2 className="font-bold">My Cart</h2>
              <button onClick={() => setIsCartOpen(false)}><X /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4 border-b pb-4">
                  <img src={item.image_url} className="w-16 h-16 object-cover rounded-md" />
                  <div className="flex-1">
                    <p className="font-bold text-sm">{item.name}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-1 border rounded"><Minus size={12}/></button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-1 border rounded"><Plus size={12}/></button>
                    </div>
                  </div>
                  <p className="font-bold text-blue-600">${item.price * item.quantity}</p>
                </div>
              ))}
            </div>
            <div className="p-6 border-t">
              <div className="flex justify-between text-xl font-bold mb-4">
                <span>Total:</span> <span>${totalPrice}</span>
              </div>
              <button onClick={fetchPrescriptions} className="w-full bg-[#1A2E44] text-white py-3 rounded-xl font-bold">
                Select Prescription & Order
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isPrescriptionModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl">
              <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#1A2E44]">Select Your Prescription</h2>
                <button onClick={() => setIsPrescriptionModalOpen(false)}><X /></button>
              </div>
              
              <div className="max-h-96 overflow-y-auto space-y-4 mb-6">
                {prescriptions.length > 0 ? prescriptions.map(p => (
                  <div 
                    key={p.id} 
                    onClick={() => setSelectedPrescriptionId(p.id)}
                    className={`p-4 border-2 rounded-2xl cursor-pointer transition ${selectedPrescriptionId === p.id ? "border-[#1A2E44] bg-blue-50" : "border-gray-100 hover:border-gray-300"}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="text-blue-500" />
                        <div>
                          <p className="font-bold">Dr. {p.doctor_name}</p>
                          <p className="text-xs text-gray-500">{new Date(p.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                      {selectedPrescriptionId === p.id && <CheckCircle className="text-[#1A2E44]" />}
                    </div>
                        <div className="grid grid-cols-2">
                          <div className="block my-5">
                          <p className="font-bold">Dosage {p.dosage}</p>
                        </div>
                        <div className="block my-5">
                          <p className="font-bold">Effective Period {p.effective_period}</p>
                        </div>
                        <div className="block my-5">
                          <p className="font-bold">Left Axis {p.left_axis}</p>
                        </div>
                        <div className="block my-5">
                          <p className="font-bold">Right Axis {p.right_axis}</p>
                        </div>
                        <div className="block my-5">
                          <p className="font-bold">Left Sphere {p.left_sphere}</p>
                        </div>
                        <div className="block my-5">
                          <p className="font-bold">Right Sphere {p.right_sphere}</p>
                        </div>
                        <div className="block my-5">
                          <p className="font-bold">Left Cylinder {p.left_cylinder}</p>
                        </div>
                        <div className="block my-5">
                          <p className="font-bold">Right Cylinder {p.right_cylinder}</p>
                        </div>
                        </div>
                  </div>
                )) : <p className="text-center text-gray-400">No prescriptions found.</p>}
              </div>

              <button 
                disabled={!selectedPrescriptionId || isSubmitting}
                onClick={submitOrder}
                className="w-full bg-[#1A2E44] text-white py-4 rounded-2xl font-bold disabled:bg-gray-300 transition"
              >
                {isSubmitting ? "Processing..." : "Finish Order"}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OpticalStoreProducts;