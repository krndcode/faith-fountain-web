import { z } from "zod";

export const ALLOWED_CURRENCIES = ["CAD", "USD", "EUR", "GBP"] as const;

export const createOrderSchema = z.object({
  amount: z
    .number({ invalid_type_error: "Donation amount must be a number" })
    .positive("Donation amount must be greater than zero")
    .min(1, "Minimum donation amount is 1.00")
    .max(10000, "For donations exceeding 10,000, please contact us directly"),
  currency: z.enum(ALLOWED_CURRENCIES, {
    errorMap: () => ({ message: "Currency not currently supported" }),
  }),
});

export const captureOrderSchema = z.object({
  orderId: z
    .string()
    .min(10, "Invalid PayPal order reference")
    .max(50, "Invalid PayPal order reference"),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type CaptureOrderInput = z.infer<typeof captureOrderSchema>;
