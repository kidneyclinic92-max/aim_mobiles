import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin123";

export function getAdminPassword(): string {
  return ADMIN_PASSWORD;
}

export function createSessionToken(): string {
  return Buffer.from(`aim-admin:${Date.now()}`).toString("base64url");
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  return Boolean(token && token.startsWith("YWltLWFkbWlu"));
}

export function verifyPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export { COOKIE_NAME };
