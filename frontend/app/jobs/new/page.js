"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createJob } from "../../../lib/api";

const CATEGORIES = ["Plumbing", "Electrical", "Painting", "Joinery", "Other"];

export default function NewJobPage() {
  const router = useRouter();
  const [errors, setErrors]     = useState({});
  const [apiError, setApiError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const titleRef        = useRef();
  const descriptionRef  = useRef();
  const categoryRef     = useRef();
  const locationRef     = useRef();
  const contactNameRef  = useRef();
  const contactEmailRef = useRef();

  const validate = (data) => {
    const e = {};
    if (!data.title.trim())        e.title        = "Title is required";
    if (!data.description.trim())  e.description  = "Description is required";
    if (!data.category)            e.category     = "Please select a category";
    if (!data.location.trim())     e.location     = "Location is required";
    if (!data.contactName.trim())  e.contactName  = "Your name is required";
    if (!data.contactEmail.trim()) e.contactEmail = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(data.contactEmail))
      e.contactEmail = "Enter a valid email address";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title:        titleRef.current.value,
      description:  descriptionRef.current.value,
      category:     categoryRef.current.value,
      location:     locationRef.current.value,
      contactName:  contactNameRef.current.value,
      contactEmail: contactEmailRef.current.value,
    };
    const errs = validate(data);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSubmitting(true);
    setApiError(null);
    try {
      const { data: job } = await createJob(data);
      router.push(`/jobs/${job._id}`);
    } catch (err) {
      setApiError(err.message);
      setSubmitting(false);
    }
  };

  return (
    <>
      <Link href="/" className="back-link">← Back to Board</Link>

      <h1 className="page-title" style={{ marginBottom: "0.25rem" }}>Post a Service Request</h1>
      <p className="page-subtitle" style={{ marginBottom: "2rem" }}>
        Fill in the details and we'll put your job in front of local tradespeople.
      </p>

      {apiError && (
        <div className="alert alert-error" style={{ marginBottom: "1.5rem", maxWidth: 680 }}>
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-card">

          <div className="form-group">
            <label htmlFor="title">Job Title<span className="field-required">*</span></label>
            <input
              id="title"
              type="text"
              ref={titleRef}
              placeholder="e.g. Leaking kitchen tap needs urgent repair"
              style={errors.title ? { borderColor: "#c0392b" } : {}}
            />
            {errors.title && <span className="field-error">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description<span className="field-required">*</span></label>
            <textarea
              id="description"
              ref={descriptionRef}
              placeholder="Describe the work needed, any relevant details, access info, etc."
              style={errors.description ? { borderColor: "#c0392b" } : {}}
            />
            {errors.description && <span className="field-error">{errors.description}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category<span className="field-required">*</span></label>
              <select
                id="category"
                ref={categoryRef}
                style={errors.category ? { borderColor: "#c0392b" } : {}}
              >
                <option value="">Select a trade…</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.category && <span className="field-error">{errors.category}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="location">Location<span className="field-required">*</span></label>
              <input
                id="location"
                type="text"
                ref={locationRef}
                placeholder="e.g. Glasgow"
                style={errors.location ? { borderColor: "#c0392b" } : {}}
              />
              {errors.location && <span className="field-error">{errors.location}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="contactName">Your Name<span className="field-required">*</span></label>
              <input
                id="contactName"
                type="text"
                ref={contactNameRef}
                placeholder="e.g. Margaret Thomson"
                style={errors.contactName ? { borderColor: "#c0392b" } : {}}
              />
              {errors.contactName && <span className="field-error">{errors.contactName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="contactEmail">Contact Email<span className="field-required">*</span></label>
              <input
                id="contactEmail"
                type="email"
                ref={contactEmailRef}
                placeholder="e.g. m.thomson@example.com"
                style={errors.contactEmail ? { borderColor: "#c0392b" } : {}}
              />
              {errors.contactEmail && <span className="field-error">{errors.contactEmail}</span>}
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? "Posting…" : "Post Request"}
            </button>
            <Link href="/" className="btn btn-secondary">Cancel</Link>
          </div>

        </div>
      </form>
    </>
  );
}