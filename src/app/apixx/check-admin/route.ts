import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // prevent caching

export async function GET() {
  try {
    const res = await fetch("http://localhost:8000/api/v1/check-admin", {
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error contacting backend:", error);
    // If backend is unreachable, assume no admin exists to avoid blocking UI
    return NextResponse.json({ data: { exists: false } });
  }
}
