import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z.string().trim().optional(),
  subject: z.string().trim().min(2, "Please provide a subject"),
  message: z.string().trim().min(5, "Please enter your message"),
  honeypot: z.string().max(0, "Bot detected").optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const volunteerSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z.string().trim().min(6, "Please enter a contact telephone number"),
  skills: z.string().trim().min(2, "Please share your skills or area of interest"),
  message: z.string().trim().min(5, "Please share a few words about how you'd like to get involved"),
  honeypot: z.string().max(0, "Bot detected").optional(),
});

export type VolunteerFormData = z.infer<typeof volunteerSchema>;

export const partnerSchema = z.object({
  organisation: z.string().trim().min(2, "Please enter the organisation name"),
  contactName: z.string().trim().min(2, "Please enter the contact person's name"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z.string().trim().min(6, "Please enter a contact telephone number"),
  message: z.string().trim().min(5, "Please provide details on how you would like to partner"),
  honeypot: z.string().max(0, "Bot detected").optional(),
});

export type PartnerFormData = z.infer<typeof partnerSchema>;
