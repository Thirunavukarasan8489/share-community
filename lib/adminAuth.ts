import crypto from "crypto";
import { cookies } from "next/headers";

const ADMIN_SECRET = process.env.ADMIN_SECRET || "";
export const ADMIN_USERNAME = process.env.ADMIN_USER;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export function createAdminToken(username: string): string {
  const payload = {
    username,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days validity
  };
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", ADMIN_SECRET)
    .update(data)
    .digest("base64url");
  return `${data}.${signature}`;
}

export function verifyAdminToken(token?: string | null): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [data, signature] = parts;
  const expectedSig = crypto
    .createHmac("sha256", ADMIN_SECRET)
    .update(data)
    .digest("base64url");

  if (signature !== expectedSig) return false;

  try {
    const payload = JSON.parse(
      Buffer.from(data, "base64url").toString("utf-8"),
    );
    if (payload.exp && Date.now() > payload.exp) {
      return false; // Expired
    }
    return payload.username === ADMIN_USERNAME;
  } catch {
    return false;
  }
}

export async function isAuthenticatedAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  return verifyAdminToken(token);
}
