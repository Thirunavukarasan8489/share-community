import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/zodSchemas";
import { sendEmail } from "@/lib/email";

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

    await sendEmail({
      subject: `New Contact Enquiry: ${subject}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\n\nSubject: ${subject}\n\nMessage:\n${message}`,
    });

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
