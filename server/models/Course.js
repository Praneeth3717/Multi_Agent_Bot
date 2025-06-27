import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  instructor: { type: String, required: true},
  durationWeeks: { type: Number },
  startDate: { type: Date },
  endDate: { type: Date },
  status: { type: String, enum: ['upcoming', 'ongoing', 'completed'], default: 'upcoming' }
}, { timestamps: true });

export default mongoose.model('Course', courseSchema);
