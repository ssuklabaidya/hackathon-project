"use client";

import { useEffect, useState } from "react";
import { Star, Search, Trophy } from "lucide-react";

export default function PointsLeaderboard() {
  const [households, setHouseholds] = useState([]);
  const [myHouse, setMyHouse] = useState(null);
  const [houseId, setHouseId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/households/learderboard?sort=points")
      .then(res => res.json())
      .then(data => {
        if (data.success) setHouseholds(data.data);
      });
  }, []);

  const searchHouse = async () => {
    if (!houseId) return;
    setLoading(true);
    const res = await fetch(`/api/households/learderboard?houseId=${houseId}`);
    const data = await res.json();
    setMyHouse(data.success ? data.data : null);
    setLoading(false);
  };

  const getRankBadge = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return rank;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-6 py-8">
        <h1 className="text-2xl font-semibold">Points & Leaderboard</h1>
        <p className="text-white/90 text-sm mt-1">
          Track your performance among households
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">

        {/* My Points Card */}
        <div className="relative overflow-hidden rounded-xl bg-white shadow-md border">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full -translate-y-10 translate-x-10" />
          <div className="p-6 flex items-center justify-between relative">
            <div>
              <div className="flex items-center gap-2 text-gray-600">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="font-medium">My Points</span>
              </div>
              <div className="text-4xl font-bold text-green-700 mt-2">
                {myHouse ? myHouse.points : "--"}
              </div>
            </div>

            <Trophy className="w-10 h-10 text-green-400" />
          </div>

          {/* Search */}
          <div className="px-6 pb-6 flex gap-3">
            <input
              value={houseId}
              onChange={(e) => setHouseId(e.target.value)}
              placeholder="Search House ID (e.g. H12)"
              className="flex-1 h-11 px-4 text-black rounded-lg border focus:ring-2 focus:ring-green-500 outline-none"
            />
            <button
              onClick={searchHouse}
              className="h-11 px-5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Search
            </button>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-xl shadow-md border">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Household Leaderboard
            </h2>

            {loading && (
              <p className="text-sm text-gray-500">Loading…</p>
            )}

            <div className="space-y-3">
              {households.map((house, index) => {
                const rank = index + 1;
                const isMe = myHouse?.houseId === house.houseId;

                return (
                  <div
                    key={house.houseId}
                    className={`flex items-center justify-between p-4 rounded-lg border transition
                      ${isMe
                        ? "bg-green-50 border-green-400"
                        : "bg-gray-50 hover:bg-gray-100"
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-9 h-9 flex items-center justify-center rounded-full font-semibold
                          ${rank <= 3
                            ? "bg-green-600 text-white"
                            : "bg-green-100 text-green-700"
                          }`}
                      >
                        {getRankBadge(rank)}
                      </div>

                      <div className="font-medium text-gray-800">
                        House {house.houseId}
                        {isMe && (
                          <span className="ml-2 text-xs text-green-600 font-semibold">
                            (You)
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-green-700 font-semibold">
                      {house.points} pts
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
