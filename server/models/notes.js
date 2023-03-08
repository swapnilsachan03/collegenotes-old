import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter course title"],
    minLength: [10, "Title must be at least 10 characters long"],
    maxLength: [50, "Title must be at max 80 characters long"],
  },

  description: {
    type: String,
    default: "No description has been provided for these notes.",
    minLength: [20, "Description must be at least 100 characters long"],
    maxLength: [200, "Description must be at max 200 characters long"],
  },

  id: {
    type: String,
    required: true,
    minLength: [10, "Minimum 5 keyword ID required"],
    maxLength: [60, "Maximum 50 keyword ID allowed"],
  },

  contributor: {
    type: String,
    default: "Admin",
  },

  contributorSocial: {
    type: String,
    default: `${process.env.FRONTEND_URL}/about`,
  },

  institution: {
    type: String,
    required: true,
  },
  
  document: {
    documentKey: {
      type: String,
      required: true
    },
    url: {
      type: String,
      default: "dummy_url"
    },
  },

  views: {
    type: Number,
    default: 0,
  },
});

export const Notes = mongoose.model("Notes", schema);