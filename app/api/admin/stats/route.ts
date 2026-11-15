import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { isAuthenticatedAdmin } from "@/lib/adminAuth";

export async function GET() {
  try {
    const isAuth = await isAuthenticatedAdmin();
    if (!isAuth) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 }
      );
    }

    const db = await getDatabase();

    const [
      galleryCount,
      contactsTotal,
      contactsNew,
      volunteersTotal,
      volunteersNew,
      partnersTotal,
      partnersNew,
    ] = await Promise.all([
      db.collection("gallery").countDocuments(),
      db.collection("contacts").countDocuments(),
      db.collection("contacts").countDocuments({ status: "new" }),
      db.collection("volunteers").countDocuments(),
      db.collection("volunteers").countDocuments({ status: "new" }),
      db.collection("partners").countDocuments(),
      db.collection("partners").countDocuments({ status: "new" }),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        gallery: { total: galleryCount },
        contacts: { total: contactsTotal, newCount: contactsNew },
        volunteers: { total: volunteersTotal, newCount: volunteersNew },
        partners: { total: partnersTotal, newCount: partnersNew },
      },
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch stats." },
      { status: 500 }
    );
  }
}
