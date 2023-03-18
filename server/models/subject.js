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
    required: [true, "Please enter description for subject card"],
    minLength: [100, "Description must be at least 100 characters long"],
    maxLength: [200, "Description must be at max 200 characters long"],
  },
  
  seoDescription: {
    type: String,
    required: [true, "Please enter course description"],
    minLength: [70, "SEO description must be at least 70 characters long"],
    maxLength: [200, "SEO description must be at max 200 characters long"],
  },

  seoKeywords: {
    type: String,
    required: [true, "Please enter SEO keywords"],
    minLength: [5, "Minimum 5 keyword characters required"],
    maxLength: [50, "Maximum 50 keyword characters allowed"],
  },

  id: {
    type: String,
    required: true,
    minLength: [5, "Minimum 5 keyword ID required"],
    maxLength: [50, "Maximum 50 keyword ID allowed"],
  },

  beforeNotesContent: {
    type: String,
    required: true
  },

  afterNotesContent: {
    type: String,
    required: true
  },
  
  degree: {
    type: String,
    required: true,
  },
  
  year: {
    type: String,
    required: true,
  },

  poster: {
    fileName: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      default: "dummy_url"
    },
  },
  
  icon: {
    fileName: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      default: "dummy_url"
    },
  },

  notes: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notes"
      }
    }
  ],

  views: {
    type: Number,
    default: 0,
  },
  
  numOfNotes: {
    type: Number,
    default: 0,
  },
  
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

schema.pre("save", async function(next) {
  this.lastUpdated = Date.now();
  next();
})

export const Subject = mongoose.model("Subject", schema);