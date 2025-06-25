import { z } from "zod";
import { DynamicStructuredTool } from "@langchain/core/tools";
import Client from "../../models/Client.js";
import Course from "../../models/Course.js";
import mongoose from "mongoose";

export const getEnrollmentStats = new DynamicStructuredTool({
  name: "get_enrollment_stats",
  description: "Shows enrollment trends, top services, and course completion rates.",
  schema: z.object({}),
  func: async () => {
    try {
      const clients = await Client.find({}, 'enrolledCourses').lean();
      const enrollments = clients.flatMap(c =>
        c.enrolledCourses.map(course => ({
          courseId: course.courseId?.toString(),
          enrolledDate: course.enrolledDate,
          status: course.status
        }))
      );

      const trendsMap = {};
      for (const e of enrollments) {
        const d = new Date(e.enrolledDate);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
        trendsMap[key] = (trendsMap[key] || 0) + 1;
      }

      const enrollmentTrends = Object.entries(trendsMap).map(([month, count]) => ({
        month,
        count
      })).sort((a, b) => a.month.localeCompare(b.month));

      const serviceCount = {};
      for (const e of enrollments) {
        if (!e.courseId) continue;
        serviceCount[e.courseId] = (serviceCount[e.courseId] || 0) + 1;
      }

      const topCourseIds = Object.entries(serviceCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

      const courseMap = {};
      const topCourses = await Course.find({
        _id: { $in: topCourseIds.map(([id]) => new mongoose.Types.ObjectId(id)) }
      }).lean();

      for (const c of topCourses) {
        courseMap[c._id.toString()] = c.name;
      }

      const topServices = topCourseIds.map(([id, count]) => ({
        courseName: courseMap[id] || "Unknown",
        count
      }));

      const completed = enrollments.filter(e => e.status === 'completed').length;
      const total = enrollments.length;
      const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

      return {
        enrollmentTrends,
        topServices,
        courseCompletionRate: `${completionRate}%`
      };

    } catch (err) {
      console.error("getEnrollmentStats Error:", err);
      return "Internal error while generating enrollment stats.";
    }
  }
});
