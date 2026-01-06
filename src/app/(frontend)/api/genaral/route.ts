// app/api/categories/route.ts

import { NextResponse } from "next/server";

const mockGenaralInfo = [
  { id: 1, name: "whatsapp", output: "01932546512" },
  { id: 2, name: "email", output: "sample@smail.com" },
  { id: 2, name: "phone", output: "01346545214" },
];

export async function GET() {
  return NextResponse.json(mockGenaralInfo);
}
