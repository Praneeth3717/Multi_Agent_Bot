import { z } from "zod";
import { DynamicStructuredTool } from "@langchain/core/tools";
import Payment from "../../models/Payment.js";
import Order from "../../models/Order.js";

export const getRevenueStats = new DynamicStructuredTool({
  name: "get_revenue_stats",
  description: "Get total revenue and outstanding payments.",
  schema: z.object({}),
  func: async () => {
    try {
      const payments = await Payment.aggregate([
        { $match: { status: "successful" } },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$amountPaid" }
          }
        }
      ]);

      const totalRevenue = payments[0]?.totalRevenue || 0;

      const orders = await Order.aggregate([
        {
          $group: {
            _id: null,
            totalOrderAmount: { $sum: "$amount" }
          }
        }
      ]);

      const totalOrderAmount = orders[0]?.totalOrderAmount || 0;

      const outstandingPayments = totalOrderAmount - totalRevenue;

      return {
        totalRevenue,
        outstandingPayments
      };
    } catch (err) {
      console.error("getRevenueStats Error:", err);
      return "Internal error while calculating revenue.";
    }
  }
});
