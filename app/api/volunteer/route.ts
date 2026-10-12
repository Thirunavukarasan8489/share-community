import { NextResponse } from "next/server";
import { volunteerSchema } from "@/lib/zodSchemas";
import { sendEmail } from "@/lib/email";

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

    if (honeypot && honeypot.length > 0) {
      return NextResponse.json({ success: true, message: "Volunteer submission received." });
    }

    await sendEmail({
      subject: `New Volunteer Application: ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nSkills/Area: ${skills}\n\nMessage:\n${message}`,
    });

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
