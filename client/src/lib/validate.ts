import { z } from "zod";
import { insertBookingSchema } from "@shared/schema";

// Extended booking schema with additional frontend validation
export const bookingFormSchema = insertBookingSchema
  .extend({
    serviceOrPackage: z.enum(["service", "package"], {
      required_error: "Please select either a service or package",
    }),
  })
  .refine(
    (data) => {
      if (data.serviceOrPackage === "service") {
        return !!data.serviceId;
      } else {
        return !!data.packageId;
      }
    },
    {
      message: "Please select a service or package",
      path: ["serviceId"],
    }
  )
  .refine(
    (data) => {
      return !!data.therapistId;
    },
    {
      message: "Please select a therapist",
      path: ["therapistId"],
    }
  )
  .refine(
    (data) => {
      return !!data.date;
    },
    {
      message: "Please select a date",
      path: ["date"],
    }
  )
  .refine(
    (data) => {
      return !!data.time;
    },
    {
      message: "Please select a time",
      path: ["time"],
    }
  );

export type BookingFormValues = z.infer<typeof bookingFormSchema>;

// Contact form validation
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

// Newsletter signup validation
export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type NewsletterValues = z.infer<typeof newsletterSchema>;

// Date validation - verifies a date is not in the past
export const isDateInFuture = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today;
};

// Phone number validation
export const isValidPhoneNumber = (phone: string): boolean => {
  // Basic phone validation - allows various formats
  const phoneRegex = /^(\+\d{1,3})?\s*(\(\d{1,4}\))?\s*[\d\s-]{7,}$/;
  return phoneRegex.test(phone);
};

// Email validation helper
export const isValidEmail = (email: string): boolean => {
  return z.string().email().safeParse(email).success;
};
