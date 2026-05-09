"use client";

import { useState, useMemo } from "react";
import type { Job, ClearanceLevel, JobStatus, Industry } from "@/types/job";

const INDUSTRY_COLORS: Record<string, string> = {
  Cybersecurity: "bg-blue-900/60 text-blue-300",
  "Finance/AML": "bg-green-900/60 text-green-300",
  Nonprofit: "bg-purple-900/60 text-purple-300",
  "Tech/Trust & Safety": "bg-orange-900/60 text-orange-300",
  Law: "bg-amber-900/60 text-amber-300",
  Media: "bg-pink-900/60 text-pink-300",
  Government: "bg-gray-700 text-gray-300",
  Other: "bg-slate-700 text-slate-300",
};

const CLEARANCE_COLORS: Record<string, string> = {
  None: "bg-emerald-900/60 text-emerald-300",
  Preferred: "bg-yellow-900/60 text-yellow-300",
  Required: "bg-red-900/60 text-red-300",
  Unknown: "bg-gray-700 text-gray-400",
};

const STATUS_COLORS: Record<string, string> = {
  New: "bg-blue-500",
  Reviewing: "bg-yellow-500",
  Applied: "bg-green-500",
  Interviewing: "bg-indigo-500",
  Rejected: "bg-red-400",
  Offer: "bg-purple-500",
};

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function Badge({ label, colorClass }: { label: string; colorClass: string }) {
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${colorClass}`}>
      {label}
    </span>
  );
}

function StatusDot({ status }: { status: JobStatus | null }) {
  const color = status ? STATUS_COLORS[status] : "bg-gray-600";
  return (
    <span className="flex items-center gap-1.5 text-sm font-medium text-gray-300 shrink-0">
      <span className={`w-2 h-2 rounded-full ${color}`} />
      {status ?? "—"}
    </span>
  );
}

function JobCard({ job }: { job: Job }) {
  return (
    <div
      className={`bg-gray-800 rounded-xl border p-5 flex flex-col gap-3 hover:border-gray-500 transition-colors ${
        job.highInterest ? "border-amber-500/60" : "border-gray-700"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            {job.highInterest && (
              <span className="text-amber-400 text-base leading-none" title="High interest">★</span>
            )}
            <h3 className="font-semibold text-gray-100 text-base leading-snug">
              {job.jobTitle || "Untitled"}
            </h3>
          </div>
          <p className="text-gray-400 text-sm mt-0.5">{job.company || "—"}</p>
        </div>
        <StatusDot status={job.status} />
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-1.5">
        {job.industry && (
          <Badge label={job.industry} colorClass={INDUSTRY_COLORS[job.industry] ?? "bg-gray-700 text-gray-300"} />
        )}
        {job.clearance && (
          <Badge
            label={`Clearance: ${job.clearance}`}
            colorClass={CLEARANCE_COLORS[job.clearance] ?? "bg-gray-700 text-gray-400"}
          />
        )}
        {job.location && (
          <Badge label={job.location} colorClass="bg-gray-700 text-gray-300" />
        )}
      </div>

      {/* Salary */}
      {job.salary && (
        <p className="text-sm text-emerald-400 font-medium">{job.salary}</p>
      )}

      {/* Dates */}
      <div className="flex gap-4 text-xs text-gray-500">
        <span>Found {formatDate(job.dateFound)}</span>
        {job.datePosted && <span>Posted {formatDate(job.datePosted)}</span>}
      </div>

      {/* Actions */}
      {job.jobUrl && (
        <div className="flex gap-2 pt-1 border-t border-gray-700">
          <a
            href={job.jobUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-blue-400 hover:text-blue-300 hover:underline"
          >
            Apply →
          </a>
        </div>
      )}
    </div>
  );
}

function FilterSelect<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T | "all";
  options: T[];
  onChange: (v: T | "all") => void;
}) {
  return (
    <label className="flex flex-col gap-1 text-xs font-medium text-gray-500 uppercase tracking-wide">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T | "all")}
        className="text-sm font-normal text-gray-200 bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">All</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function JobDashboard({ jobs }: { jobs: Job[] }) {
  const [status, setStatus] = useState<JobStatus | "all">("all");
  const [industry, setIndustry] = useState<Industry | "all">("all");
  const [clearance, setClearance] = useState<ClearanceLevel | "all">("all");
  const [highInterestOnly, setHighInterestOnly] = useState(false);
  const [locationFilter, setLocationFilter] = useState<"all" | "Remote" | "Hybrid" | "On-site">("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      if (status !== "all" && j.status !== status) return false;
      if (industry !== "all" && j.industry !== industry) return false;
      if (clearance !== "all" && j.clearance !== clearance) return false;
      if (highInterestOnly && !j.highInterest) return false;
      if (locationFilter !== "all") {
        const loc = j.location.toLowerCase();
        if (locationFilter === "Remote" && !loc.startsWith("remote")) return false;
        if (locationFilter === "Hybrid" && !loc.startsWith("hybrid")) return false;
        if (locationFilter === "On-site" && !loc.startsWith("on-site")) return false;
      }
      if (search.trim()) {
        const q = search.toLowerCase();
        if (
          !j.jobTitle.toLowerCase().includes(q) &&
          !j.company.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [jobs, status, industry, clearance, highInterestOnly, locationFilter, search]);

  const stats = useMemo(() => {
    const total = jobs.length;
    const hi = jobs.filter((j) => j.highInterest).length;
    const byStatus = jobs.reduce<Record<string, number>>((acc, j) => {
      const s = j.status ?? "Unknown";
      acc[s] = (acc[s] ?? 0) + 1;
      return acc;
    }, {});
    return { total, hi, byStatus };
  }, [jobs]);

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Top bar */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-xl font-bold text-gray-100">🔍 OSINT Job Tracker</h1>
            <p className="text-sm text-gray-500">
              {stats.total} listings · {stats.hi} high-interest · updated by scheduled agent
            </p>
          </div>

          {/* Status pills */}
          <div className="flex gap-2 flex-wrap">
            {Object.entries(stats.byStatus).map(([s, n]) => (
              <button
                key={s}
                onClick={() => setStatus(status === s ? "all" : (s as JobStatus))}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
                  status === s
                    ? "bg-gray-100 text-gray-900 border-gray-100"
                    : "bg-transparent text-gray-400 border-gray-700 hover:border-gray-500 hover:text-gray-200"
                }`}
              >
                <span
                  className={`inline-block w-2 h-2 rounded-full mr-1.5 ${STATUS_COLORS[s] ?? "bg-gray-600"}`}
                />
                {s} ({n})
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-end gap-4 flex-wrap">
          <label className="flex flex-col gap-1 text-xs font-medium text-gray-500 uppercase tracking-wide flex-1 min-w-48">
            Search
            <input
              type="text"
              placeholder="Title or company…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="text-sm font-normal text-gray-200 bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-600"
            />
          </label>

          <FilterSelect
            label="Industry"
            value={industry}
            options={["Cybersecurity", "Finance/AML", "Nonprofit", "Tech/Trust & Safety", "Law", "Media", "Government", "Other"]}
            onChange={setIndustry}
          />

          <FilterSelect
            label="Clearance"
            value={clearance}
            options={["None", "Preferred", "Required", "Unknown"]}
            onChange={setClearance}
          />

          <FilterSelect
            label="Location"
            value={locationFilter}
            options={["Remote", "Hybrid", "On-site"]}
            onChange={setLocationFilter}
          />

          <label className="flex items-center gap-2 text-sm font-medium text-gray-400 cursor-pointer pb-1.5">
            <input
              type="checkbox"
              checked={highInterestOnly}
              onChange={(e) => setHighInterestOnly(e.target.checked)}
              className="w-4 h-4 rounded accent-amber-400"
            />
            ★ High-interest only
          </label>

          {(status !== "all" || industry !== "all" || clearance !== "all" || highInterestOnly || locationFilter !== "all" || search) && (
            <button
              onClick={() => {
                setStatus("all");
                setIndustry("all");
                setClearance("all");
                setHighInterestOnly(false);
                setLocationFilter("all");
                setSearch("");
              }}
              className="text-xs text-gray-600 hover:text-gray-300 pb-1.5 underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {filtered.length === 0 ? (
          <div className="text-center text-gray-600 py-24 text-lg">
            No jobs match the current filters.
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-600 mb-4">
              Showing {filtered.length} of {jobs.length} listings
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
