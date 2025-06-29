import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import { findClientByIdentifier } from "../tools/supportAgent/findClientByIdentifier.js";
import { getOrdersByClientOrId } from "../tools/supportAgent/getOrdersByClientOrId.js";
import { getPaymentInfo } from "../tools/supportAgent/getPaymentInfo.js";
import { discoverServices } from "../tools/supportAgent/discoverServices.js";
import { createClientEnquiry } from "../tools/supportAgent/createClientEnquiry.js";
import { createOrder } from "../tools/supportAgent/createOrder.js";
import { supportFallback } from "../tools/supportAgent/supportFallback.js";

const model = new ChatOpenAI({
  modelName: "gpt-4-1106-preview",
  temperature: 0,
  apiKey: process.env.OPENAI_API_KEY,
});

export const SupportAgent = createReactAgent({
  llm: model,
  tools: [
    findClientByIdentifier,
    getOrdersByClientOrId,
    getPaymentInfo,
    discoverServices,
    createClientEnquiry,
    createOrder,
    supportFallback
  ],
});
