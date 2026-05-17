const express = require("express");
const router = express.Router();
const JobRequest = require("../models/JobRequest");

// GET /api/jobs — list all jobs with optional filters
router.get("/", async (req, res, next) => {
  try {
    const filter = {};

    if (req.query.category) {
      filter.category = req.query.category;
    }
    if (req.query.status) {
      filter.status = req.query.status;
    }

    // Bonus: keyword search in title or description
    if (req.query.search) {
      const regex = new RegExp(req.query.search, "i");
      filter.$or = [{ title: regex }, { description: regex }];
    }

    const jobs = await JobRequest.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: jobs.length, data: jobs });
  } catch (err) {
    next(err);
  }
});

// GET /api/jobs/:id — fetch single job
router.get("/:id", async (req, res, next) => {
  try {
    const job = await JobRequest.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, error: "Job request not found" });
    }
    res.status(200).json({ success: true, data: job });
  } catch (err) {
    // Catches invalid ObjectId format
    if (err.name === "CastError") {
      return res.status(400).json({ success: false, error: "Invalid job ID format" });
    }
    next(err);
  }
});

// POST /api/jobs — create new job
router.post("/", async (req, res, next) => {
  try {
    const { title, description, category, location, contactName, contactEmail } = req.body;

    // Manual required field check (Mongoose validation also runs)
    const missing = [];
    if (!title) missing.push("title");
    if (!description) missing.push("description");
    if (!category) missing.push("category");
    if (!location) missing.push("location");
    if (!contactName) missing.push("contactName");
    if (!contactEmail) missing.push("contactEmail");

    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Missing required fields: ${missing.join(", ")}`,
      });
    }

    const job = await JobRequest.create({ title, description, category, location, contactName, contactEmail });
    res.status(201).json({ success: true, data: job });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, error: messages.join(". ") });
    }
    next(err);
  }
});

// PATCH /api/jobs/:id — update status only
router.patch("/:id", async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, error: "status field is required" });
    }

    const allowed = ["Open", "In Progress", "Closed"];
    if (!allowed.includes(status)) {
      return res.status(400).json({
        success: false,
        error: `status must be one of: ${allowed.join(", ")}`,
      });
    }

    const job = await JobRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!job) {
      return res.status(404).json({ success: false, error: "Job request not found" });
    }

    res.status(200).json({ success: true, data: job });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ success: false, error: "Invalid job ID format" });
    }
    next(err);
  }
});

// DELETE /api/jobs/:id — delete a job
router.delete("/:id", async (req, res, next) => {
  try {
    const job = await JobRequest.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, error: "Job request not found" });
    }
    res.status(200).json({ success: true, message: "Job request deleted successfully" });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ success: false, error: "Invalid job ID format" });
    }
    next(err);
  }
});

// Temporary seed route
router.post("/seed-data", async (req, res, next) => {
  try {
    const JobRequest = require("../models/JobRequest");
    await JobRequest.deleteMany({});
    await JobRequest.insertMany([
      { title: "Leaking kitchen tap", description: "Kitchen tap dripping for a week, needs urgent repair.", category: "Plumbing", location: "Glasgow", contactName: "Margaret Thomson", contactEmail: "m.thomson@example.com", status: "Open" },
      { title: "Rewire living room sockets", description: "Three sockets faulty, need two new double sockets added.", category: "Electrical", location: "Edinburgh", contactName: "David Mackay", contactEmail: "d.mackay@example.com", status: "Open" },
      { title: "Full interior repaint", description: "3-bedroom flat needs full repaint, paint supplied.", category: "Painting", location: "Aberdeen", contactName: "Fiona Campbell", contactEmail: "fiona.c@example.com", status: "Open" },
      { title: "Bespoke fitted wardrobe", description: "Floor-to-ceiling wardrobe 3.5m wide, sliding doors preferred.", category: "Joinery", location: "Inverness", contactName: "Callum Fraser", contactEmail: "callum.fraser@example.com", status: "Open" },
      { title: "Boiler pressure dropping", description: "Boiler loses pressure every few days, needs inspection.", category: "Plumbing", location: "Dundee", contactName: "Susan Reid", contactEmail: "s.reid@example.com", status: "Closed" },
      { title: "Garden shed wiring", description: "Run power to shed, RCD circuit, two lights, one socket.", category: "Electrical", location: "Perth", contactName: "Ian Stewart", contactEmail: "ian.stewart@example.com", status: "Open" },
      { title: "Exterior masonry painting", description: "Semi-detached house exterior needs weatherproof repaint.", category: "Painting", location: "Stirling", contactName: "Anne Morrison", contactEmail: "anne.m@example.com", status: "Open" },
      { title: "Staircase banister replacement", description: "Old pine banister unsafe, replace with oak handrail.", category: "Joinery", location: "Glasgow", contactName: "Robert Wilson", contactEmail: "r.wilson@example.com", status: "In Progress" }
    ]);
    res.json({ success: true, message: "Seeded 8 jobs" });
  } catch (err) { next(err); }
});

module.exports = router;
