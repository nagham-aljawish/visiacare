import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PatientNavbar from "../sharedFile/PatientNavbar";
import { useNavigate } from "react-router-dom";

interface OpticalStore {
  id: number;
  optical_store_id: number;
  email: string;
  phone: string;
  status: string;
  role: string;
  optical_store: {
    Store_name: string | null;
    shift: string;
    description: string;
    location: string;
  };
}

const OpticalStoresList: React.FC = () => {
  const [stores, setStores] = useState<OpticalStore[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStores = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/optical-stores/approved?page=${currentPage}`,
          {
            headers: {
              "Content-Type": "application/json",
              ...(token && { Authorization: `Bearer ${token}` }),
            },
          }
        );

        const data = await response.json();

        if (data.success) {
          setStores(data.data);
          setCurrentPage(data.pagination.current_page);
          setLastPage(data.pagination.last_page);
        }
      } catch (err) {
        console.error("Error fetching optical stores:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, [token, currentPage]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-[#1A2E44] text-lg">Loading optical stores...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E9F2FA]">
      <PatientNavbar />

      <h1 className="text-4xl font-bold text-[#1A2E44] text-center pt-24 mb-10">
        Optical Shops
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6 max-w-6xl mx-auto pb-10">
        {stores.map((store) => (
          <motion.div
            key={store.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-center mt-5 text-[#1A2E44]">
              {store.optical_store.Store_name || "Optical Store"}
            </h2>

            <p className="text-center text-gray-600 text-sm mt-1">
              {store.optical_store.description}
            </p>

            <p className="text-center text-gray-500 text-sm mt-1">
              📍 {store.optical_store.location}
            </p>

            <p className="text-center text-gray-500 text-sm mt-1">
              🕒 Shift: {store.optical_store.shift}
            </p>

            <div className="flex justify-center mt-5">
              <button className="px-5 py-2 bg-[#1A2E44] text-white rounded-full"
              onClick={() => navigate(`/optical-store/${store.optical_store_id}/products`)}>
                View Store
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center items-center gap-4 mt-10 pb-10">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          className={`px-4 py-2 rounded-full transition ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#1A2E44] text-white hover:bg-[#16283b]"
          }`}
        >
          Previous
        </button>

        <span className="text-[#1A2E44] font-medium">
          Page {currentPage} of {lastPage}
        </span>

        <button
          disabled={currentPage === lastPage}
          onClick={() => setCurrentPage((p) => Math.min(lastPage, p + 1))}
          className={`px-4 py-2 rounded-full transition ${
            currentPage === lastPage
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#1A2E44] text-white hover:bg-[#16283b]"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OpticalStoresList;
