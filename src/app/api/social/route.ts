// app/api/categories/route.ts

import { NextResponse } from "next/server";

const mockSocialLink = [
  { id: 1, name: "linkedin", url: "/" },
  { id: 2, name: "facebook", url: "/" },
  { id: 2, name: "twitter", url: "/" },
  { id: 2, name: "instagram", url: "/" },
];

export async function GET() {
  return NextResponse.json(mockSocialLink);
}
