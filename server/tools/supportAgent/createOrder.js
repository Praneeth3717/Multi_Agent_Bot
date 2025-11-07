import { z } from "zod";
import { DynamicStructuredTool } from "@langchain/core/tools";
import Order from "../../models/Order.js";
import Client from "../../models/Client.js";
import Payment from "../../models/Payment.js";

export const createOrder = new DynamicStructuredTool({
  name: "create_order",
  description: "Create a new order by providing client email/phone and course info. Adds a successful payment if order is marked paid.",
  schema: z.object({
    clientIdentifier: z.string().describe("Client email or phone"),
    courseName: z.string().describe("Name of the course"),
    amount: z.number().describe("Order amount"),
    status: z.enum(["paid", "pending"]).describe("Order payment status"),
    paymentMethod: z.enum(["UPI", "card", "cash"]).optional().describe("Payment method, required only if status is 'paid'")
  }),
  func: async ({ clientIdentifier, courseName, amount, status, paymentMethod }) => {
    try {
      const client = await Client.findOne({
        $or: [{ email: clientIdentifier }, { phone: clientIdentifier }]
      });

      if (!client) return "Client not found. Please create client first.";

      if (status === "paid" && !paymentMethod) {
        return "Payment method is required when status is 'paid'.";
      }

      const orderNumber = `ORD${Date.now().toString().slice(-5)}`;

      const newOrder = await Order.create({
        orderNumber,
        clientId: client._id,
        courseName,
        amount,
        status
      });

      if (status === "paid") {
        await Payment.create({
          orderId: newOrder._id,
          amountPaid: amount,
          paymentMethod,
          status: "successful"
        });
      }

      return `Order created: ${orderNumber} for ${client.name} - ₹${amount}${status === "paid" ? " (Payment successful)" : " (Pending payment)"}`;
    } catch (err) {
      console.error("createOrder Error:", err);
      return "Failed to create order.";
    }
  }
});
