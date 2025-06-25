import { z } from "zod";
import { DynamicStructuredTool } from "@langchain/core/tools";
import Order from "../../models/Order.js";
import Client from "../../models/Client.js";

export const createOrder = new DynamicStructuredTool({
  name: "create_order",
  description: "Create a new order by providing client email/phone and service details.",
  schema: z.object({
    clientIdentifier: z.string().describe("Client email or phone"),
    serviceId: z.string().describe("ID of the course/class to order"),
    serviceType: z.enum(["course", "class"]).describe("Type of service"),
    amount: z.number().describe("Order amount")
  }),
  func: async ({ clientIdentifier, serviceId, serviceType, amount }) => {
    try {
      const client = await Client.findOne({
        $or: [
          { email: clientIdentifier },
          { phone: clientIdentifier }
        ]
      });

      if (!client) return "Client not found. Please create client first.";

      const orderNumber = `ORD${Date.now().toString().slice(-5)}`;

      const newOrder = await Order.create({
        orderNumber,
        clientId: client._id,
        serviceId,
        serviceType,
        amount,
        status: "pending"
      });

      return ` Order created: ${orderNumber} for ${client.name} - ₹${amount}`;
    } catch (err) {
      console.error(" createOrder Error:", err);
      return "Failed to create order.";
    }
  }
});
