"use client";

import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useRoute } from "@/app/context/RouteContext";
import {
  LayoutDashboard,
  MapIcon,
  ClipboardCheck,
  FileText,
  LogOut,
  Navigation,
} from "lucide-react";

/**
 * Normalize lat/lng into % positions inside the map container
 */
function normalizePositions(route, padding = 15) {
  if (!route || route.length === 0) return [];

  const lats = route.map((r) => r.lat);
  const lngs = route.map((r) => r.lng);

  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  const usableRange = 100 - padding * 2;

  return route.map((stop) => {
    const left =
      padding +
      ((stop.lng - minLng) / (maxLng - minLng || 1)) * usableRange;

    const top =
      padding +
      (1 - (stop.lat - minLat) / (maxLat - minLat || 1)) * usableRange;

    return { top, left };
  });
}

export default function RouteGeneration() {
  const router = useRouter();
  const { routeData, setRouteData } = useRoute();

  const [loading, setLoading] = useState(false);
  const mapRef = useRef(null);
  const [mapSize, setMapSize] = useState({ width: 0, height: 0 });

  const routeGenerated = !!routeData;

  // Track map container size for accurate SVG points
  useEffect(() => {
    const updateSize = () => {
      if (mapRef.current) {
        const rect = mapRef.current.getBoundingClientRect();
        setMapSize({ width: rect.width, height: rect.height });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [routeGenerated]);

  const handleGenerateRoute = async () => {
    if (routeData) return; // prevent duplicate generation

    setLoading(true);
    try {
      const res = await fetch("/api/collectors/route");
      const data = await res.json();

      if (data.success) {
        setRouteData(data);
      } else {
        alert(data.message || "Failed to generate route");
      }
    } catch (err) {
      console.error(err);
      alert("Error generating route");
    } finally {
      setLoading(false);
    }
  };

  // ─── Old UI helper functions ───────────────────────────────────────
  const getWasteEmoji = (wasteTypes) => {
    if (wasteTypes?.includes("wet")) return "🥬";
    if (wasteTypes?.includes("dry")) return "📄";
    if (wasteTypes?.includes("e-waste")) return "🔌";
    return "🗑️";
  };

  const getWasteLabel = (wasteTypes) => {
    return wasteTypes?.join(", ").toUpperCase() || "";
  };

  const positions = routeData ? normalizePositions(routeData.route) : [];

  const getSvgPoints = () => {
    if (!positions.length || !mapSize.width) return "";
    return positions
      .map((pos) => {
        const x = (pos.left / 100) * mapSize.width;
        const y = (pos.top / 100) * mapSize.height;
        return `${x},${y}`;
      })
      .join(" ");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar ── same as old */}
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
          <p className="text-gray-600">Plan the most efficient collection route</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Map Area ── old layout + new dynamic pins & line */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Route Map</h2>
                <button
                  onClick={handleGenerateRoute}
                  disabled={loading}
                  className={`flex items-center gap-2 px-4 py-2 font-medium rounded-md transition-colors ${
                    loading
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  <Navigation className="w-4 h-4" />
                  {loading ? "Generating..." : "Generate Optimized Route"}
                </button>
              </div>

              <div
                ref={mapRef}
                className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg h-[500px] relative border-2 border-gray-200 overflow-hidden"
              >
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
                  <>
                    {/* Dynamic route line */}
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      style={{ zIndex: 0 }}
                    >
                      <polyline
                        points={getSvgPoints()}
                        stroke="#3b82f6"
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray="8,5"
                      />
                    </svg>

                    {/* Pins with old-style house label below */}
                    {routeData?.route.map((location, index) => {
                      const pos = positions[index] || { top: 50, left: 50 };
                      return (
                        <div
                          key={location.pickupRequestId}
                          className="absolute"
                          style={{
                            top: `${pos.top}%`,
                            left: `${pos.left}%`,
                            transform: "translate(-50%, -50%)",
                          }}
                        >
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-8 h-8 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold ${
                                index === 0 ? "bg-green-500" : "bg-blue-500"
                              }`}
                            >
                              {index + 1}
                            </div>
                            <div className="text-xs mt-1 bg-white px-2 py-1 rounded shadow">
                              {location.houseId}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Ordered Pickup List ── almost identical to old */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {routeGenerated ? "Optimized Route Order" : "Pickup Locations"}
              </h2>

              {!routeGenerated ? (
                <div className="text-center py-12 text-gray-500">
                  <MapIcon className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p>Generate a route to see pickup locations</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {routeData?.route.map((location, index) => (
                    <div
                      key={location.pickupRequestId}
                      className={`p-4 border-2 rounded-lg transition-colors ${
                        index === 0
                          ? "border-green-500 bg-green-50"
                          : index === 1
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold ${
                            index === 0
                              ? "bg-green-600 text-white"
                              : index === 1
                              ? "bg-blue-600 text-white"
                              : "bg-gray-300 text-gray-700"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-gray-900">
                              House {location.houseId}
                            </span>
                            {index === 0 && (
                              <span className="inline-flex px-3 py-1 bg-green-600 text-white text-xs font-medium rounded-full">
                                Current Stop
                              </span>
                            )}
                            {index === 1 && (
                              <span className="inline-flex px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                                Next Stop
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                            <span>{getWasteEmoji(location.wasteTypes)}</span>
                            <span>{getWasteLabel(location.wasteTypes)}</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {routeGenerated && routeData && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <p className="text-sm text-gray-700">
                    <strong>Total Stops:</strong> {routeData.totalStops} •{" "}
                    <strong>Total Distance:</strong>{" "}
                    {routeData.totalDistanceKm.toFixed(2)} km
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