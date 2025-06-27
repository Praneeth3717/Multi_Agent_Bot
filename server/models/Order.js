import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true},
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  courseName: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['paid', 'pending'], default: 'pending' }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
