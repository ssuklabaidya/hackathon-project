"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  MapIcon,
  ClipboardCheck,
  FileText,
  LogOut,
  CheckCircle,
  X,
} from "lucide-react";

export default function PickupCompletion() {
  const router = useRouter();

  const [pickupsToComplete, setPickupsToComplete] = useState([]);
  const [completedPickups, setCompletedPickups] = useState([]);
  const [segregationStatus, setSegregationStatus] = useState({});
  const [toastMessage, setToastMessage] = useState("");
  const [selectedShift, setSelectedShift] = useState("");

  // 🔹 Fetch pending pickups (with optional shift filter)
  useEffect(() => {
    const url = selectedShift
      ? `/api/pickup-requests/pending?shift=${selectedShift}`
      : "/api/pickup-requests/pending";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPickupsToComplete(
            data.data.map((p) => ({
              id: p.requestId,
              address: `House ID - ${p.houseId}`,
              wasteType: p.wasteTypes.join(", "),
              time: p.shift,
            }))
          );
        }
      });
  }, [selectedShift]);

  // 🔹 Complete pickup
  const handleComplete = async (pickupId) => {
    const isProper = segregationStatus[pickupId] || false;

    await fetch("/api/pickup-requests/complete", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requestId: pickupId,
        segregationStatus: isProper ? "correct" : "incorrect",
      }),
    });

    setCompletedPickups([...completedPickups, pickupId]);

    const message = `Pickup completed! ${
      isProper ? "✅ Proper segregation" : "❌ Improper segregation"
    }`;
    setToastMessage(message);

    setTimeout(() => setToastMessage(""), 3000);
  };

  const isCompleted = (pickupId) => completedPickups.includes(pickupId);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          {toastMessage}
        </div>
      )}

      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl text-gray-900 font-semibold">
            Collector Portal
          </h1>
          <p className="text-sm text-gray-600">Ward 12, Guwahati</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => router.push("/collector")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => router.push("/collector/route")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <MapIcon className="w-5 h-5" />
            <span>Route Map</span>
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 text-blue-700 font-medium">
            <ClipboardCheck className="w-5 h-5" />
            <span>Pending Pickup</span>
          </button>

          <button
            onClick={() => router.push("/collector/summary")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <FileText className="w-5 h-5" />
            <span>Shift Summary</span>
          </button>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => router.push("/")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {/* 🔴 HEADER + FILTER */}
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h1 className="text-3xl text-gray-900 font-bold mb-2">
                Pending Pickups
              </h1>
              <p className="text-gray-600">
                Mark pickups as complete and verify segregation
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedShift("")}
                className="px-4 py-2 border rounded-md text-sm text-black"
              >
                All
              </button>
              <button
                onClick={() => setSelectedShift("morning")}
                className="px-4 py-2 border rounded-md text-sm text-black"
              >
                Morning
              </button>
              <button
                onClick={() => setSelectedShift("evening")}
                className="px-4 py-2 border rounded-md text-sm text-black"
              >
                Evening
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {pickupsToComplete.map((pickup) => (
              <div
                key={pickup.id}
                className={`bg-white rounded-lg shadow-sm border transition-opacity ${
                  isCompleted(pickup.id)
                    ? "opacity-60 border-green-500"
                    : "border-gray-200"
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <h3 className="font-medium text-lg text-gray-900">
                        {pickup.address}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {pickup.wasteType} • {pickup.time}
                      </p>

                      {!isCompleted(pickup.id) && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <label className="text-base mb-3 block font-medium text-gray-700">
                            Segregation Status
                          </label>

                          <button
                            type="button"
                            onClick={() =>
                              setSegregationStatus({
                                ...segregationStatus,
                                [pickup.id]: !segregationStatus[pickup.id],
                              })
                            }
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              segregationStatus[pickup.id]
                                ? "bg-green-600"
                                : "bg-gray-300"
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                segregationStatus[pickup.id]
                                  ? "translate-x-6"
                                  : "translate-x-1"
                              }`}
                            />
                          </button>
                        </div>
                      )}

                      {isCompleted(pickup.id) && (
                        <div className="mt-4 flex items-center gap-2 text-green-700">
                          <CheckCircle className="w-5 h-5" />
                          <span className="font-medium">
                            Pickup Completed
                          </span>
                        </div>
                      )}
                    </div>

                    <div>
                      {!isCompleted(pickup.id) ? (
                        <button
                          onClick={() => handleComplete(pickup.id)}
                          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors"
                        >
                          Mark as Completed
                        </button>
                      ) : (
                        <button
                          disabled
                          className="px-6 py-3 bg-gray-300 text-gray-500 font-medium rounded-md cursor-not-allowed flex items-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Completed
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {completedPickups.length > 0 && (
            <div className="mt-8">
              <button
                onClick={() => router.push("/collector/summary")}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
              >
                View Shift Summary
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
