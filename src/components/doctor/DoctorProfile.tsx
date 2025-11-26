import React, { useState } from "react";
import DoctorNavbar from "../sharedFile/DoctorNavbar";

interface WorkingHour {
  day_in_week: string;
  start_time: string;
  end_time: string;
  status?: "saved" | "error" | "idle";
}

const DoctorProfile: React.FC = () => {
  const [workingHours, setWorkingHours] = useState<WorkingHour[]>([
    {
      day_in_week: "Friday,Sunday,Tuesday",
      start_time: "09:00",
      end_time: "14:00",
      status: "idle",
    },
  ]);

  const doctor_id = 8; // عدل حسب الدكتور الحالي
  const token = localStorage.getItem("token"); // لو عندك توكن مصادقة

  // 🔹 Auto-save لكل تعديل
  const saveRow = async (index: number, item: WorkingHour) => {
    try {
      const url = "http://127.0.0.1:8000/api/doctor/availability";

      const response = await fetch(url, {
        method: "PUT", // أو "POST" حسب حاجتك
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          day_in_week: item.day_in_week,
          start_time: item.start_time,
          end_time: item.end_time,
          doctor_id,
        }),
      });

      const text = await response.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch {
        console.error("Server returned non-JSON response:", text);
        updateStatus(index, "error");
        return;
      }

      if (result.status === "success") {
        updateStatus(index, "saved");
      } else {
        updateStatus(index, "error");
      }
      console.log("PUT response:", result);
    } catch (err) {
      console.error("Auto-save error:", err);
      updateStatus(index, "error");
    }
  };

  // تحديث حالة الصف بعد الحفظ
  const updateStatus = (index: number, status: "saved" | "error" | "idle") => {
    setWorkingHours((prev) => {
      const updated = [...prev];
      updated[index].status = status;
      return updated;
    });
  };

  // 🔹 تعديل الصف
  const handleChange = (
    index: number,
    field: "day_in_week" | "start_time" | "end_time",
    value: string
  ) => {
    const updated = [...workingHours];
    updated[index][field] = value;
    updated[index].status = "idle"; // إعادة الحالة إلى idle أثناء التعديل
    setWorkingHours(updated);

    // حفظ تلقائي
    saveRow(index, updated[index]);
  };

  // 🔹 حذف صف
  const removeRow = (index: number) => {
    const updated = [...workingHours];
    updated.splice(index, 1);
    setWorkingHours(updated);
  };

  return (
    <div className="min-h-screen bg-[#E9F2FA] flex flex-col">
      <DoctorNavbar />

      <div className="pt-28 px-6 lg:px-20 flex flex-col items-center gap-10">
        {/* PROFILE CARD */}
        <div className="w-full max-w-5xl bg-white/80 p-6 rounded-2xl shadow-lg flex flex-col lg:flex-row gap-6">
          <div className="flex-1 bg-white rounded-xl shadow flex flex-col items-center p-4 gap-4">
            <img
              src="/images/DoctorIMG.jpg"
              alt="Doctor"
              className="w-full h-[350px] object-cover rounded-xl"
            />
            <label className="cursor-pointer mt-2 bg-[#1A2E44] text-white px-4 py-2 rounded-full hover:bg-[#16283b] transition">
              Change Photo
              <input type="file" className="hidden" />
            </label>
          </div>

          <div className="flex-1 bg-[#D7E7F5] p-6 rounded-xl shadow flex flex-col gap-4">
            <h2 className="text-xl font-bold text-center text-[#1A2E44]">
              Dr. John Smith
            </h2>

            <div className="space-y-3">
              <div className="p-3 bg-white rounded-lg shadow">
                📧 dr.johnsmith@gmail.com
              </div>
              <div className="p-3 bg-white rounded-lg shadow">
                📞 +963 9xx xxx xxx
              </div>
              <div className="p-3 bg-white rounded-lg shadow">
                🏥 Vision Eye Clinic
              </div>
            </div>

            <button className="mt-4 bg-[#1A2E44] text-white py-2 rounded-full hover:bg-[#16283b] transition">
              Edit Profile
            </button>
          </div>
        </div>

        {/* WORKING HOURS */}
        <div className="w-full max-w-5xl bg-[#D4E6F6] p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold text-[#1A2E44] text-center underline mb-4">
            Working Hours
          </h2>

          <table className="w-full text-left text-[#1A2E44]">
            <thead>
              <tr className="bg-[#C2DAED]">
                <th className="p-3">Days of Week</th>
                <th className="p-3 text-center">Start Time</th>
                <th className="p-3 text-center">End Time</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {workingHours.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3">
                    <input
                      type="text"
                      value={item.day_in_week}
                      onChange={(e) =>
                        handleChange(index, "day_in_week", e.target.value)
                      }
                      className="w-full px-3 py-1 rounded-lg border border-gray-300"
                    />
                  </td>

                  <td className="p-3 text-center">
                    <input
                      type="time"
                      value={item.start_time}
                      onChange={(e) =>
                        handleChange(index, "start_time", e.target.value)
                      }
                      className="px-3 py-1 rounded-lg border border-gray-300"
                    />
                  </td>

                  <td className="p-3 text-center">
                    <input
                      type="time"
                      value={item.end_time}
                      onChange={(e) =>
                        handleChange(index, "end_time", e.target.value)
                      }
                      className="px-3 py-1 rounded-lg border border-gray-300"
                    />
                  </td>

                  <td className="p-3 text-center">
                    {item.status === "saved" && (
                      <span className="text-green-600 font-semibold">
                        Saved ✅
                      </span>
                    )}
                    {item.status === "error" && (
                      <span className="text-red-600 font-semibold">
                        Error ⚠️
                      </span>
                    )}
                    {item.status === "idle" && (
                      <span className="text-gray-500 font-semibold">
                        Editing...
                      </span>
                    )}
                  </td>

                  <td className="p-3 text-center">
                    <button
                      onClick={() => removeRow(index)}
                      className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
