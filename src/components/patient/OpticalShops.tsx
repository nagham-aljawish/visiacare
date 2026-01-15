import React, { useState } from "react";
import { Search, MapPin, Star, ShoppingBag } from "lucide-react";
import PatientNavbar from "../sharedFile/PatientNavbar";

const MOCK_OPTICAL_SHOPS = [
    {
        id: 1,
        name: "Vision Express",
        address: "123 Eye Street, Medical District",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1577460551100-907ba84418ce?auto=format&fit=crop&q=80&w=1000",
        glasses: [
            {
                id: 101,
                name: "Ray-Ban Aviator",
                price: "$150",
                type: "Sunglasses",
                image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=1000",
            },
            {
                id: 102,
                name: "Oakley Holbrook",
                price: "$130",
                type: "Sports",
                image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=1000",
            },
            {
                id: 103,
                name: "Persol PO3269S",
                price: "$280",
                type: "Luxury",
                image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=1000",
            },
        ],
    },
    {
        id: 2,
        name: "Crystal Clear Optics",
        address: "456 Lens Avenue, Downtown",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1562886812-41775a01195d?auto=format&fit=crop&q=80&w=1000",
        glasses: [
            {
                id: 201,
                name: "Tom Ford FT5634",
                price: "$320",
                type: "Prescription",
                image: "https://plus.unsplash.com/premium_photo-1675806067753-22870bb19c43?auto=format&fit=crop&q=80&w=1000",
            },
            {
                id: 202,
                name: "Warby Parker Percey",
                price: "$95",
                type: "Reading",
                image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=1000",
            },
        ],
    },
    {
        id: 3,
        name: "Elite Eyewear",
        address: "789 Frame Blvd, Westside",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1000",
        glasses: [
            {
                id: 301,
                name: "Gucci GG0061S",
                price: "$450",
                type: "Fashion",
                image: "https://images.unsplash.com/photo-1508296695146-25e9436d08a2?auto=format&fit=crop&q=80&w=1000",
            },
            {
                id: 302,
                name: "Prada Linea Rossa",
                price: "$290",
                type: "Sport",
                image: "https://images.unsplash.com/photo-1614715838608-aa5296d92e5c?auto=format&fit=crop&q=80&w=1000",
            },
            {
                id: 303,
                name: "Ray-Ban Wayfarer",
                price: "$160",
                type: "Classic",
                image: "https://images.unsplash.com/photo-1533681018185-6891fd65a1b5?auto=format&fit=crop&q=80&w=1000",
            },
            {
                id: 304,
                name: "Oliver Peoples Gregory",
                price: "$380",
                type: "Vintage",
                image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&q=80&w=1000",
            },
        ],
    },
];

const OpticalShops: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("All");

    const filterOptions = ["All", "Suspension", "Frames", "Lenses", "Sunglasses"];

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <PatientNavbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#1A2E44]">Optical Shops</h1>
                    <p className="text-gray-600 mt-2">Find the perfect glasses from top-rated optical stores near you.</p>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search shops or glasses..."
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1A2E44] focus:border-transparent outline-none bg-white shadow-sm transition"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                        {filterOptions.map((option) => (
                            <button
                                key={option}
                                onClick={() => setSelectedFilter(option)}
                                className={`px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${selectedFilter === option
                                    ? "bg-[#1A2E44] text-white shadow-md transform scale-105"
                                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                                    }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Shops Listing */}
                <div className="grid gap-8">
                    {MOCK_OPTICAL_SHOPS.map((shop) => (
                        <div key={shop.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                            {/* Shop Header */}
                            <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100">
                                        <img src={shop.image} alt={shop.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-[#1A2E44]">{shop.name}</h2>
                                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <MapPin size={16} />
                                                <span>{shop.address}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-amber-500 font-medium">
                                                <Star size={16} fill="currentColor" />
                                                <span>{shop.rating}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className="px-6 py-2.5 bg-[#1A2E44]/5 text-[#1A2E44] font-semibold rounded-lg hover:bg-[#1A2E44]/10 transition">
                                    Visit Store
                                </button>
                            </div>

                            {/* Glasses Grid */}
                            <div className="p-6 bg-gray-50/50">
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Featured Collection</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {shop.glasses.map((glass) => (
                                        <div key={glass.id} className="group bg-white rounded-xl border border-gray-200 p-3 hover:border-[#1A2E44]/30 transition-all cursor-pointer">
                                            <div className="relative aspect-4/3 mb-3 overflow-hidden rounded-lg bg-gray-100">
                                                <img
                                                    src={glass.image}
                                                    alt={glass.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <button className="absolute bottom-2 right-2 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm text-[#1A2E44] hover:bg-[#1A2E44] hover:text-white transition">
                                                    <ShoppingBag size={14} />
                                                </button>
                                                <span className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur text-white text-[10px] uppercase font-bold rounded">
                                                    {glass.type}
                                                </span>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-800 text-sm truncate">{glass.name}</h4>
                                                <p className="text-[#1A2E44] font-bold mt-1 text-sm">{glass.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OpticalShops;
