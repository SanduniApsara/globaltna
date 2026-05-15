"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { fetchJobs } from "../lib/api";

const CATEGORIES = ["All", "Plumbing", "Electrical", "Painting", "Joinery", "Other"];
const STATUSES   = ["All", "Open", "In Progress", "Closed"];

function statusBadgeClass(status) {
  if (status === "Open") return "badge badge-open";
  if (status === "In Progress") return "badge badge-progress";
  return "badge badge-closed";
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  });
}

export default function HomePage() {
  const [jobs, setJobs]           = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [category, setCategory]   = useState("All");
  const [status, setStatus]       = useState("All");
  const [search, setSearch]       = useState("");
  const [searchInput, setSearchInput] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (category !== "All") params.category = category;
      if (status !== "All")   params.status   = status;
      if (search)             params.search   = search;
      const data = await fetchJobs(params);
      setJobs(data.data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [category, status, search]);

  useEffect(() => { load(); }, [load]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(searchInput);
  };

  return (
    <>
      <div style={{ marginBottom: "0.25rem" }}>
        <h1 className="page-title">Service Request Board</h1>
        <p className="page-subtitle">Browse open jobs or post a new service request</p>
      </div>

      <div className="filter-bar">
        <form onSubmit={handleSearchSubmit} className="filter-group" style={{ flexGrow: 2 }}>
          <label>Search</label>
          <input
            type="text"
            placeholder="Search by title or description…"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              if (e.target.value === "") setSearch("");
            }}
          />
        </form>

        <div className="filter-group">
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className="filter-group">
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            {STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {error && <div className="alert alert-error" style={{ marginBottom: "1.5rem" }}>{error}</div>}

      {loading ? (
        <div className="empty-state">
          <p>Loading requests…</p>
        </div>
      ) : jobs.length === 0 ? (
        <div className="empty-state">
          <h3>No jobs found</h3>
          <p>Try adjusting your filters, or <Link href="/jobs/new" style={{ color: "var(--amber)" }}>post the first request</Link>.</p>
        </div>
      ) : (
        <>
          <p style={{ marginBottom: "1rem", color: "var(--muted)", fontSize: "0.85rem", fontFamily: "'DM Mono', monospace" }}>
            {jobs.length} request{jobs.length !== 1 ? "s" : ""} found
          </p>
          <div className="jobs-grid">
            {jobs.map((job) => (
              <Link key={job._id} href={`/jobs/${job._id}`} className="job-card">
                <div className="card-top">
                  <span className="card-title">{job.title}</span>
                  <span className={statusBadgeClass(job.status)}>{job.status}</span>
                </div>
                <p className="card-desc">{job.description}</p>
                <div className="card-meta">
                  <span className="category-chip">{job.category}</span>
                  <span className="meta-tag">📍 {job.location}</span>
                  <span className="meta-tag" style={{ marginLeft: "auto" }}>
                    {formatDate(job.createdAt)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
}
