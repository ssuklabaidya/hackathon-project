"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  MapIcon,
  ClipboardCheck,
  FileText,
  LogOut,
  Navigation,
} from "lucide-react";

const pickupLocations = [
  {
    id: 1,
    address: "Ward 12, RGB Road",
    wasteType: "Wet Waste",
    status: "current",
  },
  {
    id: 2,
    address: "Ward 12, GS Road",
    wasteType: "Dry Waste",
    status: "next",
  },
  {
    id: 3,
    address: "Ward 12, Fancy Bazaar",
    wasteType: "E-Waste",
    status: "upcoming",
  },
  {
    id: 4,
    address: "Ward 12, Uzanbazar",
    wasteType: "Dry Waste",
    status: "upcoming",
  },
  {
    id: 5,
    address: "Ward 12, Paltan Bazaar",
    wasteType: "Wet Waste",
    status: "upcoming",
  },
];

export default function RouteGeneration() {
  const router = useRouter();
  const [routeGenerated, setRouteGenerated] = useState(false);

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
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 text-blue-700 font-medium">
            <MapIcon className="w-5 h-5" />
            <span>Route Map</span>
          </button>
          <button
            onClick={() => router.push("/collector/completion")}
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
        <div className="mb-8">
          <h1 className="text-3xl text-gray-900 font-bold mb-2">
            Route Optimization
          </h1>
          <p className="text-gray-600">
            Plan the most efficient collection route
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Map Area */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Route Map
                </h2>
                <button
                  onClick={() => setRouteGenerated(true)}
                  disabled={routeGenerated}
                  className={`flex items-center gap-2 px-4 py-2 font-medium rounded-md transition-colors ${
                    routeGenerated
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  <Navigation className="w-4 h-4" />
                  Generate Optimized Route
                </button>
              </div>

              {/* Mock Map */}
              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg h-[500px] relative border-2 border-gray-200 overflow-hidden">
                {!routeGenerated ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">
                        Click Generate Optimized Route to view map
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 relative h-full">
                    {/* Mock map with pins */}
                    <div className="absolute top-[20%] left-[30%]">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold">
                          1
                        </div>
                        <div className="text-xs mt-1 bg-white px-2 py-1 rounded shadow">
                          RGB Road
                        </div>
                      </div>
                    </div>

                    <div className="absolute top-[40%] left-[60%]">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-blue-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold">
                          2
                        </div>
                        <div className="text-xs mt-1 bg-white px-2 py-1 rounded shadow">
                          GS Road
                        </div>
                      </div>
                    </div>

                    <div className="absolute top-[60%] left-[50%]">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-blue-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold">
                          3
                        </div>
                        <div className="text-xs mt-1 bg-white px-2 py-1 rounded shadow">
                          Fancy Bazaar
                        </div>
                      </div>
                    </div>

                    <div className="absolute top-[70%] left-[25%]">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-blue-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold">
                          4
                        </div>
                        <div className="text-xs mt-1 bg-white px-2 py-1 rounded shadow">
                          Uzanbazar
                        </div>
                      </div>
                    </div>

                    <div className="absolute top-[35%] left-[40%]">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-blue-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold">
                          5
                        </div>
                        <div className="text-xs mt-1 bg-white px-2 py-1 rounded shadow">
                          Paltan Bazaar
                        </div>
                      </div>
                    </div>

                    {/* Route line indicator */}
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      style={{ zIndex: 0 }}
                    >
                      <path
                        d="M 150 100 L 320 200 L 270 300 L 130 350 L 210 175"
                        stroke="#3b82f6"
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray="5,5"
                        opacity="0.5"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Ordered Pickup List */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {routeGenerated ? "Optimized Route Order" : "Pickup Locations"}
              </h2>

              <div className="space-y-3">
                {pickupLocations.map((location, index) => (
                  <div
                    key={location.id}
                    className={`p-4 border-2 rounded-lg transition-colors ${
                      routeGenerated && location.status === "current"
                        ? "border-green-500 bg-green-50"
                        : routeGenerated && location.status === "next"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold ${
                          routeGenerated && location.status === "current"
                            ? "bg-green-600 text-white"
                            : routeGenerated && location.status === "next"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-300 text-gray-700"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-gray-900">
                            {location.address}
                          </span>
                          {routeGenerated && location.status === "current" && (
                            <span className="inline-flex px-3 py-1 bg-green-600 text-white text-xs font-medium rounded-full">
                              Current Stop
                            </span>
                          )}
                          {routeGenerated && location.status === "next" && (
                            <span className="inline-flex px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                              Next Stop
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>
                            {location.wasteType === "Wet Waste"
                              ? "🥬"
                              : location.wasteType === "Dry Waste"
                              ? "📄"
                              : "🔌"}
                          </span>
                          <span>{location.wasteType}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {routeGenerated && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <p className="text-sm text-gray-700">
                    <strong>Total Distance:</strong> 8.5 km •{" "}
                    <strong>Estimated Time:</strong> 45 minutes
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}