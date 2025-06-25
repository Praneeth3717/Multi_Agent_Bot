import { z } from "zod";
import { DynamicStructuredTool } from "@langchain/core/tools";
import Client from "../../models/Client.js";

export const createClientEnquiry = new DynamicStructuredTool({
  name: "create_client_enquiry",
  description: "Create a new client enquiry with name, email, and phone.",
  schema: z.object({
    name: z.string().describe("Full name of the client"),
    email: z.string().email().describe("Email address"),
    phone: z.string().describe("Phone number")
  }),
  func: async ({ name, email, phone }) => {
    try {
      const existing = await Client.findOne({ $or: [{ email }, { phone }] });
      if (existing) return "Client already exists with the same email or phone.";

      const newClient = await Client.create({
        name,
        email,
        phone,
        isActive: true
      });

      return ` New client created: ${newClient.name} (${newClient.email}, ${newClient.phone})`;
    } catch (err) {
      console.error(" createClientEnquiry Error:", err);
      return "Failed to create client.";
    }
  }
});
