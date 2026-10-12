export interface SendEmailPayload {
  to?: string;
  from?: string;
  replyTo?: string;
  subject: string;
  text: string;
  html?: string;
}

export async function sendEmail(payload: SendEmailPayload): Promise<{ success: boolean; messageId?: string }> {
  // If RESEND_API_KEY is available, we can send via Resend
  if (process.env.RESEND_API_KEY) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || "The Share Community <noreply@sharecommunity.org>",
          to: payload.to || process.env.EMAIL_TO || "info@sharecommunity.org",
          reply_to: payload.replyTo,
          subject: payload.subject,
          text: payload.text,
          html: payload.html,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Resend API failed:", errorText);
        return { success: false };
      }

      const data = await response.json();
      return { success: true, messageId: data.id };
    } catch (err) {
      console.error("Failed to send email via Resend:", err);
      return { success: false };
    }
  }

  // Fallback logging mode for local development and environments without email secrets
  console.log("Mock Email Sent:", {
    to: payload.to || "info@sharecommunity.org",
    replyTo: payload.replyTo,
    subject: payload.subject,
    text: payload.text,
  });

  return { success: true, messageId: `mock-${Date.now()}` };
}
