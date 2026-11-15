import { NextResponse } from "next/server";
import { getDatabase, GalleryDocument } from "@/lib/mongodb";
import { galleryItems as staticGalleryItems } from "@/data/gallery";
import { isAuthenticatedAdmin } from "@/lib/adminAuth";

export async function GET() {
  try {
    const db = await getDatabase();
    const collection = db.collection<GalleryDocument>("gallery");

    // Check count; if 0, auto-seed with initial verified images
    const count = await collection.countDocuments();
    if (count === 0 && staticGalleryItems.length > 0) {
      const seedDocs: GalleryDocument[] = staticGalleryItems.map((item) => ({
        ...item,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
      await collection.insertMany(seedDocs);
    }

    const items = await collection.find({}).sort({ createdAt: -1 }).toArray();

    return NextResponse.json({
      success: true,
      items: items.map((doc) => ({
        id: doc.id || doc._id?.toString(),
        title: doc.title,
        src: doc.src,
        alt: doc.alt,
        caption: doc.caption,
        width: doc.width || 1200,
        height: doc.height || 800,
        category: doc.category,
        programmeId: doc.programmeId,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
      })),
    });
  } catch (error) {
    console.error("Error fetching gallery items from DB, falling back to static:", error);
    return NextResponse.json({
      success: true,
      items: staticGalleryItems,
    });
  }
}

export async function POST(request: Request) {
  try {
    const isAdmin = await isAuthenticatedAdmin();
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin session required." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, src, alt, caption, category, width, height, programmeId } = body;

    if (!title || !src || !category) {
      return NextResponse.json(
        { success: false, message: "Title, image URL/source, and category are required." },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const collection = db.collection<GalleryDocument>("gallery");

    const id =
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") +
      "-" +
      Date.now().toString(36);

    const newDoc: GalleryDocument = {
      id,
      title: title.trim(),
      src: src.trim(),
      alt: (alt || title).trim(),
      caption: (caption || title).trim(),
      category: category.trim(),
      width: Number(width) || 1200,
      height: Number(height) || 800,
      programmeId: programmeId ? programmeId.trim() : undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await collection.insertOne(newDoc);

    return NextResponse.json({
      success: true,
      message: "Gallery item added successfully.",
      item: newDoc,
    });
  } catch (error) {
    console.error("Error creating gallery item:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create gallery item." },
      { status: 500 }
    );
  }
}
