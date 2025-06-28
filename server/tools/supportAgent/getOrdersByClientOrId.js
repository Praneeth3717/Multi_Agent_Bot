import { z } from "zod";
import { DynamicStructuredTool } from "@langchain/core/tools";
import Order from "../../models/Order.js";
import Client from "../../models/Client.js";

export const getOrdersByClientOrId = new DynamicStructuredTool({
  name: "get_orders_by_client_or_id",
  description: "Get orders by order number or client name/email/phone. You can also filter by status (paid/pending).",
  schema: z.object({
    identifier: z.string().describe("Client name/email/phone or order number"),
    status: z.enum(["paid", "pending"]).optional()
  }),
  func: async ({ identifier, status }) => {
    try {
      const orderMatch = await Order.findOne({ orderNumber: identifier }).populate("clientId");
      if (orderMatch) {
        return `Order #${orderMatch.orderNumber}
Client: ${orderMatch.clientId?.name}
Service: ${orderMatch.courseName}
Amount: ₹${orderMatch.amount}
Status: ${orderMatch.status}`
      }

      const client = await Client.findOne({
        $or: [
          { name: { $regex: identifier, $options: "i" } },
          { email: { $regex: identifier, $options: "i" } },
          { phone: { $regex: identifier, $options: "i" } }
        ]
      });
      if (!client) return "Client not found.";

      const query = { clientId: client._id };
      if (status) query.status = status;

      const orders = await Order.find(query);

      if (orders.length === 0) {
        return `No ${status || ""} orders found for ${client.name}.`;
      }

      const result = orders.map((o, i) => {
        return `${i + 1}. Order #${o.orderNumber} | ${o.courseName} | ₹${o.amount} | ${o.status} | ${new Date(o.createdAt).toDateString()}`;
      }).join("\n");

      return `Client: ${client.name} (${client.email})\nOrders:\n${result}`;
    } catch (err) {
      console.error(" getOrdersByClientOrId Error:", err);
      return "Internal error while retrieving orders.";
    }
  }
});