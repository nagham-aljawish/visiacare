import React, { useState } from "react";
import { useParams } from "react-router-dom";
import DoctorNavbar from "../sharedFile/DoctorNavbar";

const fields: Array<"sphere" | "cylinder" | "add" | "axis"> = [
  "sphere",
  "cylinder",
  "add",
  "axis",
];

const dummyPatient = {
  name: "Ahmad Ali",
  age: 25,
  phone: "0938609902",
  diagnosis: "Nearsightedness",
  lastCheck: "3 months ago",
  notes: "Artificial tears twice daily",
  prescription: {
    right: {
      sphere: "-2.00",
      cylinder: "-0.75",
      add: "+0.75",
      axis: "180",
    },
    left: {
      sphere: "-1.75",
      cylinder: "-0.50",
      add: "+0.75",
      axis: "170",
    },
  },
};

const MedicalRecord: React.FC = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen bg-[#E9F2FA]">
      <DoctorNavbar />

      <div className="pt-28 px-6 lg:px-20 flex justify-center">
        <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-lg">
          {/* HEADER */}
          <div className="flex items-center gap-4 border-b pb-4">
            <img
              src="/images/DoctorIMG.jpg"
              alt="patient"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold text-[#1A2E44]">
                {dummyPatient.name}
              </h2>
              <p className="text-gray-600">{dummyPatient.age} years old</p>
              <p className="text-gray-600">Patient ID: {id}</p>
            </div>
          </div>

          {/* MEDICAL HISTORY */}
          <div className="mt-6 bg-[#EAF4FF] p-4 rounded-xl shadow">
            <h3 className="font-bold text-xl text-[#1A2E44] mb-3">
              Medical History
            </h3>

            {!isEditing ? (
              <>
                <p>
                  <strong>Diagnosis:</strong> {dummyPatient.diagnosis}
                </p>
                <p>
                  <strong>Last Check:</strong> {dummyPatient.lastCheck}
                </p>
                <p>
                  <strong>Doctor Notes:</strong> {dummyPatient.notes}
                </p>
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <input className="border p-2 rounded" placeholder="Diagnosis" />
                <input
                  className="border p-2 rounded"
                  placeholder="Last Check"
                />
                <input
                  className="border p-2 rounded"
                  placeholder="Doctor Notes"
                />
              </div>
            )}
          </div>

          {/* PRESCRIPTION */}
          <div className="mt-6 bg-[#EAF4FF] p-4 rounded-xl shadow">
            <h3 className="font-bold text-xl text-[#1A2E44] mb-3">
              Last Prescription
            </h3>

            <div className="grid grid-cols-2 gap-6">
              {/* RIGHT */}
              <div>
                <h4 className="font-semibold text-lg mb-2">👁 Right Eye</h4>

                {fields.map((field) => (
                  <input
                    key={field}
                    className="w-full p-2 rounded-lg border my-1"
                    placeholder={field}
                    defaultValue={
                      !isEditing ? dummyPatient.prescription.right[field] : ""
                    }
                  />
                ))}
              </div>

              {/* LEFT */}
              <div>
                <h4 className="font-semibold text-lg mb-2">👁 Left Eye</h4>

                {fields.map((field) => (
                  <input
                    key={field}
                    className="w-full p-2 rounded-lg border my-1"
                    placeholder={field}
                    defaultValue={
                      !isEditing ? dummyPatient.prescription.left[field] : ""
                    }
                  />
                ))}
              </div>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="mt-6 text-center">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-[#1A2E44] text-white px-6 py-2 rounded-full"
              >
                + Add New Prescription
              </button>
            ) : (
              <button className="bg-green-600 text-white px-6 py-2 rounded-full">
                Save Prescription
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecord;
