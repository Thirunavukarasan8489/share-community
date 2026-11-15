import { NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/adminAuth";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function POST(request: Request) {
  try {
    const isAuth = await isAuthenticatedAdmin();
    if (!isAuth) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin session required." },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No image file provided." },
        { status: 400 }
      );
    }

    // Convert file to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await uploadToCloudinary(buffer);

    return NextResponse.json({
      success: true,
      url: uploadResult.url,
      width: uploadResult.width,
      height: uploadResult.height,
    });
  } catch (error) {
    console.error("Image upload error:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Image upload failed. You may also provide a direct image URL.",
      },
      { status: 500 }
    );
  }
}
