import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string };
  const adminPassword = process.env.ADMIN_PANEL_PASSWORD;

  if (!adminPassword) {
    return NextResponse.json(
      { error: "ADMIN_PANEL_PASSWORD is not configured." },
      { status: 500 }
    );
  }

  if (!body.password || body.password !== adminPassword) {
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }

  cookies().set("m4u-admin-auth", "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return NextResponse.json({ success: true });
}
