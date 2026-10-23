import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(150, "Email is too long"),
  phone: z
    .string()
    .max(30, "Phone number is too long")
    .optional()
    .or(z.literal("")),
  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters")
    .max(150, "Subject is too long"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(3000, "Message is too long"),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy to submit this message.",
  }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const getInvolvedFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(150, "Email is too long"),
  phone: z
    .string()
    .max(30, "Phone number is too long")
    .optional()
    .or(z.literal("")),
  areaOfInterest: z.enum([
    "donate-money",
    "donate-items",
    "volunteer",
    "partner",
    "general-inquiry",
  ]),
  message: z
    .string()
    .min(10, "Please provide more details (at least 10 characters)")
    .max(3000, "Message is too long"),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy to submit your inquiry.",
  }),
});

export type GetInvolvedFormData = z.infer<typeof getInvolvedFormSchema>;
