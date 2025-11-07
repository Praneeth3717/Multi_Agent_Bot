import { z } from "zod";
import { DynamicStructuredTool } from "@langchain/core/tools";
import Attendance from "../../models/Attendance.js";
import Class from "../../models/Class.js";
import Client from '../../models/Client.js'
import Course from '../../models/Course.js'

export const getAttendanceStats = new DynamicStructuredTool({
  name: "get_attendance_stats",
  description: "Returns attendance percentages per class along with names of students who dropped off (did not attend).",
  schema: z.object({}),
  func: async () => {
    try {
      const attendanceRecords = await Attendance.find({})
        .populate({
          path: "classId",
          populate: { path: "courseId", select: "name" }
        })
        .populate({ path: "clientId", select: "name" });

      const classAttendanceMap = {};

      const now=new Date()

      for (const record of attendanceRecords) {
        const classId = record.classId?._id?.toString();
        const courseName = record.classId?.courseId?.name || "Unknown Course";
        const classDateObj = new Date(record.classId?.date);
        const classDate = classDateObj.toDateString();
        const clientName = record.clientId?.name || "Unknown Client";

        if (!classId) continue;

        if (classDateObj > now) continue;

        if (!classAttendanceMap[classId]) {
          classAttendanceMap[classId] = {
            className: `${courseName} on ${classDate}`,
            attended: 0,
            total: 0,
            dropouts: []
          };
        }

        classAttendanceMap[classId].total += 1;
        if (record.attended) {
          classAttendanceMap[classId].attended += 1;
        } else {
          classAttendanceMap[classId].dropouts.push(clientName);
        }
      }

      const attendanceStats = Object.values(classAttendanceMap).map(c => ({
        className: c.className,
        attendanceRate: `${Math.round((c.attended / c.total) * 100)}%`,
        dropOff: c.dropouts.length,
        dropouts: c.dropouts
      }));

      return {
        attendancePercentages: attendanceStats
      };

    } catch (err) {
      console.error(" getAttendanceStats Error:", err);
      return "Internal error while generating attendance stats.";
    }
  }
});
