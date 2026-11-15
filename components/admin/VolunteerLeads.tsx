"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Search,
  Filter,
  RefreshCw,
  Mail,
  Phone,
  Trash2,
  Calendar,
  Sparkles,
  Inbox,
  X,
  ExternalLink,
  Award,
} from "lucide-react";

interface VolunteerLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  skills: string;
  message: string;
  status: "new" | "reviewed" | "contacted" | "archived";
  createdAt: string;
}

export default function VolunteerLeads() {
  const [leads, setLeads] = useState<VolunteerLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedLead, setSelectedLead] = useState<VolunteerLead | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.append("status", statusFilter);
      if (searchTerm.trim()) params.append("search", searchTerm.trim());

      const res = await fetch(`/api/admin/volunteers?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setLeads(data.items || []);
      } else {
        setError(data.message || "Failed to load volunteer applications.");
      }
    } catch {
      setError("Network error while loading volunteers.");
    } finally {
      setLoading(false);
    }
  }, [statusFilter, searchTerm]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleUpdateStatus = async (
    id: string,
    newStatus: VolunteerLead["status"]
  ) => {
    try {
      setActionLoading(true);
      const res = await fetch("/api/admin/volunteers", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) =>
          prev.map((lead) =>
            lead.id === id ? { ...lead, status: newStatus } : lead
          )
        );
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead({ ...selectedLead, status: newStatus });
        }
      } else {
        alert(data.message || "Failed to update status.");
      }
    } catch {
      alert("Error updating status.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setActionLoading(true);
      const res = await fetch("/api/admin/volunteers", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) => prev.filter((lead) => lead.id !== id));
        if (selectedLead?.id === id) setSelectedLead(null);
        setDeletingId(null);
      } else {
        alert(data.message || "Failed to delete application.");
      }
    } catch {
      alert("Error deleting application.");
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusBadge = (status: VolunteerLead["status"]) => {
    switch (status) {
      case "new":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-600 border border-amber-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            New
          </span>
        );
      case "reviewed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-600 border border-blue-500/20">
            Reviewed
          </span>
        );
      case "contacted":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
            Contacted
          </span>
        );
      case "archived":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-500/10 text-gray-500 border border-gray-500/20">
            Archived
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header controls */}
      <div className="bg-white rounded-2xl p-5 border border-ink/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-ink">Volunteer Applications</h2>
          <p className="text-xs text-ink/60 mt-0.5">
            Review people offering their time, skills, and knowledge to the community
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Status selector */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-cream border border-ink/15 text-ink text-xs font-medium rounded-xl pl-8 pr-8 py-2.5 focus:outline-none focus:ring-2 focus:ring-sun-500/40 cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="reviewed">Reviewed</option>
              <option value="contacted">Contacted</option>
              <option value="archived">Archived</option>
            </select>
            <Filter className="w-3.5 h-3.5 text-ink/40 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Search box */}
          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              placeholder="Search by name, skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-cream border border-ink/15 text-ink text-xs rounded-xl pl-8 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-sun-500/40 placeholder:text-ink/40"
            />
            <Search className="w-3.5 h-3.5 text-ink/40 absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Refresh button */}
          <button
            onClick={fetchLeads}
            disabled={loading}
            title="Refresh Leads"
            className="p-2.5 bg-cream hover:bg-cream/80 border border-ink/15 rounded-xl text-ink/70 hover:text-ink transition-colors disabled:opacity-50"
          >
            <RefreshCw
              className={`w-4 h-4 ${loading ? "animate-spin text-sun-500" : ""}`}
            />
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Applications list */}
      {loading ? (
        <div className="p-16 text-center bg-white rounded-2xl border border-ink/10">
          <RefreshCw className="w-8 h-8 text-sun-500 animate-spin mx-auto mb-3" />
          <p className="text-sm font-medium text-ink/70">
            Loading volunteer applications...
          </p>
        </div>
      ) : leads.length === 0 ? (
        <div className="p-16 text-center bg-white rounded-2xl border border-dashed border-ink/15">
          <Inbox className="w-10 h-10 text-ink/30 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-ink">
            No volunteer applications found
          </h3>
          <p className="text-xs text-ink/60 mt-1 max-w-sm mx-auto">
            {searchTerm || statusFilter !== "all"
              ? "No applications matched your filter criteria."
              : "When someone submits the Become a Volunteer form, their profile will appear here."}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-ink/10 shadow-sm overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-cream/60 border-b border-ink/10 text-ink/70 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">Volunteer</th>
                  <th className="py-3 px-4">Skills & Interests</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/5">
                {leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-cream/30 transition-colors group cursor-pointer"
                    onClick={() => setSelectedLead(lead)}
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-ink text-sm">
                        {lead.name}
                      </div>
                      <div className="text-ink/60 text-xs flex items-center gap-1.5 mt-0.5">
                        <Mail className="w-3 h-3 text-sun-500" />
                        {lead.email}
                      </div>
                      <div className="text-ink/60 text-xs flex items-center gap-1.5 mt-0.5">
                        <Phone className="w-3 h-3 text-teal-600" />
                        {lead.phone}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 max-w-md">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-100/60 text-teal-900 font-medium text-xs">
                        <Award className="w-3 h-3 text-teal-600" />
                        <span className="line-clamp-1">{lead.skills}</span>
                      </div>
                      <p className="text-ink/60 text-xs line-clamp-1 mt-1">
                        {lead.message}
                      </p>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap text-ink/60">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-ink/40" />
                        {new Date(lead.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {getStatusBadge(lead.status)}
                    </td>
                    <td
                      className="py-3.5 px-4 text-right whitespace-nowrap"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="px-2.5 py-1 text-xs font-medium rounded-lg bg-cream hover:bg-cream/80 text-ink/80 hover:text-ink border border-ink/10"
                        >
                          View
                        </button>
                        <button
                          onClick={() => setDeletingId(lead.id)}
                          className="p-1 text-ink/40 hover:text-red-600 rounded-md transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile / Tablet Cards View */}
          <div className="lg:hidden divide-y divide-ink/10">
            {leads.map((lead) => (
              <div
                key={lead.id}
                onClick={() => setSelectedLead(lead)}
                className="p-4 hover:bg-cream/40 transition-colors cursor-pointer space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-ink text-sm">
                      {lead.name}
                    </h3>
                    <div className="text-xs text-ink/60 mt-0.5 flex flex-wrap items-center gap-2">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-sun-500" />
                        {lead.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-teal-600" />
                        {lead.phone}
                      </span>
                    </div>
                  </div>
                  <div>{getStatusBadge(lead.status)}</div>
                </div>

                <div className="bg-cream/60 p-2.5 rounded-xl border border-ink/5 space-y-1.5">
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-teal-100/70 text-teal-900 text-xs font-medium">
                    <Sparkles className="w-3 h-3 text-sun-500" />
                    Skills: {lead.skills}
                  </div>
                  <p className="text-xs text-ink/70 line-clamp-2">
                    {lead.message}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-ink/50 pt-1">
                  <span>
                    {new Date(lead.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <div
                    className="flex items-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => setSelectedLead(lead)}
                      className="text-xs font-semibold text-sun-500 hover:text-sun-600"
                    >
                      View profile
                    </button>
                    <button
                      onClick={() => setDeletingId(lead.id)}
                      className="text-ink/40 hover:text-red-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-ink/15 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-5 border-b border-ink/10 flex items-center justify-between bg-cream/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-900 text-leaf-500 font-bold flex items-center justify-center text-sm shadow-sm">
                  {selectedLead.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-ink text-base">
                    {selectedLead.name}
                  </h3>
                  <p className="text-xs text-ink/60">
                    Applied on{" "}
                    {new Date(selectedLead.createdAt).toLocaleString("en-GB")}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1.5 rounded-full hover:bg-ink/5 text-ink/50 hover:text-ink"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {/* Contact info strip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-2xl bg-cream border border-ink/10 text-xs">
                <div>
                  <span className="text-ink/50 block font-medium">Email</span>
                  <a
                    href={`mailto:${selectedLead.email}`}
                    className="font-semibold text-teal-900 hover:text-sun-500 flex items-center gap-1.5 mt-0.5"
                  >
                    <Mail className="w-3.5 h-3.5 text-sun-500" />
                    {selectedLead.email}
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                </div>
                <div>
                  <span className="text-ink/50 block font-medium">Telephone</span>
                  <a
                    href={`tel:${selectedLead.phone}`}
                    className="font-semibold text-teal-900 hover:text-sun-500 flex items-center gap-1.5 mt-0.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-teal-600" />
                    {selectedLead.phone}
                  </a>
                </div>
              </div>

              {/* Skills */}
              <div>
                <span className="text-xs font-semibold text-ink/50 uppercase tracking-wider">
                  Skills, Experience or Area of Interest
                </span>
                <div className="mt-1 p-3 rounded-xl bg-teal-100/50 border border-teal-600/20 text-xs sm:text-sm font-semibold text-teal-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-sun-500 shrink-0" />
                  <span>{selectedLead.skills}</span>
                </div>
              </div>

              {/* Message */}
              <div>
                <span className="text-xs font-semibold text-ink/50 uppercase tracking-wider">
                  Motivation / Notes
                </span>
                <div className="mt-1.5 p-4 rounded-2xl bg-cream/50 border border-ink/10 text-xs sm:text-sm text-ink/90 whitespace-pre-wrap leading-relaxed">
                  {selectedLead.message}
                </div>
              </div>

              {/* Status Manager */}
              <div className="pt-2 border-t border-ink/10">
                <span className="text-xs font-semibold text-ink/60 block mb-2">
                  Update Application Status:
                </span>
                <div className="flex flex-wrap gap-2">
                  {(["new", "reviewed", "contacted", "archived"] as const).map(
                    (st) => (
                      <button
                        key={st}
                        onClick={() => handleUpdateStatus(selectedLead.id, st)}
                        disabled={actionLoading}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                          selectedLead.status === st
                            ? "bg-teal-900 text-white shadow-sm"
                            : "bg-cream hover:bg-cream/80 text-ink/70 border border-ink/10"
                        }`}
                      >
                        {st}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-cream/40 border-t border-ink/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${selectedLead.email}?subject=Volunteer Application - The Share Community`}
                  className="inline-flex items-center gap-2 px-3.5 py-2 bg-sun-500 hover:bg-sun-500/90 text-ink font-semibold text-xs rounded-xl transition-all shadow-sm"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Email Volunteer
                </a>
                <a
                  href={`tel:${selectedLead.phone}`}
                  className="inline-flex items-center gap-2 px-3 py-2 bg-cream hover:bg-cream/80 text-ink/80 border border-ink/15 font-semibold text-xs rounded-xl transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-teal-600" />
                  Call
                </a>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 text-xs font-medium text-ink/70 hover:text-ink"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 border border-ink/15 shadow-xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-ink text-base">Delete Application</h3>
              <p className="text-xs text-ink/60 mt-1">
                Are you sure you want to delete this volunteer application? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center gap-2 justify-center pt-2">
              <button
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 text-xs font-medium text-ink/70 hover:text-ink rounded-xl border border-ink/15"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deletingId)}
                disabled={actionLoading}
                className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors disabled:opacity-50"
              >
                {actionLoading ? "Deleting..." : "Delete Permanently"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
