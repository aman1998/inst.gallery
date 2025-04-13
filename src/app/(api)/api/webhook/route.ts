import { NextRequest, NextResponse } from "next/server";

import { ProcessWebhook } from "@shared/config/paddle/process-webhook";
import { getPaddleInstance } from "@shared/config/paddle/get-paddle-instance";

const webhookProcessor = new ProcessWebhook();

export async function POST(request: NextRequest) {
  const signature = request.headers.get("paddle-signature") || "";
  const rawRequestBody = await request.text();
  const privateKey = process.env["PADDLE_NOTIFICATION_WEBHOOK_SECRET"] || "";

  if (!signature || !rawRequestBody) {
    return Response.json({ status: 400, error: "Missing signature or request body" }, { status: 400 });
  }

  try {
    const paddle = getPaddleInstance();
    const eventData = await paddle.webhooks.unmarshal(rawRequestBody, privateKey, signature);

    if (!eventData) {
      return Response.json({ status: 400, error: "Invalid event data" }, { status: 400 });
    }

    await webhookProcessor.processEvent(eventData);
    return Response.json({ status: 200, eventName: eventData?.eventType ?? "Unknown event" });
  } catch (e: any) {
    console.log("webhook error =>", e?.message);
    return Response.json({ status: 500, error: e?.message || "Internal Server Error" }, { status: 500 });
  }
}
