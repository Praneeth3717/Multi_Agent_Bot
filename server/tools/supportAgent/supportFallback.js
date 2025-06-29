import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";

export const supportFallback = new DynamicStructuredTool({
  name: "unsupported_support_query",
  description: "Fallback when no support tools are appropriate.",
  schema: z.object({}),
  func: async () => {
    return "I'm sorry, but as a Support Agent, I can only assist with client, order, payment, and class/course-related queries.";
  }
});
