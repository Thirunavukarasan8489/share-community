import { NextResponse } from "next/server";
import {
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
  createAdminToken,
} from "@/lib/adminAuth";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, message: "Invalid username or password." },
        { status: 401 },
      );
    }

    const token = createAdminToken(username);

    const response = NextResponse.json({
      success: true,
      message: "Login successful.",
      user: { username },
    });

    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 },
    );
  }
}
