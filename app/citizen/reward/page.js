"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle, Star, Calendar, MapPin } from "lucide-react";

export default function PickupStatus() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-6">

        <h1 className="text-2xl">Pickup Status & Rewards</h1>
        <p className="text-white/90">Track your collection and points</p>
      </div>

      {/* Content */}
      <div className="px-4 py-6 max-w-2xl mx-auto space-y-6">
        {/* Current Pickup Status */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Current Pickup
              </h2>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                Scheduled
              </span>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-gray-700">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span>Tomorrow, Feb 3 • Morning (6:00 AM - 9:00 AM)</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span>Ward 12, RGB Road, Guwahati</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🥬</span>
                <span className="text-gray-700">Wet Waste</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-600">
                Collector will arrive during the scheduled time slot. Please keep
                waste ready at the pickup point.
              </p>
            </div>
          </div>
        </div>

        {/* Points Display */}
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-lg shadow-sm">
          <div className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="w-6 h-6 text-yellow-600 fill-yellow-600" />
              <h2 className="text-2xl font-semibold text-gray-900">
                Total Points
              </h2>
            </div>
            <div className="text-5xl mb-4 text-yellow-700 font-bold">450</div>
            <p className="text-sm text-gray-600 mb-4">
              Youve earned points from 15 successful pickups
            </p>
            <button className="px-6 py-2 border-2 border-yellow-600 text-yellow-700 bg-white hover:bg-yellow-100 font-medium rounded-md transition-colors">
              Redeem Rewards
            </button>
          </div>
        </div>

        {/* Recent Pickups */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Recent Pickups
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3 pb-4 border-b border-gray-200">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900">Dry Waste</span>
                    <span className="text-green-600 font-medium">+30 pts</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Collected on Jan 30, 2026 • Properly segregated ✅
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pb-4 border-b border-gray-200">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900">Wet Waste</span>
                    <span className="text-green-600 font-medium">+30 pts</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Collected on Jan 28, 2026 • Properly segregated ✅
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900">E-Waste</span>
                    <span className="text-green-600 font-medium">+50 pts</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Collected on Jan 25, 2026 • Properly segregated ✅
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => router.push("/citizen/request")}
          className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors"
        >
          Schedule Next Pickup
        </button>
      </div>
    </div>
  );
}