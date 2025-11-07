import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  amountPaid: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['UPI', 'card', 'cash'], required: true },
  paymentDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['successful', 'failed'], default: 'successful' }
}, { timestamps: true });

export default mongoose.model('Payment', paymentSchema);
