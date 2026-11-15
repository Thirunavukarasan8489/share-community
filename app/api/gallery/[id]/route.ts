import { NextResponse } from "next/server";
import { getDatabase, GalleryDocument } from "@/lib/mongodb";
import { isAuthenticatedAdmin } from "@/lib/adminAuth";
import { ObjectId } from "mongodb";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAdmin = await isAuthenticatedAdmin();
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin session required." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { title, src, alt, caption, category, width, height, programmeId } = body;

    const db = await getDatabase();
    const collection = db.collection<GalleryDocument>("gallery");

    const updateFields: Partial<GalleryDocument> = {
      updatedAt: new Date(),
    };

    if (title) updateFields.title = title.trim();
    if (src) updateFields.src = src.trim();
    if (alt !== undefined) updateFields.alt = alt.trim();
    if (caption !== undefined) updateFields.caption = caption.trim();
    if (category) updateFields.category = category.trim();
    if (width) updateFields.width = Number(width);
    if (height) updateFields.height = Number(height);
    if (programmeId !== undefined) {
      updateFields.programmeId = programmeId ? programmeId.trim() : undefined;
    }

    let filter: Record<string, unknown> = { id };
    if (ObjectId.isValid(id)) {
      filter = { $or: [{ id }, { _id: new ObjectId(id) }] };
    }

    const result = await collection.updateOne(filter, { $set: updateFields });

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Gallery item not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Gallery item updated successfully.",
    });
  } catch (error) {
    console.error("Error updating gallery item:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update gallery item." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAdmin = await isAuthenticatedAdmin();
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin session required." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const db = await getDatabase();
    const collection = db.collection<GalleryDocument>("gallery");

    let filter: Record<string, unknown> = { id };
    if (ObjectId.isValid(id)) {
      filter = { $or: [{ id }, { _id: new ObjectId(id) }] };
    }

    const result = await collection.deleteOne(filter);

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Gallery item not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Gallery item deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting gallery item:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete gallery item." },
      { status: 500 }
    );
  }
}
