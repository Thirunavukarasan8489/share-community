import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/zodSchemas";
import { sendEmail } from "@/lib/email";
import { getDatabase, ContactSubmission } from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, phone, subject, message, honeypot } = result.data;

    // Honeypot trap: if filled by bot, fail silently
    if (honeypot && honeypot.length > 0) {
      return NextResponse.json({ success: true, message: "Enquiry received." });
    }

    // 1. Store submission in MongoDB database
    try {
      const db = await getDatabase();
      const contactDoc: ContactSubmission = {
        name,
        email,
        phone: phone && phone.trim() ? phone.trim() : null,
        subject,
        message,
        status: "new",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await db.collection<ContactSubmission>("contacts").insertOne(contactDoc);
    } catch (dbError) {
      console.error("Failed to save contact enquiry to MongoDB:", dbError);
      throw dbError;
    }

    // 2. Dispatch email notification (best effort)
    try {
      await sendEmail({
        subject: `New Contact Enquiry: ${subject}`,
        replyTo: email,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\n\nSubject: ${subject}\n\nMessage:\n${message}`,
      });
    } catch (emailError) {
      console.warn("Email dispatch failed after storing contact in DB:", emailError);
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out. We have received your message.",
    });
  } catch (error) {
    console.error("Error processing contact request:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
