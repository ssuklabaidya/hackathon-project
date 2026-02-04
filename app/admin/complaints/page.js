"use client";

import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Truck,
  BarChart3,
  AlertTriangle,
  MessageSquare,
  AlertOctagon,
  LogOut,
  Search,
  X,
} from "lucide-react";

export default function ComplaintManagement() {
  const navigate = (path) => {
    window.location.href = path;
  };

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [resolutionNote, setResolutionNote] = useState("");
  const [selectedAction, setSelectedAction] = useState("no_action"); // default

  // Fetch real data from API
  useEffect(() => {
    async function fetchIssues() {
      try {
        setLoading(true);
        const res = await fetch("/api/admin/issues");
        const result = await res.json();

        if (!result.success) {
          console.error("API error:", result.message);
          return;
        }

        const mapped = result.data.map((item) => ({
          id: item._id,
          user: item.houseId,
          type: item.issueType,
          description: item.description || "No description provided",
          status:
            item.status === "reported"
              ? "Open"
              : item.status === "resolved"
              ? "Resolved"
              : "Reviewed",
          date: new Date(item.reportedAt).toISOString().split("T")[0],
          priority: determinePriority(item),
          collectorId: item.collectorId,
          adminAction: item.adminAction,
          adminRemark: item.adminRemark,
          resolvedAt: item.resolvedAt,
        }));

        setComplaints(mapped);
      } catch (err) {
        console.error("Failed to load issues:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchIssues();
  }, []);

  function determinePriority(item) {
    if (["EMPTY_BIN", "HOUSE_CLOSED"].includes(item.issueType)) return "High";
    if (["WASTE_NOT_AVAILABLE", "WRONG_WASTE_TYPE"].includes(item.issueType)) return "Medium";
    if (item.issueType === "COLLECTOR_MISCONDUCT") return "High";
    return "Medium";
  }

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || complaint.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Now sends real PATCH request
  const handleResolve = async () => {
    if (!selectedComplaint) return;

    try {
      const payload = {
        issueId: selectedComplaint.id,
        adminAction: selectedAction,
        adminRemark: resolutionNote.trim() || "No remark provided",
      };

      const res = await fetch("/api/admin/issues/review", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to resolve issue");
      }

      // Update local state on success
      setComplaints((prev) =>
        prev.map((c) =>
          c.id === selectedComplaint.id ? { ...c, status: "Resolved" } : c
        )
      );

      // Reset form
      setResolutionNote("");
      setSelectedAction("no_action");
      setSelectedComplaint(null);

      // Optional: show success toast/message
      console.log("Issue resolved successfully");
    } catch (err) {
      console.error("Error resolving issue:", err);
      alert("Failed to resolve issue. Please try again.");
    }
  };

  const priorityStyle = (priority) => {
    if (priority === "High") return "bg-red-100 text-black";
    if (priority === "Medium") return "bg-orange-100 text-black";
    return "bg-blue-100 text-black";
  };

  const statusStyle = (status) => {
    return status === "Resolved"
      ? "bg-green-100 text-black"
      : "bg-yellow-100 text-black";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl text-black">Loading complaints...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar – unchanged */}

      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl text-black">Admin Panel</h1>
          <p className="text-sm text-black">WasteTurn Management</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <button
            onClick={() => navigate("/admin")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-black hover:bg-gray-100"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => navigate("/admin/users")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-black hover:bg-gray-100"
          >
            <Users className="w-5 h-5" />
            <span>User Management</span>
          </button>
          <button
            onClick={() => navigate("/admin/pickups")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-black hover:bg-gray-100"
          >
            <ClipboardList className="w-5 h-5" />
            <span>Pickup Requests</span>
          </button>
          <button
            onClick={() => navigate("/admin/collectors")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-black hover:bg-gray-100"
          >
            <Truck className="w-5 h-5" />
            <span>Collectors</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 text-black">
            <AlertTriangle className="w-5 h-5" />
            <span>Complaints</span>
          </button>
          <button
            onClick={() => navigate("/admin/feedback")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-black hover:bg-gray-100"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Feedback</span>
          </button>
          <button
            onClick={() => navigate("/admin/penalties")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-black hover:bg-gray-100"
          >
            <AlertOctagon className="w-5 h-5" />
            <span>Penalties</span>
          </button>
          <button
            onClick={() => navigate("/admin/analytics")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-black hover:bg-gray-100"
          >
            <BarChart3 className="w-5 h-5" />
            <span>Analytics</span>
          </button>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-black hover:bg-gray-100"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl text-black mb-2">Complaint Management</h1>
          <p className="text-black">Review and resolve user complaints</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-black" />
                <input
                  type="text"
                  placeholder="Search by user or type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Status</option>
                <option value="Open">Open</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-sm font-semibold text-black">User</th>
                    <th className="px-4 py-3 text-sm font-semibold text-black">Type</th>
                    <th className="px-4 py-3 text-sm font-semibold text-black">Description</th>
                    <th className="px-4 py-3 text-sm font-semibold text-black">Priority</th>
                    <th className="px-4 py-3 text-sm font-semibold text-black">Date</th>
                    <th className="px-4 py-3 text-sm font-semibold text-black">Status</th>
                    <th className="px-4 py-3 text-sm font-semibold text-black">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredComplaints.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-8 text-black">
                        No complaints found.
                      </td>
                    </tr>
                  ) : (
                    filteredComplaints.map((complaint) => (
                      <tr key={complaint.id} className="border-t border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-black">{complaint.user}</td>
                        <td className="px-4 py-3 text-black">{complaint.type}</td>
                        <td className="px-4 py-3 text-black max-w-xs truncate" title={complaint.description}>
                          {complaint.description}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${priorityStyle(complaint.priority)}`}>
                            {complaint.priority}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-black">{complaint.date}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${statusStyle(complaint.status)}`}>
                            {complaint.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {complaint.status === "Open" ? (
                            <button
                              onClick={() => setSelectedComplaint(complaint)}
                              className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-black border border-blue-200 rounded-lg text-sm"
                            >
                              Resolve
                            </button>
                          ) : (
                            <span className="text-sm text-black">Archived</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-4 text-sm text-black">
              Showing {filteredComplaints.length} of {complaints.length} complaints
            </div>
          </div>
        </div>
      </div>

      {/* Updated Resolve Modal – added dropdown */}
      {selectedComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black opacity-40"
            onClick={() => {
              setSelectedComplaint(null);
              setResolutionNote("");
              setSelectedAction("no_action");
            }}
          ></div>
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-black">Resolve Complaint</h2>
              <button
                onClick={() => {
                  setSelectedComplaint(null);
                  setResolutionNote("");
                  setSelectedAction("no_action");
                }}
                className="text-black hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-gray-50 p-3 rounded-md mb-4">
              <p className="text-sm font-medium text-black">Complaint Details</p>
              <p className="text-sm text-black mt-1">{selectedComplaint.description}</p>
            </div>

            {/* New dropdown for adminAction */}
            <div className="mb-6">
              <label htmlFor="action" className="block text-sm font-medium text-black mb-1">
                Admin Action
              </label>
              <select
                id="action"
                value={selectedAction}
                onChange={(e) => setSelectedAction(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="warning">Warning</option>
                <option value="points_deducted">Points Deducted</option>
                <option value="fine">Fine</option>
                <option value="no_action">No Action</option>
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="note" className="block text-sm font-medium text-black mb-1">
                Resolution Note / Remark
              </label>
              <textarea
                id="note"
                placeholder="Describe how the issue was resolved..."
                value={resolutionNote}
                onChange={(e) => setResolutionNote(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setSelectedComplaint(null);
                  setResolutionNote("");
                  setSelectedAction("no_action");
                }}
                className="px-4 py-2 border border-gray-200 rounded-lg text-black hover:bg-gray-50 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleResolve}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm"
              >
                Mark Resolved
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}