import { NextResponse } from "next/server";
import { getDatabase, ContactSubmission } from "@/lib/mongodb";
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

    const filter: Filter<ContactSubmission> = {};
    if (status && status !== "all") {
      filter.status = status as ContactSubmission["status"];
    }

    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), "i");
      filter.$or = [{ name: regex }, { email: regex }, { subject: regex }];
    }

    const db = await getDatabase();
    const items = await db
      .collection<ContactSubmission>("contacts")
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
    console.error("Error fetching contacts:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch contact leads." },
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
      .collection("contacts")
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
      message: "Contact status updated successfully.",
    });
  } catch (error) {
    console.error("Error updating contact status:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update contact status." },
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
      .collection("contacts")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Lead not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Contact lead deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting contact lead:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete contact lead." },
      { status: 500 }
    );
  }
}
