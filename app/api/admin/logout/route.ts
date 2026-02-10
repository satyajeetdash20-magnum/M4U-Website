import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  cookies().delete("m4u-admin-auth");
  return NextResponse.json({ success: true });
}
