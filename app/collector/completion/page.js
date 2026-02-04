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

  // ── New states for failure reporting ────────────────────────────────
  const [failingPickupId, setFailingPickupId] = useState(null);
  const [failIssueType, setFailIssueType] = useState("");
  const [failDescription, setFailDescription] = useState("");

  // Fetch pending pickups (with optional shift filter)
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

  // Complete pickup
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

  // Report failure
  const handleReportFailure = async (pickupId) => {
    if (!failIssueType) {
      setToastMessage("Please select a reason");
      setTimeout(() => setToastMessage(""), 3000);
      return;
    }

    try {
      const res = await fetch("/api/admin/issues/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pickupRequestId: pickupId,
          collectorId: "C01", // ← Replace with actual collector ID from auth
          issueType: failIssueType,
          description: failDescription.trim() || "No description provided",
        }),
      });

      if (res.ok) {
        setToastMessage(`Issue reported: ${failIssueType}`);
        // Optional: mark as completed / handled
        setCompletedPickups((prev) => [...prev, pickupId]);
      } else {
        setToastMessage("Failed to report issue");
      }
    } catch (err) {
      setToastMessage("Network error – please try again");
    }

    // Reset & close form
    setFailingPickupId(null);
    setFailIssueType("");
    setFailDescription("");
    setTimeout(() => setToastMessage(""), 4000);
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
          {/* HEADER + FILTER */}
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
                        <>
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

                          {/* Failure reporting form */}
                          {failingPickupId === pickup.id && (
                            <div className="mt-5 p-4 bg-red-50 border border-red-200 rounded-lg">
                              <div className="flex items-center justify-between mb-3">
                                <h4 className="font-medium text-red-800">
                                  Report Failure
                                </h4>
                                <button
                                  onClick={() => setFailingPickupId(null)}
                                  className="text-red-700 hover:text-red-900"
                                >
                                  <X className="w-5 h-5" />
                                </button>
                              </div>

                              <select
                                value={failIssueType}
                                onChange={(e) => setFailIssueType(e.target.value)}
                                className="w-full p-2.5 border border-gray-300 rounded mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                              >
                                <option value="">Select reason</option>
                                <option value="EMPTY_BIN">EMPTY_BIN</option>
                                <option value="WASTE_NOT_AVAILABLE">WASTE_NOT_AVAILABLE</option>
                                <option value="HOUSE_CLOSED">HOUSE_CLOSED</option>
                                <option value="WRONG_WASTE_TYPE">WRONG_WASTE_TYPE</option>
                                <option value="COLLECTOR_MISCONDUCT">COLLECTOR_MISCONDUCT</option>
                              </select>

                              <textarea
                                value={failDescription}
                                onChange={(e) => setFailDescription(e.target.value)}
                                placeholder="Additional details (optional)"
                                rows={3}
                                className="w-full p-2.5 border border-gray-300 rounded text-sm resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
                              />

                              <div className="mt-4 flex gap-3">
                                <button
                                  onClick={() => handleReportFailure(pickup.id)}
                                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors"
                                >
                                  Submit Issue
                                </button>
                                <button
                                  onClick={() => setFailingPickupId(null)}
                                  className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md text-sm transition-colors"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}
                        </>
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

                    <div className="flex flex-col gap-3 items-end">
                      {!isCompleted(pickup.id) ? (
                        <>
                          <button
                            onClick={() => handleComplete(pickup.id)}
                            className="px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors"
                          >
                          Sucess
                          </button>

                          <button
                            onClick={() => {
                              setFailingPickupId(pickup.id);
                              setFailIssueType("");
                              setFailDescription("");
                            }}
                            className="px-6 py-2.5 bg-red-100 hover:bg-red-200 text-red-700 font-medium rounded-md transition-colors text-sm"
                          >
                            Failed
                          </button>
                        </>
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