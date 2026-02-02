"use client";

import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  MapIcon,
  ClipboardCheck,
  FileText,
  LogOut,
  Clock,
} from "lucide-react";

const pickupRequests = [
  {
    id: 1,
    address: "Ward 12, RGB Road",
    wasteType: "Wet Waste",
    time: "6:00 AM - 9:00 AM",
    status: "Pending",
  },
  {
    id: 2,
    address: "Ward 12, GS Road",
    wasteType: "Dry Waste",
    time: "6:00 AM - 9:00 AM",
    status: "Pending",
  },
  {
    id: 3,
    address: "Ward 12, Fancy Bazaar",
    wasteType: "E-Waste",
    time: "2:00 PM - 5:00 PM",
    status: "Pending",
  },
  {
    id: 4,
    address: "Ward 12, Paltan Bazaar",
    wasteType: "Wet Waste",
    time: "6:00 AM - 9:00 AM",
    status: "Completed",
  },
  {
    id: 5,
    address: "Ward 12, Uzanbazar",
    wasteType: "Dry Waste",
    time: "2:00 PM - 5:00 PM",
    status: "Pending",
  },
];

export default function CollectorDashboard() {
  const router = useRouter();

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
            onClick={() => router.push("/collector/dashboard")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 text-blue-700 font-medium"
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
            onClick={() => router.push("/collector/pickup-completion")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl text-gray-900 font-bold mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Today pickup schedule - February 2, 2026
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Pickups</p>
                  <p className="text-3xl font-bold text-gray-900">12</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <ClipboardCheck className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Completed</p>
                  <p className="text-3xl font-bold text-green-600">4</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <ClipboardCheck className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pending</p>
                  <p className="text-3xl font-bold text-orange-600">8</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pickup Requests Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Todays Pickup Requests
              </h2>
              <button
                onClick={() => router.push("/collector/route")}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
              >
                <MapIcon className="w-4 h-4" />
                View Route Map
              </button>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Waste Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time Slot
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pickupRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {request.address}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center gap-2">
                          <span>
                            {request.wasteType === "Wet Waste"
                              ? "🥬"
                              : request.wasteType === "Dry Waste"
                                ? "📄"
                                : "🔌"}
                          </span>
                          <span>{request.wasteType}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {request.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {request.status === "Completed" ? (
                          <span className="inline-flex px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                            Completed
                          </span>
                        ) : (
                          <span className="inline-flex px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                            Pending
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}