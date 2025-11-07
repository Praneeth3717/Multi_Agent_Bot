import { z } from "zod";
import { DynamicStructuredTool } from "@langchain/core/tools";
import Client from "../../models/Client.js";
import Course from "../../models/Course.js";

export const findClientByIdentifier = new DynamicStructuredTool({
  name: "find_client_by_identifier",
  description: "Search and return a client's information using name, email, or phone. Returns enrolled services too.",
  schema: z.object({
    identifier: z.string().describe("Name, email, or phone of the client"),
  }),
  func: async ({ identifier }) => {
    try {
      const query = {
        $or: [
          { name: { $regex: identifier, $options: "i" } },
          { email: { $regex: identifier, $options: "i" } },
          { phone: { $regex: identifier, $options: "i" } },
        ]
      };

      const client = await Client.findOne(query).populate("enrolledCourses.courseId");
      if (!client) return "Client not found.";

      let output = `Client found: ${client.name}, ${client.email}, ${client.phone}, Status: ${client.isActive ? 'active' : 'inactive'}.`;

      if (client.enrolledCourses?.length) {
        const courses = client.enrolledCourses.map((course, i) => {
          return `${i + 1}. ${course.courseId?.name || "Unknown Course"} — ${course.status} (Enrolled on ${new Date(course.enrolledDate).toDateString()})`;
        }).join("\n");

        output += `\n\nEnrolled Courses:\n${courses}`;
      } else {
        output += `\n\nNo enrolled courses.`;
      }

      return output;

    } catch (err) {
      console.error("findClientByIdentifier Error:", err);
      return "Internal error while retrieving client info.";
    }
  }
});
