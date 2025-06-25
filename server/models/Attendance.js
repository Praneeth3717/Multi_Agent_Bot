import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  attended: { type: Boolean, default: false },
  date: { type: Date, required: true }
}, { timestamps: true });

export default mongoose.model('Attendance', attendanceSchema);
