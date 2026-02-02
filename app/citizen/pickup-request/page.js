"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Info, ChevronDown } from "lucide-react";

export default function RequestPickup() {
  const router = useRouter();

  // ✅ schema-correct states
  const [wasteTypes, setWasteTypes] = useState([]);
  const [timeSlot, setTimeSlot] = useState("");
  const [households, setHouseholds] = useState([]);
  const [selectedHouseId, setSelectedHouseId] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHouseDropdownOpen, setIsHouseDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ fetch households from DB
  useEffect(() => {
    fetch("/api/households")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setHouseholds(data.data);
        }
      });
  }, []);

  // ✅ toggle multi waste selection
  const toggleWasteType = (type) => {
    setWasteTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const handleSchedule = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/pickup-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          houseId: selectedHouseId,
          wasteTypes,
          shift: timeSlot
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      router.push("/citizen/pickup-status");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const timeSlots = [
    { value: "morning", label: "Morning (6:00 AM - 9:00 AM)" },
    { value: "evening", label: "Evening (6:00 PM - 8:00 PM)" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-6">
        <h1 className="text-2xl">Request Pickup</h1>
        <p className="text-white/90">Schedule your waste collection</p>
      </div>

      <div className="px-4 py-6 max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 gap-3">
          <div className="p-6 space-y-6">

            {/* ✅ MULTI Waste Type */}
            <div className="p-3">
              <label className="text-base mb-3 gap-2.5 block font-medium text-black">
                Select Waste Type *
              </label>

              {[
                { key: "wet", label: "Wet Waste 🥬" },
                { key: "dry", label: "Dry Waste 📄" },
                { key: "e-waste", label: "E-Waste 🔌" }
              ].map((w) => (
                <div
                  key={w.key}
                  onClick={() => toggleWasteType(w.key)}
                  className={`border-2 rounded-lg p-4 gap-3.5 mt-2 cursor-pointer text-black  ${
                    wasteTypes.includes(w.key)
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200"
                  }`}
                >
                  {w.label}
                </div>
              ))}
            </div>

            {/* ✅ Time Slot (placeholder BLACK) */}
            <div>
              <label className="text-base mb-3 block font-medium text-gray-700">
                Pickup Time Slot *
              </label>

              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full h-12 px-4 border rounded-md flex justify-between items-center text-black"
              >
                {timeSlot
                  ? timeSlots.find((s) => s.value === timeSlot)?.label
                  : "Select a time slot"}
                <ChevronDown className="w-4 h-4" />
              </button>

              {isDropdownOpen && (
                <div className="border rounded-md mt-1 bg-white">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.value}
                      className="w-full px-4 py-3 text-black text-left hover:bg-gray-100"
                      onClick={() => {
                        setTimeSlot(slot.value);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {slot.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ✅ Pickup Location from DB */}
            <div>
              <label className="text-base mb-3 block font-medium text-gray-700">
                Pickup Location *
              </label>

              <button
                onClick={() => setIsHouseDropdownOpen(!isHouseDropdownOpen)}
                className="w-full h-12 px-4 border rounded-md flex justify-between items-center text-black"
              >
                {selectedHouseId || "Select your house"}
                <MapPin className="w-4 h-4" />
              </button>

              {isHouseDropdownOpen && (
                <div className="border rounded-md mt-1 text-black bg-white max-h-40 overflow-y-auto">
                  {households.map((h) => (
                    <button
                      key={h.houseId}
                      onClick={() => {
                        setSelectedHouseId(h.houseId);
                        setIsHouseDropdownOpen(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-100"
                    >
                      {h.houseId} – {h.ward}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Error */}
            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              onClick={handleSchedule}
              disabled={!timeSlot || !selectedHouseId || wasteTypes.length === 0 || loading}
              className={`w-full h-12 font-medium rounded-md ${
                loading
                  ? "bg-gray-400 text-white"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {loading ? "Scheduling..." : "Schedule Pickup"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
