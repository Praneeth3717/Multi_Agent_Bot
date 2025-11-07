import express from "express";
import { HumanMessage } from "@langchain/core/messages";
import { SupportAgent } from "../agents/SupportAgent.js";
import { DashboardAgent } from "../agents/DashboardAgent.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { authorizeRole } from "../middleware/authorizeRole.js";

const router = express.Router();

router.post(
  "/support",
  verifyToken,
  authorizeRole("support"),
  async (req, res) => {
    try {
      const result = await SupportAgent.invoke({
        messages: [new HumanMessage(req.body.message)],
      });
      res.send(result.messages.at(-1).content);
    } catch (error) {
      console.error("Support Agent Error:", error);
      res.status(500).send("Support agent error.");
    }
  }
);

router.post(
  "/dashboard",
  verifyToken,
  authorizeRole("admin"),
  async (req, res) => {
    try {
      const result = await DashboardAgent.invoke({
        messages: [new HumanMessage(req.body.message)],
      });
      res.send(result.messages.at(-1).content);
    } catch (error) {
      console.error("Dashboard Agent Error:", error);
      res.status(500).send("Dashboard agent error.");
    }
  }
);

export default router;
