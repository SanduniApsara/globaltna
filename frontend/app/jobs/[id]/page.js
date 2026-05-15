"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { fetchJob, updateJobStatus, deleteJob } from "../../../lib/api";

const STATUSES = ["Open", "In Progress", "Closed"];

function statusBadgeClass(status) {
  if (status === "Open") return "badge badge-open";
  if (status === "In Progress") return "badge badge-progress";
  return "badge badge-closed";
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
}

export default function JobDetailPage({ params }) {
  const router = useRouter();
  const [job, setJob]         = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const [selectedStatus, setSelectedStatus] = useState("");
  const [updating, setUpdating] = useState(false);
  const [updateMsg, setUpdateMsg] = useState(null);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchJob(params.id);
        setJob(data.data);
        setSelectedStatus(data.data.status);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [params.id]);

  const handleStatusUpdate = async () => {
    if (selectedStatus === job.status) return;
    setUpdating(true);
    setUpdateMsg(null);
    try {
      const data = await updateJobStatus(job._id, selectedStatus);
      setJob(data.data);
      setUpdateMsg({ type: "success", text: `Status updated to "${selectedStatus}"` });
    } catch (e) {
      setUpdateMsg({ type: "error", text: e.message });
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteJob(job._id);
      router.push("/");
    } catch (e) {
      setUpdateMsg({ type: "error", text: e.message });
      setDeleting(false);
      setConfirmDelete(false);
    }
  };

  if (loading) return (
    <>
      <Link href="/" className="back-link">← Back to Board</Link>
      <div className="empty-state"><p>Loading…</p></div>
    </>
  );

  if (error) return (
    <>
      <Link href="/" className="back-link">← Back to Board</Link>
      <div className="alert alert-error">{error}</div>
    </>
  );

  return (
    <>
      <Link href="/" className="back-link">← Back to Board</Link>

      <div className="detail-layout">
        {/* Main content */}
        <div className="detail-main">
          <div className="detail-meta-row">
            <span className="category-chip">{job.category}</span>
            <span className={statusBadgeClass(job.status)}>{job.status}</span>
          </div>

          <h1 className="detail-title">{job.title}</h1>

          <div className="detail-meta-row">
            <span className="meta-item">📍 {job.location}</span>
            <span className="meta-item">🗓 {formatDate(job.createdAt)}</span>
          </div>

          <hr style={{ border: "none", borderTop: "1.5px solid var(--cream-dark)", margin: "1.25rem 0" }} />

          <p className="detail-description">{job.description}</p>
        </div>

        {/* Sidebar */}
        <div className="detail-sidebar">

          {/* Update status */}
          <div className="sidebar-card">
            <h3>Update Status</h3>
            <select
              className="status-select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {STATUSES.map((s) => <option key={s}>{s}</option>)}
            </select>
            <button
              className="btn btn-primary"
              style={{ width: "100%" }}
              onClick={handleStatusUpdate}
              disabled={updating || selectedStatus === job.status}
            >
              {updating ? "Saving…" : "Save Status"}
            </button>
            {updateMsg && (
              <div
                className={`alert alert-${updateMsg.type === "success" ? "success" : "error"}`}
                style={{ marginTop: "0.75rem" }}
              >
                {updateMsg.text}
              </div>
            )}
          </div>

          {/* Contact */}
          <div className="sidebar-card">
            <h3>Contact Details</h3>
            <div className="contact-row">
              <div className="contact-item">
                <span className="contact-label">Name</span>
                {job.contactName}
              </div>
              <div className="contact-item">
                <span className="contact-label">Email</span>
                <a href={`mailto:${job.contactEmail}`} style={{ color: "var(--amber)", wordBreak: "break-all" }}>
                  {job.contactEmail}
                </a>
              </div>
            </div>
          </div>

          {/* Danger zone */}
          <div className="sidebar-card">
            <h3>Actions</h3>
            {!confirmDelete ? (
              <button
                className="btn btn-danger"
                style={{ width: "100%" }}
                onClick={() => setConfirmDelete(true)}
              >
                Delete Request
              </button>
            ) : (
              <div>
                <p style={{ fontSize: "0.85rem", marginBottom: "0.75rem", color: "var(--slate-light)" }}>
                  Are you sure? This cannot be undone.
                </p>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    className="btn btn-danger"
                    style={{ flex: 1 }}
                    onClick={handleDelete}
                    disabled={deleting}
                  >
                    {deleting ? "Deleting…" : "Yes, delete"}
                  </button>
                  <button
                    className="btn btn-secondary"
                    style={{ flex: 1 }}
                    onClick={() => setConfirmDelete(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
