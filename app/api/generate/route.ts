import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));

  const endpointId = process.env.RUNPOD_ENDPOINT_ID;
  const apiKey = process.env.RUNPOD_API_KEY;

  if (!endpointId || !apiKey) {
    return NextResponse.json({ ok: false, error: "Missing RUNPOD env vars" }, { status: 500 });
  }

  const prompt = (body as any)?.prompt ?? "";

  const r = await fetch(`https://api.runpod.ai/v2/${endpointId}/run`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      input: { prompt }, // canonical contract
    }),
  });

  const data = await r.json().catch(() => ({}));

  return NextResponse.json(
    { ok: r.ok, jobId: (data as any)?.id ?? null },
    { status: r.ok ? 200 : 502 }
  );
}
