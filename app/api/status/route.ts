import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const jobId = searchParams.get("jobId");

  const endpointId = process.env.RUNPOD_ENDPOINT_ID;
  const apiKey = process.env.RUNPOD_API_KEY;

  if (!jobId) return NextResponse.json({ ok: false, error: "Missing jobId" }, { status: 400 });
  if (!endpointId || !apiKey) return NextResponse.json({ ok: false, error: "Missing RUNPOD env vars" }, { status: 500 });

  const r = await fetch(`https://api.runpod.ai/v2/${endpointId}/status/${jobId}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  const data = await r.json().catch(() => ({}));
  return NextResponse.json({ ok: r.ok, status: (data as any)?.status ?? null, raw: data }, { status: r.ok ? 200 : 502 });
}
