import { pgTable, text, serial, integer, timestamp, date, time, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Services
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(), // in dollars
  duration: integer("duration").notNull(), // in minutes
  image: text("image").notNull(),
});

export const insertServiceSchema = createInsertSchema(services).omit({ id: true });
export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;

// Therapists
export const therapists = pgTable("therapists", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(), 
  bio: text("bio").notNull(),
  image: text("image").notNull(),
  specialties: text("specialties").array().notNull(),
});

export const insertTherapistSchema = createInsertSchema(therapists).omit({ id: true });
export type InsertTherapist = z.infer<typeof insertTherapistSchema>;
export type Therapist = typeof therapists.$inferSelect;

// Packages
export const packages = pgTable("packages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(), // in dollars
  features: text("features").array().notNull(),
  popular: boolean("popular").default(false),
});

export const insertPackageSchema = createInsertSchema(packages).omit({ id: true }).extend({
  popular: z.boolean().nullable().default(false),
});
export type InsertPackage = z.infer<typeof insertPackageSchema>;
export type Package = typeof packages.$inferSelect;

// Testimonials
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  testimonial: text("testimonial").notNull(),
  rating: integer("rating").notNull(),
  image: text("image").notNull(),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({ id: true });
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

// Bookings
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  serviceId: integer("service_id"),
  packageId: integer("package_id"),
  therapistId: integer("therapist_id"),
  date: date("date").notNull(),
  time: text("time").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertBookingSchema = createInsertSchema(bookings).omit({ 
  id: true, 
  createdAt: true 
}).extend({
  serviceId: z.number().nullable().optional(),
  packageId: z.number().nullable().optional(),
  therapistId: z.number().nullable().optional(),
  notes: z.string().nullable().optional()
}).refine(
  (data) => data.serviceId !== undefined || data.packageId !== undefined,
  {
    message: "Either a service or package must be selected",
    path: ["serviceId"],
  }
);

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;

// Users (for authentication if needed)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
