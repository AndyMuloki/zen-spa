import { db } from "./db";
import { 
  type Service, type InsertService,
  type Therapist, type InsertTherapist,
  type Package, type InsertPackage,
  type Testimonial, type InsertTestimonial,
  type Booking, type InsertBooking,
  type User, type InsertUser,
  services,
  therapists,
  packages,
  testimonials,
  bookings,
  users
} from "@shared/schema";
import { eq, and, not, asc } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Service methods
  getAllServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, service: Partial<InsertService>): Promise<Service>;
  deleteService(id: number): Promise<void>;
  
  // Therapist methods
  getAllTherapists(): Promise<Therapist[]>;
  getTherapist(id: number): Promise<Therapist | undefined>;
  createTherapist(therapist: InsertTherapist): Promise<Therapist>;
  updateTherapist(id: number, therapist: Partial<InsertTherapist>): Promise<Therapist>;
  deleteTherapist(id: number): Promise<void>;
  
  // Package methods
  getAllPackages(): Promise<Package[]>;
  getPackage(id: number): Promise<Package | undefined>;
  createPackage(pkg: InsertPackage): Promise<Package>;
  updatePackage(id: number, pkg: Partial<InsertPackage>): Promise<Package>;
  deletePackage(id: number): Promise<void>;
  
  // Testimonial methods
  getAllTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // Booking methods
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBookingsByDate(date: string): Promise<Booking[]>;
  getAvailableTimeSlots(
    date: string, 
    serviceId?: number, 
    packageId?: number, 
    therapistId?: number
  ): Promise<string[]>;
}

export class DbStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }
  
  // Service methods
  async getAllServices(): Promise<Service[]> {
    return db.select().from(services).orderBy(asc(services.id));
  }
  
  async getService(id: number): Promise<Service | undefined> {
    const result = await db.select().from(services).where(eq(services.id, id));
    return result[0];
  }
  
  async createService(service: InsertService): Promise<Service> {
    const result = await db.insert(services).values(service).returning();
    return result[0];
  }

  async updateService(id: number, service: Partial<InsertService>): Promise<Service> {
    const result = await db.update(services).set(service).where(eq(services.id, id)).returning();
    return result[0];
  }

  async deleteService(id: number): Promise<void> {
    await db.delete(services).where(eq(services.id, id));
  }
  
  // Therapist methods
  async getAllTherapists(): Promise<Therapist[]> {
    return db.select().from(therapists).orderBy(asc(therapists.id));
  }
  
  async getTherapist(id: number): Promise<Therapist | undefined> {
    const result = await db.select().from(therapists).where(eq(therapists.id, id));
    return result[0];
  }
  
  async createTherapist(therapist: InsertTherapist): Promise<Therapist> {
    const result = await db.insert(therapists).values(therapist).returning();
    return result[0];
  }

  async updateTherapist(id: number, therapist: Partial<InsertTherapist>): Promise<Therapist> {
    const result = await db.update(therapists).set(therapist).where(eq(therapists.id, id)).returning();
    return result[0];
  }

  async deleteTherapist(id: number): Promise<void> {
    await db.delete(therapists).where(eq(therapists.id, id));
  }
  
  // Package methods
  async getAllPackages(): Promise<Package[]> {
    return db.select().from(packages).orderBy(asc(packages.id));
  }
  
  async getPackage(id: number): Promise<Package | undefined> {
    const result = await db.select().from(packages).where(eq(packages.id, id));
    return result[0];
  }
  
  async createPackage(pkg: InsertPackage): Promise<Package> {
    const result = await db.insert(packages).values(pkg).returning();
    return result[0];
  }

  async updatePackage(id: number, pkg: Partial<InsertPackage>): Promise<Package> {
    const result = await db.update(packages).set(pkg).where(eq(packages.id, id)).returning();
    return result[0];
  }

  async deletePackage(id: number): Promise<void> {
    await db.delete(packages).where(eq(packages.id, id));
  }
  
  // Testimonial methods
  async getAllTestimonials(): Promise<Testimonial[]> {
    return db.select().from(testimonials);
  }
  
  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const result = await db.insert(testimonials).values(testimonial).returning();
    return result[0];
  }
  
  // Booking methods
  async createBooking(booking: InsertBooking): Promise<Booking> {
    const result = await db.insert(bookings).values(booking).returning();
    return result[0];
  }
  
  async getBookingsByDate(date: string): Promise<Booking[]> {
    return db.select().from(bookings).where(eq(bookings.date, date));
  }
  
  async getAvailableTimeSlots(
    date: string, 
    serviceId?: number, 
    packageId?: number, 
    therapistId?: number
  ): Promise<string[]> {
    // Default time slots
    const allTimeSlots = [
      "9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", 
      "3:00 PM", "4:30 PM", "6:00 PM", "7:30 PM"
    ];
    
    // Get bookings for the specified date and therapist
    const bookingsOnDate = await db.select({ time: bookings.time })
      .from(bookings)
      .where(
        and(
          eq(bookings.date, date),
          eq(bookings.therapistId, therapistId as number)
        )
      );
      
    const bookedTimeSlots = bookingsOnDate.map(booking => booking.time);
    
    // Filter available time slots
    return allTimeSlots.filter(slot => !bookedTimeSlots.includes(slot));
  }
}

export const storage = new DbStorage();
