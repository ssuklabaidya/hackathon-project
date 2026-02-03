"use client";

import { useRouter } from "next/navigation";
import { CalendarPlus, Award, AlertCircle, ArrowLeft } from "lucide-react";

export default function CitizenHome() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-6">

        <h1 className="text-2xl">Ward Waste Pickup</h1>
        <p className="text-white/90">Guwahati</p>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 max-w-2xl mx-auto">
        {/* Action Cards */}
        <div className="space-y-4 mb-8">
          <div
            className="bg-white rounded-lg shadow-sm border-2 border-transparent hover:border-green-500 cursor-pointer hover:shadow-lg transition-all"
            onClick={() => router.push("/citizen/pickup-request")}
          >
            <div className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CalendarPlus className="w-7 h-7 text-green-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg mb-1 font-semibold text-gray-900">
                    Request Pickup
                  </h2>
                  <p className="text-sm text-gray-600">
                    Schedule a waste collection
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="bg-white rounded-lg shadow-sm border-2 border-transparent hover:border-blue-500 cursor-pointer hover:shadow-lg transition-all"
            onClick={() => router.push("/citizen/points-list")}
          >
            <div className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Award className="w-7 h-7 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg mb-1 font-semibold text-gray-900">
                    My Points
                  </h2>
                  <p className="text-sm text-gray-600">
                    View rewards and pickup history
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border-2 border-transparent hover:border-orange-500 cursor-pointer hover:shadow-lg transition-all">
            <div className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-7 h-7 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg mb-1 font-semibold text-gray-900">
                    Report Overflow
                  </h2>
                  <p className="text-sm text-gray-600">
                    Report overflowing bins in your area
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
          <div className="text-3xl mb-2">♻️</div>
          <p className="text-gray-700">
            <strong>Segregate wet & dry waste for rewards</strong>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Proper segregation earns you points redeemable for civic benefits
          </p>
        </div>
      </div>
    </div>
  );
}