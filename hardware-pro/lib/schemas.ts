import { z } from "zod";

export const checkoutSchema = z.object({
    fullName: z.string().min(2, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(8, "Phone number is required"),
    pickupTime: z.string().min(1, "Please select a pickup time"),
    notes: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
