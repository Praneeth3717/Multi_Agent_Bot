import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";

export const dashboardFallback = new DynamicStructuredTool({
  name: "unsupported_dashboard_query",
  description: "Fallback when no dashboard tools match the user's request.",
  schema: z.object({}),
  func: async () => {
    return "I'm sorry, but as a Dashboard Agent, I'm restricted to metrics like revenue, client stats, enrollment, and attendance data.";
  }
});
