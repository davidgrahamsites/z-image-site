import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("RUNPOD_ENDPOINT_ID:", process.env.RUNPOD_ENDPOINT_ID ? "SET" : "MISSING");
console.log("RUNPOD_API_KEY:", process.env.RUNPOD_API_KEY ? "SET" : "MISSING");
  const body = await req.json().catch(() => ({}));
  return NextResponse.json({
    ok: true,
    received: body,
    message: "generate stub (GPU not wired yet)",
  });
}

