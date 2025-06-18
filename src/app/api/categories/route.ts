// app/api/categories/route.ts

import { NextResponse } from "next/server";

const mockCategories = [
  { id: 1, name: " Computer & Laptop" },
  { id: 2, name: "Mobile & Tablet" },
  { id: 3, name: "Camera" },
  { id: 4, name: "TV & Smart Box" },
  { id: 5, name: "Home Appliance" },
  { id: 6, name: "Accessories" },
  { id: 7, name: "Other Categories" },
];

export async function GET() {
  return NextResponse.json(mockCategories);
}
