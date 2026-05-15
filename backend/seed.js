const mongoose = require("mongoose");
const dotenv = require("dotenv");
const JobRequest = require("./models/JobRequest");

dotenv.config();

const sampleJobs = [
  {
    title: "Leaking kitchen tap in need of urgent repair",
    description: "My kitchen tap has been dripping for a week. Water is pooling under the sink and I suspect there may also be a pipe issue. Need someone experienced with kitchen plumbing.",
    category: "Plumbing",
    location: "Glasgow",
    contactName: "Margaret Thomson",
    contactEmail: "m.thomson@example.com",
    status: "Open",
  },
  {
    title: "Rewire living room sockets and add two new outlets",
    description: "Three of my living room sockets are faulty and I need two new double sockets added near the TV unit. All work must comply with current building regulations.",
    category: "Electrical",
    location: "Edinburgh",
    contactName: "David Mackay",
    contactEmail: "d.mackay@example.com",
    status: "In Progress",
  },
  {
    title: "Full interior repaint — 3-bedroom flat",
    description: "Looking for a painter to repaint the entire interior of my flat. All walls and ceilings. I will supply the paint. Walls are currently magnolia and I want to keep that scheme.",
    category: "Painting",
    location: "Aberdeen",
    contactName: "Fiona Campbell",
    contactEmail: "fiona.c@example.com",
    status: "Open",
  },
  {
    title: "Bespoke fitted wardrobe for master bedroom",
    description: "Need a joiner to build a fitted floor-to-ceiling wardrobe along the full width of the master bedroom (approx 3.5m). Sliding doors preferred. Happy to discuss materials and finishes.",
    category: "Joinery",
    location: "Inverness",
    contactName: "Callum Fraser",
    contactEmail: "callum.fraser@example.com",
    status: "Open",
  },
  {
    title: "Boiler pressure keeps dropping — needs inspection",
    description: "My combination boiler loses pressure every two to three days. I have to re-pressurise it manually. Suspect there may be a leak on the system or a faulty pressure relief valve.",
    category: "Plumbing",
    location: "Dundee",
    contactName: "Susan Reid",
    contactEmail: "s.reid@example.com",
    status: "Closed",
  },
  {
    title: "Garden shed wiring — lights and single socket",
    description: "I want to run power from the house to my garden shed (approximately 15 metres). Needs to include an RCD protected circuit, two LED lights, and a single socket inside the shed.",
    category: "Electrical",
    location: "Perth",
    contactName: "Ian Stewart",
    contactEmail: "ian.stewart@example.com",
    status: "Open",
  },
  {
    title: "Exterior masonry painting — semi-detached house",
    description: "The exterior render on my semi-detached property needs refreshing. Walls need preparation (filling cracks, treating any damp spots) before painting with a weatherproof masonry paint.",
    category: "Painting",
    location: "Stirling",
    contactName: "Anne Morrison",
    contactEmail: "anne.m@example.com",
    status: "Open",
  },
  {
    title: "Staircase banister replacement",
    description: "My existing staircase banister is old pine and has become loose and unsafe. Looking for a joiner to remove the existing banister and replace with a new oak handrail and spindles to match the hallway flooring.",
    category: "Joinery",
    location: "Glasgow",
    contactName: "Robert Wilson",
    contactEmail: "r.wilson@example.com",
    status: "In Progress",
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    await JobRequest.deleteMany({});
    console.log("Cleared existing job requests");

    await JobRequest.insertMany(sampleJobs);
    console.log(`Seeded ${sampleJobs.length} job requests`);

    await mongoose.disconnect();
    console.log("Done.");
    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err.message);
    process.exit(1);
  }
};

seed();
