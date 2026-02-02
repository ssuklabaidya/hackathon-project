"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  MapIcon,
  ClipboardCheck,
  FileText,
  LogOut,
  CheckCircle,
  TrendingUp,
  Award,
} from "lucide-react";

export default function ShiftSummary() {
  const router = useRouter();

  // 🔹 STATE (logic only)
  const [summary, setSummary] = useState({
    totalPickups: 0,
    properPickups: 0,
    totalPoints: 0,
    waste: {
      wet: { total: 0, proper: 0 },
      dry: { total: 0, proper: 0 },
      "e-waste": { total: 0, proper: 0 },
    },
  });

  // 🔹 FETCH SUMMARY DATA (✅ FIXED)
  useEffect(() => {
    const fetchSummary = async () => {
      const res = await fetch("/api/pickup-requests/completed");
      const json = await res.json();

      if (!json.success || !json.data) return;

      setSummary(json.data);
    };

    fetchSummary();

    // optional near-real-time refresh
    const interval = setInterval(fetchSummary, 10000);
    return () => clearInterval(interval);
  }, []);

  const successRate =
    summary.totalPickups === 0
      ? 0
      : Math.round(
          (summary.properPickups / summary.totalPickups) * 100
        );

  return (
    <div className="min-h-screen bg-gray-50 flex">
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

          <button
            onClick={() => router.push("/collector/completion")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <ClipboardCheck className="w-5 h-5" />
            <span>Complete Pickup</span>
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 text-blue-700 font-medium">
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
          <div className="mb-8">
            <h1 className="text-3xl text-gray-900 font-bold mb-2">
              End of Shift Summary
            </h1>
            <p className="text-gray-600">
              Your performance for February 2, 2026
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border-2 border-blue-200">
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ClipboardCheck className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-4xl font-bold mb-2 text-blue-600">
                  {summary.totalPickups}
                </h2>
                <p className="text-gray-700">Total Pickups Completed</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border-2 border-green-200">
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-4xl font-bold mb-2 text-green-600">
                  {successRate}%
                </h2>
                <p className="text-gray-700">Segregation Success Rate</p>
                <p className="text-sm text-gray-600 mt-2">
                  {summary.properPickups} out of {summary.totalPickups} proper
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border-2 border-yellow-200">
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-yellow-600" />
                </div>
                <h2 className="text-4xl font-bold mb-2 text-yellow-600">
                  {summary.totalPoints}
                </h2>
                <p className="text-gray-700">
                  Total Citizen Points Awarded
                </p>
              </div>
            </div>
          </div>

          {/* Breakdown */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Pickup Breakdown
              </h2>

              <div className="space-y-4">
                {["wet", "dry", "e-waste"].map((type) => (
                  <div
                    key={type}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{type}</p>
                      <p className="text-sm text-gray-600">
                        {summary.waste[type].total} pickups •{" "}
                        {summary.waste[type].proper} properly segregated
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-black">
                        {summary.waste[type].total === 0
                          ? 0
                          : Math.round(
                              (summary.waste[type].proper /
                                summary.waste[type].total) *
                                100
                            )}
                        %
                      </p>
                      <p className="text-sm text-gray-600">Success Rate</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Performance Badge remains unchanged */}
        </div>
      </div>
    </div>
  );
}
