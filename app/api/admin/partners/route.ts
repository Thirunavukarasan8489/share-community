import { NextResponse } from "next/server";
import { getDatabase, PartnerSubmission } from "@/lib/mongodb";
import { isAuthenticatedAdmin } from "@/lib/adminAuth";
import { ObjectId, Filter } from "mongodb";

export async function GET(request: Request) {
  try {
    const isAuth = await isAuthenticatedAdmin();
    if (!isAuth) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const filter: Filter<PartnerSubmission> = {};
    if (status && status !== "all") {
      filter.status = status as PartnerSubmission["status"];
    }

    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), "i");
      filter.$or = [
        { organisation: regex },
        { contactName: regex },
        { email: regex },
      ];
    }

    const db = await getDatabase();
    const items = await db
      .collection<PartnerSubmission>("partners")
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      items: items.map((doc) => ({
        ...doc,
        id: doc._id?.toString(),
      })),
    });
  } catch (error) {
    console.error("Error fetching partners:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch partner leads." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const isAuth = await isAuthenticatedAdmin();
    if (!isAuth) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 }
      );
    }

    const { id, status } = await request.json();
    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: "Lead ID and new status are required." },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const result = await db
      .collection("partners")
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { status, updatedAt: new Date() } }
      );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Lead not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Partner status updated successfully.",
    });
  } catch (error) {
    console.error("Error updating partner status:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update partner status." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const isAuth = await isAuthenticatedAdmin();
    if (!isAuth) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID parameter required." },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const result = await db
      .collection("partners")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Lead not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Partner lead deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting partner lead:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete partner lead." },
      { status: 500 }
    );
  }
}
