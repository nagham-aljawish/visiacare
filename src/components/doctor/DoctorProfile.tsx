import React, { useState } from "react";
import DoctorNavbar from "../sharedFile/DoctorNavbar";

const DoctorProfile: React.FC = () => {
  const [workingHours, setWorkingHours] = useState(
    [
      "Saturday",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ].map((day) => ({
      day,
      from: "",
      to: "",
    }))
  );

  const handleHourChange = (
    index: number,
    field: "from" | "to",
    value: string
  ) => {
    const updated = [...workingHours];
    updated[index][field] = value;
    setWorkingHours(updated);
  };

  return (
    <div className="min-h-screen bg-[#E9F2FA] flex flex-col">
      <DoctorNavbar />

      <div className="pt-28 px-6 lg:px-20 flex flex-col items-center gap-10">
        {/* PROFILE CARD */}
        <div className="w-full max-w-5xl bg-white/80 p-6 rounded-2xl shadow-lg flex flex-col lg:flex-row gap-6">
          {/* IMAGE */}
          <div className="flex-1 bg-white rounded-xl shadow">
            <img
              src="/images/DoctorIMG.jpg"
              alt="Doctor"
              className="w-full h-[350px] object-cover rounded-xl"
            />
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

            <button className="mt-4 bg-[#1A2E44] text-white py-2 rounded-full">
              Edit Profile
            </button>
          </div>
        </div>

        {/* CHANGE PHOTO */}
        <div className="w-full max-w-5xl bg-white/70 p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-semibold text-[#1A2E44] flex items-center gap-2">
            ✏ change Photo
          </h2>
          <input type="file" className="mt-4" />
        </div>

        {/* WORKING HOURS */}
        <div className="w-full max-w-5xl bg-[#D4E6F6] p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold text-[#1A2E44] text-center underline mb-4">
            Working Hours
          </h2>

          <table className="w-full text-left text-[#1A2E44]">
            <thead>
              <tr className="bg-[#C2DAED]">
                <th className="p-3">Day</th>
                <th className="p-3 text-center">From</th>
                <th className="p-3 text-center">To</th>
              </tr>
            </thead>

            <tbody>
              {workingHours.map((item, index) => (
                <tr key={item.day} className="border-b">
                  <td className="p-3 font-medium">{item.day}</td>

                  <td className="p-3 text-center">
                    <input
                      type="time"
                      value={item.from}
                      onChange={(e) =>
                        handleHourChange(index, "from", e.target.value)
                      }
                      className="px-3 py-1 rounded-lg border border-gray-300"
                    />
                  </td>

                  <td className="p-3 text-center">
                    <input
                      type="time"
                      value={item.to}
                      onChange={(e) =>
                        handleHourChange(index, "to", e.target.value)
                      }
                      className="px-3 py-1 rounded-lg border border-gray-300"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center mt-6">
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
