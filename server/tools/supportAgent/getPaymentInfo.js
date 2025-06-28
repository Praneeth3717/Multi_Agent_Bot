import { z } from "zod";
import { DynamicStructuredTool } from "@langchain/core/tools";
import Client from "../../models/Client.js";
import Order from "../../models/Order.js";
import Payment from "../../models/Payment.js";

export const getPaymentInfo = new DynamicStructuredTool({
  name: "get_payment_info",
  description: "Returns payment details for a client or order number. Includes order amount, payment method, and date.",
  schema: z.object({
    identifier: z.string().describe("Order number or client name/email/phone")
  }),
  func: async ({ identifier }) => {
    try {
      const order = await Order.findOne({ orderNumber: identifier }).populate("clientId");

      if (order) {
        const payments = await Payment.find({ orderId: order._id});

        const paymentInfo = payments.map(p => {
          return ` ₹${p.amountPaid} via ${p.paymentMethod} on ${new Date(p.paymentDate).toDateString()}`;
        }).join("\n") || "No successful payments.";

        return `Payment Info for Order #${order.orderNumber} 
  Client: ${order.clientId?.name}
  Course: ${order.courseName} 
  Amount: ₹${order.amount} 
  Status: ${order.status} 
  Payments: ${paymentInfo}`;
}
      const client = await Client.findOne({
        $or: [
          { name: { $regex: identifier, $options: "i" } },
          { email: { $regex: identifier, $options: "i" } },
          { phone: { $regex: identifier, $options: "i" } }
        ]
      });

      if (!client) return "Client not found.";

      const orders = await Order.find({ clientId: client._id });
      if (orders.length === 0) return `No orders found for ${client.name}.`;

      let output = `Payment Summary for ${client.name}\n`;

      for (const order of orders) {
        const payments = await Payment.find({ orderId: order._id });

        const paymentLines = payments.map(p => {
          return `₹${p.amountPaid} via ${p.paymentMethod} on ${new Date(p.paymentDate).toDateString()}`;
        }).join("\n") || "No successful payments.";

        output += `\n Order #${order.orderNumber} | ₹${order.amount} | ${order.status}\n${paymentLines}\n`;
      }

      return output;
    } catch (err) {
      console.error("getPaymentInfo Error:", err);
      return "Internal error while retrieving payment info.";
    }
  }
});
