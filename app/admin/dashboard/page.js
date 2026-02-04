"use client"
import { useState } from "react";
import {
    LayoutDashboard,
    Users,
    ClipboardList,
    Truck,
    BarChart3,
    AlertTriangle,
    MessageSquare,
    AlertOctagon,
    LogOut
} from "lucide-react";

export default function AdminDashboard() {
    const navigate = (path) => {
        window.location.href = path;
    };

    const stats = [
        { label: "Total Users", value: "1,247", icon: Users, color: "blue" },
        { label: "Active Pickups", value: "89", icon: ClipboardList, color: "orange" },
        { label: "Open Complaints", value: "3", icon: AlertTriangle, color: "red" },
        { label: "Ref Feedback", value: "4.8", icon: MessageSquare, color: "yellow" },
    ];

    const colorClasses = {
        blue: "bg-blue-100 text-blue-600",
        orange: "bg-orange-100 text-orange-600",
        green: "bg-green-100 text-green-600",
        purple: "bg-purple-100 text-purple-600",
        red: "bg-red-100 text-red-600",
        yellow: "bg-yellow-100 text-yellow-600",
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
                <div className="p-6 border-b border-gray-200">
                    <h1 className="text-xl text-gray-900">Admin Panel</h1>
                    <p className="text-sm text-gray-600">WasteTurn Management</p>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 text-blue-700">
                        <LayoutDashboard className="w-5 h-5" />
                        <span>Dashboard</span>
                    </button>
                    <button onClick={() => navigate("/admin/users")} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
                        <Users className="w-5 h-5" />
                        <span>User Management</span>
                    </button>
                    <button onClick={() => navigate("/admin/pickups")} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
                        <ClipboardList className="w-5 h-5" />
                        <span>Pickup Requests</span>
                    </button>
                    <button onClick={() => navigate("/admin/collectors")} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
                        <Truck className="w-5 h-5" />
                        <span>Collectors</span>
                    </button>
                    <button onClick={() => navigate("/admin/complaints")} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
                        <AlertTriangle className="w-5 h-5" />
                        <span>Complaints</span>
                    </button>
                    <button onClick={() => navigate("/admin/feedback")} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
                        <MessageSquare className="w-5 h-5" />
                        <span>Feedback</span>
                    </button>
                    <button onClick={() => navigate("/admin/penalties")} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
                        <AlertOctagon className="w-5 h-5" />
                        <span>Penalties</span>
                    </button>
                    <button onClick={() => navigate("/admin/analytics")} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
                        <BarChart3 className="w-5 h-5" />
                        <span>Analytics</span>
                    </button>
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <button
                        onClick={() => navigate("/")}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
                <div className="mb-8">
                    <h1 className="text-3xl text-gray-900 mb-2">Dashboard</h1>
                    <p className="text-gray-600">Overview of system statistics</p>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;

                        return (
                            <div key={index} className="bg-white rounded-xl border text-black border-gray-200 shadow-sm">
                                <div className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                                            <p className="text-3xl font-semibold">{stat.value}</p>
                                        </div>
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClasses[stat.color]}`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm text-black">
                    <div className="p-6">
                        <h2 className="text-xl mb-4">Quick Actions</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <button
                                onClick={() => navigate("/admin/users")}
                                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
                            >
                                <Users className="w-6 h-6 text-blue-600 mb-2" />
                                <p className="font-medium">Manage Users</p>
                                <p className="text-sm text-gray-600">View and manage all users</p>
                            </button>
                            <button
                                onClick={() => navigate("/admin/pickups")}
                                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
                            >
                                <ClipboardList className="w-6 h-6 text-orange-600 mb-2" />
                                <p className="font-medium">View Pickups</p>
                                <p className="text-sm text-gray-600">Monitor pickup requests</p>
                            </button>
                            <button
                                onClick={() => navigate("/admin/complaints")}
                                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
                            >
                                <AlertTriangle className="w-6 h-6 text-red-600 mb-2" />
                                <p className="font-medium">Complaints</p>
                                <p className="text-sm text-gray-600">Resolve user issues</p>
                            </button>
                            <button
                                onClick={() => navigate("/admin/penalties")}
                                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
                            >
                                <AlertOctagon className="w-6 h-6 text-yellow-600 mb-2" />
                                <p className="font-medium">Penalties</p>
                                <p className="text-sm text-gray-600">Manage violations</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}