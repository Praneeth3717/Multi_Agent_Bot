import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  phone: { type: String, required: true, unique: true},
  dob: { type: Date },
  isActive: { type: Boolean, default: true },
  enrolledCourses: [
    {
      _id: false,
      courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
      enrolledDate: { type: Date, default: Date.now },
      status: { type: String, enum: ['active', 'completed', 'cancelled'], default: 'active' }
    }
  ]
}, { timestamps: true });

export default mongoose.model('Client', clientSchema);
