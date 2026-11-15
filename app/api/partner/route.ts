import { NextResponse } from "next/server";
import { partnerSchema } from "@/lib/zodSchemas";
import { sendEmail } from "@/lib/email";
import { getDatabase, PartnerSubmission } from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = partnerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { organisation, contactName, email, phone, message, honeypot } = result.data;

    // Honeypot trap: if filled by bot, fail silently
    if (honeypot && honeypot.length > 0) {
      return NextResponse.json({ success: true, message: "Partnership enquiry received." });
    }

    // 1. Store submission in MongoDB database
    try {
      const db = await getDatabase();
      const partnerDoc: PartnerSubmission = {
        organisation,
        contactName,
        email,
        phone,
        message,
        status: "new",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await db.collection<PartnerSubmission>("partners").insertOne(partnerDoc);
    } catch (dbError) {
      console.error("Failed to save partner enquiry to MongoDB:", dbError);
      throw dbError;
    }

    // 2. Dispatch email notification (best effort)
    try {
      await sendEmail({
        subject: `New Partnership Enquiry: ${organisation}`,
        replyTo: email,
        text: `Organisation: ${organisation}\nContact: ${contactName}\nEmail: ${email}\nPhone: ${phone}\n\nProposal/Message:\n${message}`,
      });
    } catch (emailError) {
      console.warn("Email dispatch failed after storing partner in DB:", emailError);
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for your partnership enquiry. We look forward to connecting with you.",
    });
  } catch (error) {
    console.error("Error processing partner request:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
