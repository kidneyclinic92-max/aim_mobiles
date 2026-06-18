import { NextResponse } from "next/server";
import {
  COOKIE_NAME,
  createSessionToken,
  isAdminAuthenticated,
  verifyPassword,
} from "@/lib/cms/auth";

export async function GET() {
  const authenticated = await isAdminAuthenticated();
  return NextResponse.json({ authenticated });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { action, password } = body as { action: string; password?: string };

  if (action === "logout") {
    const response = NextResponse.json({ success: true });
    response.cookies.delete(COOKIE_NAME);
    return response;
  }

  if (action === "login") {
    if (!password || !verifyPassword(password)) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set(COOKIE_NAME, createSessionToken(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
