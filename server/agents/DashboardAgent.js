import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import { getRevenueStats } from "../tools/dashboardAgent/getRevenueStats.js";
import { getClientStats } from "../tools/dashboardAgent/getClientStats.js";
import { getEnrollmentStats } from "../tools/dashboardAgent/getEnrollmentStats.js";
import { getAttendanceStats } from "../tools/dashboardAgent/getAttendanceStats.js";
import { dashboardFallback } from "../tools/dashboardAgent/dashboardFallback.js";

const model = new ChatOpenAI({
  modelName: "gpt-4-1106-preview",
  temperature: 0,
  apiKey: process.env.OPENAI_API_KEY,
});

export const DashboardAgent = createReactAgent({
  llm: model,
  tools: [
    getRevenueStats,
    getClientStats,
    getEnrollmentStats,
    getAttendanceStats,
    dashboardFallback
  ],
});
