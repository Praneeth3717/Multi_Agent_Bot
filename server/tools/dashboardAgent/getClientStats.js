import { z } from "zod";
import { DynamicStructuredTool } from "@langchain/core/tools";
import Client from "../../models/Client.js";

export const getClientStats = new DynamicStructuredTool({
  name: "get_client_stats",
  description: "Provides insights into client base: active/inactive count, birthdays today, new clients this month.",
  schema: z.object({}),
  func: async () => {
    try {
      const [activeCount, inactiveCount] = await Promise.all([
        Client.countDocuments({ isActive: true }),
        Client.countDocuments({ isActive: false })
      ]);

      const today = new Date();
      const day = today.getDate();
      const month = today.getMonth() + 1;

      const birthdayClients = await Client.find({
        dob: { $exists: true, $ne: null },
        $expr: {
          $and: [
            { $eq: [{ $dayOfMonth: "$dob" }, day] },
            { $eq: [{ $month: "$dob" }, month] }
          ]
        }
        }, { name: 1, email: 1, _id: 0 }).lean();

      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      const newClients = await Client.countDocuments({
        createdAt: { $gte: startOfMonth, $lte: endOfMonth }
      });

      return {
        activeClients: activeCount,
        inactiveClients: inactiveCount,
        newClientsThisMonth: newClients,
        birthdaysToday: birthdayClients
      };
    } catch (err) {
      console.error(" getClientStats Error:", err);
      return "Internal error while retrieving client stats.";
    }
  }
});
