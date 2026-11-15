import { NextResponse } from "next/server";
import { volunteerSchema } from "@/lib/zodSchemas";
import { sendEmail } from "@/lib/email";
import { getDatabase, VolunteerSubmission } from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = volunteerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, phone, skills, message, honeypot } = result.data;

    // Honeypot trap: if filled by bot, fail silently
    if (honeypot && honeypot.length > 0) {
      return NextResponse.json({ success: true, message: "Volunteer submission received." });
    }

    // 1. Store submission in MongoDB database
    try {
      const db = await getDatabase();
      const volunteerDoc: VolunteerSubmission = {
        name,
        email,
        phone,
        skills,
        message,
        status: "new",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await db.collection<VolunteerSubmission>("volunteers").insertOne(volunteerDoc);
    } catch (dbError) {
      console.error("Failed to save volunteer submission to MongoDB:", dbError);
      throw dbError;
    }

    // 2. Dispatch email notification (best effort)
    try {
      await sendEmail({
        subject: `New Volunteer Application: ${name}`,
        replyTo: email,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nSkills/Area: ${skills}\n\nMessage:\n${message}`,
      });
    } catch (emailError) {
      console.warn("Email dispatch failed after storing volunteer in DB:", emailError);
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for volunteering your support. We will be in touch.",
    });
  } catch (error) {
    console.error("Error processing volunteer request:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
