"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactFormData } from "@/lib/zodSchemas";
import { Button } from "@/components/ui/Button";
import { contactContent } from "@/content/pages";
import { CheckCircle2, AlertCircle, Send } from "lucide-react";

export function ContactForm() {
  const [serverStatus, setServerStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setServerStatus("submitting");
    setServerMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await res.json();

      if (res.ok && resData.success) {
        setServerStatus("success");
        setServerMessage(resData.message || "Thank you for reaching out. We have received your message.");
        reset();
      } else {
        setServerStatus("error");
        setServerMessage(resData.message || "An error occurred. Please check your submission and try again.");
      }
    } catch {
      setServerStatus("error");
      setServerMessage("Unable to send message. Please check your internet connection and try again.");
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-teal-900/10 shadow-xs max-w-2xl mx-auto">
      {serverStatus === "success" ? (
        <div className="text-center py-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-leaf-500/15 text-leaf-500 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" aria-hidden="true" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-ink">Message Sent</h3>
          <p className="text-ink/80 text-base leading-relaxed">{serverMessage}</p>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => setServerStatus("idle")}
          >
            Send Another Message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          {serverStatus === "error" && (
            <div
              className="p-4 rounded-2xl bg-coral-500/10 border border-coral-500/30 text-coral-500 flex items-start gap-3"
              role="alert"
            >
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm font-medium">{serverMessage}</p>
            </div>
          )}

          {/* Honeypot Spam Trap */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="hp_contact">Leave this field blank</label>
            <input
              id="hp_contact"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("honeypot")}
            />
          </div>

          {/* Name Field */}
          <div>
            <label htmlFor="contact-name" className="block text-sm font-semibold text-ink mb-1.5">
              Full Name <span className="text-coral-500">*</span>
            </label>
            <input
              id="contact-name"
              type="text"
              autoComplete="name"
              {...register("name")}
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={`w-full px-4 py-3 rounded-2xl border text-ink bg-cream/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors ${
                errors.name ? "border-coral-500" : "border-teal-900/15"
              }`}
            />
            {errors.name && (
              <p id="name-error" className="mt-1.5 text-xs text-coral-500 font-medium" role="alert">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email & Phone Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="contact-email" className="block text-sm font-semibold text-ink mb-1.5">
                Email Address <span className="text-coral-500">*</span>
              </label>
              <input
                id="contact-email"
                type="email"
                autoComplete="email"
                {...register("email")}
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`w-full px-4 py-3 rounded-2xl border text-ink bg-cream/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors ${
                  errors.email ? "border-coral-500" : "border-teal-900/15"
                }`}
              />
              {errors.email && (
                <p id="email-error" className="mt-1.5 text-xs text-coral-500 font-medium" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="contact-phone" className="block text-sm font-semibold text-ink mb-1.5">
                Telephone Number <span className="text-xs text-ink/60 font-normal">(Optional)</span>
              </label>
              <input
                id="contact-phone"
                type="tel"
                autoComplete="tel"
                {...register("phone")}
                className="w-full px-4 py-3 rounded-2xl border border-teal-900/15 text-ink bg-cream/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors"
              />
            </div>
          </div>

          {/* Subject Field */}
          <div>
            <label htmlFor="contact-subject" className="block text-sm font-semibold text-ink mb-1.5">
              Subject <span className="text-coral-500">*</span>
            </label>
            <input
              id="contact-subject"
              type="text"
              {...register("subject")}
              aria-invalid={errors.subject ? "true" : "false"}
              aria-describedby={errors.subject ? "subject-error" : undefined}
              className={`w-full px-4 py-3 rounded-2xl border text-ink bg-cream/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors ${
                errors.subject ? "border-coral-500" : "border-teal-900/15"
              }`}
            />
            {errors.subject && (
              <p id="subject-error" className="mt-1.5 text-xs text-coral-500 font-medium" role="alert">
                {errors.subject.message}
              </p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="contact-message" className="block text-sm font-semibold text-ink mb-1.5">
              Message <span className="text-coral-500">*</span>
            </label>
            <textarea
              id="contact-message"
              rows={4}
              {...register("message")}
              aria-invalid={errors.message ? "true" : "false"}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={`w-full px-4 py-3 rounded-2xl border text-ink bg-cream/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors resize-y ${
                errors.message ? "border-coral-500" : "border-teal-900/15"
              }`}
            />
            {errors.message && (
              <p id="message-error" className="mt-1.5 text-xs text-coral-500 font-medium" role="alert">
                {errors.message.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full justify-center shadow-md"
            disabled={serverStatus === "submitting"}
          >
            <Send className="w-5 h-5 mr-1" aria-hidden="true" />
            <span>{serverStatus === "submitting" ? "Sending..." : contactContent.buttonText}</span>
          </Button>
        </form>
      )}
    </div>
  );
}
