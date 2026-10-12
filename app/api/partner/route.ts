import { NextResponse } from "next/server";
import { partnerSchema } from "@/lib/zodSchemas";
import { sendEmail } from "@/lib/email";

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

    if (honeypot && honeypot.length > 0) {
      return NextResponse.json({ success: true, message: "Partnership enquiry received." });
    }

    await sendEmail({
      subject: `New Partnership Enquiry: ${organisation}`,
      replyTo: email,
      text: `Organisation: ${organisation}\nContact: ${contactName}\nEmail: ${email}\nPhone: ${phone}\n\nProposal/Message:\n${message}`,
    });

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
