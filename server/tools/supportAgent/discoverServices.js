import { z } from "zod";
import { DynamicStructuredTool } from "@langchain/core/tools";
import Class from "../../models/Class.js";
import Course from "../../models/Course.js";

const formatDate = (date) => date ? new Date(date).toDateString() : "N/A";

export const discoverServices = new DynamicStructuredTool({
  name: "discover_services",
  description: "Get class schedules by instructor or course name with full details like date, time, and location.",
  schema: z.object({
    instructor: z.string().optional().describe("Instructor name to filter classes by"),
    courseName: z.string().optional().describe("Course name to filter classes by"),
    status: z.string().optional().describe("Class status: scheduled, cancelled, or completed")
  }),
  func: async ({ instructor, courseName, status }) => {
    try {
      const query = {};

      if (instructor) {
        query.instructor = { $regex: instructor, $options: "i" };
      }

      if (status) {
        const allowed = ["scheduled", "cancelled", "completed"];
        const normalized = status.toLowerCase();
        if (allowed.includes(normalized)) {
          query.status = normalized;
        }
      }

      const classes = await Class.find(query)
        .sort({ date: 1 })
        .populate("courseId");

      const filtered = (courseName
        ? classes.filter(cl =>
            cl.courseId && cl.courseId.name?.toLowerCase().includes(courseName.toLowerCase())
          )
        : classes
      ).filter(cl => cl.courseId); 

      if (filtered.length === 0) {
        return "No matching classes found for the given filters.";
      }

      return filtered.map(cl => {
        return `Course: ${cl.courseId?.name || "Unknown"}
Instructor: ${cl.instructor || cl.courseId?.instructor || "N/A"}
Duration: ${formatDate(cl.courseId?.startDate)} to ${formatDate(cl.courseId?.endDate)} (${cl.courseId?.durationWeeks || "?"} weeks)
Class Date: ${formatDate(cl.date)} from ${cl.startTime || "?"} to ${cl.endTime || "?"}
Location: ${cl.location || "N/A"}
Status: ${cl.status || "N/A"}`;
      }).join("\n\n");

    } catch (err) {
      console.error("discoverServices Error:", err);
      return "Internal error while retrieving class schedule.";
    }
  }
});
