import express from 'express'
import { HumanMessage } from '@langchain/core/messages'
import { SupportAgent } from '../agents/SupportAgent.js'
import { DashboardAgent } from '../agents/DashboardAgent.js'

const router=express.Router()

router.post("/support", async (req, res) => {
  try {
    const result = await SupportAgent.invoke({
      messages: [new HumanMessage(req.body.message)]
    });
    res.send(result.messages.at(-1).content);
  } catch (error) {
    console.error("Support Agent Error:", error);
    res.status(500).send("Support agent error.");
  }
});

router.post("/dashboard", async (req, res) => {
  try {
    const result = await DashboardAgent.invoke({
      messages: [new HumanMessage(req.body.message)]
    });
    res.send(result.messages.at(-1).content);
  } catch (error) {
    console.error("Dashboard Agent Error:", error);
    res.status(500).send("Dashboard agent error.");
  }
});

export default router;