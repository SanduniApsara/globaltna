const mongoose = require("mongoose");

const jobRequestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: ["Plumbing", "Electrical", "Painting", "Joinery", "Other"],
        message: "Category must be one of: Plumbing, Electrical, Painting, Joinery, Other",
      },
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    contactName: {
      type: String,
      required: [true, "Contact name is required"],
      trim: true,
    },
    contactEmail: {
      type: String,
      required: [true, "Contact email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    status: {
      type: String,
      enum: {
        values: ["Open", "In Progress", "Closed"],
        message: "Status must be one of: Open, In Progress, Closed",
      },
      default: "Open",
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
    collection: "jobRequests",
  }
);

module.exports = mongoose.model("JobRequest", jobRequestSchema);
