"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { partnerSchema, PartnerFormData } from "@/lib/zodSchemas";
import { Button } from "@/components/ui/Button";
import { partnerContent } from "@/content/pages";
import { CheckCircle2, AlertCircle, Handshake } from "lucide-react";

export function PartnerForm() {
  const [serverStatus, setServerStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PartnerFormData>({
    resolver: zodResolver(partnerSchema),
  });

  const onSubmit = async (data: PartnerFormData) => {
    setServerStatus("submitting");
    setServerMessage("");

    try {
      const res = await fetch("/api/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await res.json();

      if (res.ok && resData.success) {
        setServerStatus("success");
        setServerMessage(resData.message || "Thank you for your partnership enquiry. We look forward to connecting with you.");
        reset();
      } else {
        setServerStatus("error");
        setServerMessage(resData.message || "An error occurred. Please check your submission and try again.");
      }
    } catch {
      setServerStatus("error");
      setServerMessage("Unable to send request. Please check your internet connection and try again.");
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-teal-900/10 shadow-xs max-w-2xl mx-auto">
      {serverStatus === "success" ? (
        <div className="text-center py-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-900 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" aria-hidden="true" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-ink">Enquiry Received</h3>
          <p className="text-ink/80 text-base leading-relaxed">{serverMessage}</p>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => setServerStatus("idle")}
          >
            Submit Another Proposal
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
            <label htmlFor="hp_partner">Leave this field blank</label>
            <input
              id="hp_partner"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("honeypot")}
            />
          </div>

          {/* Organisation & Contact Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="partner-org" className="block text-sm font-semibold text-ink mb-1.5">
                Organisation / Group Name <span className="text-coral-500">*</span>
              </label>
              <input
                id="partner-org"
                type="text"
                {...register("organisation")}
                aria-invalid={errors.organisation ? "true" : "false"}
                aria-describedby={errors.organisation ? "org-error" : undefined}
                className={`w-full px-4 py-3 rounded-2xl border text-ink bg-cream/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors ${
                  errors.organisation ? "border-coral-500" : "border-teal-900/15"
                }`}
              />
              {errors.organisation && (
                <p id="org-error" className="mt-1.5 text-xs text-coral-500 font-medium" role="alert">
                  {errors.organisation.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="partner-name" className="block text-sm font-semibold text-ink mb-1.5">
                Contact Person Name <span className="text-coral-500">*</span>
              </label>
              <input
                id="partner-name"
                type="text"
                autoComplete="name"
                {...register("contactName")}
                aria-invalid={errors.contactName ? "true" : "false"}
                aria-describedby={errors.contactName ? "name-error" : undefined}
                className={`w-full px-4 py-3 rounded-2xl border text-ink bg-cream/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors ${
                  errors.contactName ? "border-coral-500" : "border-teal-900/15"
                }`}
              />
              {errors.contactName && (
                <p id="name-error" className="mt-1.5 text-xs text-coral-500 font-medium" role="alert">
                  {errors.contactName.message}
                </p>
              )}
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="partner-email" className="block text-sm font-semibold text-ink mb-1.5">
                Email Address <span className="text-coral-500">*</span>
              </label>
              <input
                id="partner-email"
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
              <label htmlFor="partner-phone" className="block text-sm font-semibold text-ink mb-1.5">
                Telephone Number <span className="text-coral-500">*</span>
              </label>
              <input
                id="partner-phone"
                type="tel"
                autoComplete="tel"
                {...register("phone")}
                aria-invalid={errors.phone ? "true" : "false"}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                className={`w-full px-4 py-3 rounded-2xl border text-ink bg-cream/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors ${
                  errors.phone ? "border-coral-500" : "border-teal-900/15"
                }`}
              />
              {errors.phone && (
                <p id="phone-error" className="mt-1.5 text-xs text-coral-500 font-medium" role="alert">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          {/* Partnership Proposal / Message */}
          <div>
            <label htmlFor="partner-message" className="block text-sm font-semibold text-ink mb-1.5">
              Partnership Interest or Proposal <span className="text-coral-500">*</span>
            </label>
            <textarea
              id="partner-message"
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
            <Handshake className="w-5 h-5 mr-1" aria-hidden="true" />
            <span>{serverStatus === "submitting" ? "Submitting..." : partnerContent.buttonText}</span>
          </Button>
        </form>
      )}
    </div>
  );
}
