import React, { useState } from "react";
import DoctorNavbar from "../sharedFile/DoctorNavbar";

const DoctorProfile: React.FC = () => {
  const [workingHours, setWorkingHours] = useState([
    {
      day_in_week: "Friday,Sunday,Tuesday",
      start_time: "09:00",
      end_time: "14:00",
    },
  ]);

  const handleChange = (
    index: number,
    field: "day_in_week" | "start_time" | "end_time",
    value: string
  ) => {
    const updated = [...workingHours];
    updated[index][field] = value;
    setWorkingHours(updated);
  };

  const addRow = () => {
    setWorkingHours([
      ...workingHours,
      { day_in_week: "", start_time: "09:00", end_time: "14:00" },
    ]);
  };

  const removeRow = (index: number) => {
    const updated = [...workingHours];
    updated.splice(index, 1);
    setWorkingHours(updated);
  };

  return (
    <div className="min-h-screen bg-[#E9F2FA] flex flex-col">
      <DoctorNavbar />

      <div className="pt-28 px-6 lg:px-20 flex flex-col items-center gap-10">
        {/* PROFILE CARD WITH EDIT */}
        <div className="w-full max-w-5xl bg-white/80 p-6 rounded-2xl shadow-lg flex flex-col lg:flex-row gap-6">
          {/* IMAGE + CHANGE PHOTO */}
          <div className="flex-1 bg-white rounded-xl shadow flex flex-col items-center p-4 gap-4">
            <img
              src="/images/DoctorIMG.jpg"
              alt="Doctor"
              className="w-full h-[350px] object-cover rounded-xl"
            />
            {/* Change photo inside the profile card */}
            <label className="cursor-pointer mt-2 bg-[#1A2E44] text-white px-4 py-2 rounded-full hover:bg-[#16283b] transition">
              Change Photo
              <input type="file" className="hidden" />
            </label>
          </div>

          {/* INFO */}
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
                      placeholder="e.g. Friday,Sunday,Tuesday"
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

          <div className="flex justify-between mt-6">
            <button
              onClick={addRow}
              className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
            >
              Add Row
            </button>

            <button className="bg-[#1A2E44] text-white px-6 py-2 rounded-full hover:bg-[#16283b] transition">
              Save Working Hours
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
