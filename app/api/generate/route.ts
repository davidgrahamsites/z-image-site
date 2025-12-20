import { NextResponse } from "next/server";

export async function POST(req: Request) {
  return NextResponse.json({
    ok: true,
    env: {
      RUNPOD_ENDPOINT_ID: !!process.env.RUNPOD_ENDPOINT_ID,
      RUNPOD_API_KEY: !!process.env.RUNPOD_API_KEY,
    },
  });
}
