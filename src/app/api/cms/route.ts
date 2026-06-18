import { NextResponse } from "next/server";
import { getSiteContent, saveSiteContent } from "@/lib/cms/store";
import { isAdminAuthenticated } from "@/lib/cms/auth";
import type { SiteContent } from "@/lib/cms/types";

export async function GET() {
  const content = await getSiteContent();
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as SiteContent;
    await saveSiteContent(body);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to save content" }, { status: 500 });
  }
}
