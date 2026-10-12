"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { volunteerSchema, VolunteerFormData } from "@/lib/zodSchemas";
import { Button } from "@/components/ui/Button";
import { volunteerContent } from "@/content/pages";
import { CheckCircle2, AlertCircle, Heart } from "lucide-react";

export function VolunteerForm() {
  const [serverStatus, setServerStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VolunteerFormData>({
    resolver: zodResolver(volunteerSchema),
  });

  const onSubmit = async (data: VolunteerFormData) => {
    setServerStatus("submitting");
    setServerMessage("");

    try {
      const res = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await res.json();

      if (res.ok && resData.success) {
        setServerStatus("success");
        setServerMessage(resData.message || "Thank you for volunteering your support. We will be in touch.");
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
          <div className="w-16 h-16 rounded-full bg-leaf-500/15 text-leaf-500 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" aria-hidden="true" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-ink">Thank You!</h3>
          <p className="text-ink/80 text-base leading-relaxed">{serverMessage}</p>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => setServerStatus("idle")}
          >
            Submit Another Application
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
            <label htmlFor="hp_volunteer">Leave this field blank</label>
            <input
              id="hp_volunteer"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("honeypot")}
            />
          </div>

          {/* Name Field */}
          <div>
            <label htmlFor="volunteer-name" className="block text-sm font-semibold text-ink mb-1.5">
              Full Name <span className="text-coral-500">*</span>
            </label>
            <input
              id="volunteer-name"
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
              <label htmlFor="volunteer-email" className="block text-sm font-semibold text-ink mb-1.5">
                Email Address <span className="text-coral-500">*</span>
              </label>
              <input
                id="volunteer-email"
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
              <label htmlFor="volunteer-phone" className="block text-sm font-semibold text-ink mb-1.5">
                Telephone Number <span className="text-coral-500">*</span>
              </label>
              <input
                id="volunteer-phone"
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

          {/* Skills / Area of Interest */}
          <div>
            <label htmlFor="volunteer-skills" className="block text-sm font-semibold text-ink mb-1.5">
              Skills / Area of Interest <span className="text-coral-500">*</span>
            </label>
            <input
              id="volunteer-skills"
              type="text"
              placeholder="e.g. Teaching, Mentoring, Event Coordination, Logistics"
              {...register("skills")}
              aria-invalid={errors.skills ? "true" : "false"}
              aria-describedby={errors.skills ? "skills-error" : undefined}
              className={`w-full px-4 py-3 rounded-2xl border text-ink bg-cream/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors ${
                errors.skills ? "border-coral-500" : "border-teal-900/15"
              }`}
            />
            {errors.skills && (
              <p id="skills-error" className="mt-1.5 text-xs text-coral-500 font-medium" role="alert">
                {errors.skills.message}
              </p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="volunteer-message" className="block text-sm font-semibold text-ink mb-1.5">
              Tell us about your background or motivation <span className="text-coral-500">*</span>
            </label>
            <textarea
              id="volunteer-message"
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
            <Heart className="w-5 h-5 fill-current" aria-hidden="true" />
            <span>{serverStatus === "submitting" ? "Sending..." : volunteerContent.buttonText}</span>
          </Button>
        </form>
      )}
    </div>
  );
}
