import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookingSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import type session from "express-session";
import adminRoutes from "./admin";
import isAdmin from "./admin";
import { Router, Request, Response, NextFunction } from "express";

// Extend express-session to include flash property
declare module "express-session" {
  interface SessionData {
    flash?: {
      type: string;
      title: string;
      description: string;
    };
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // prefix all routes with /api

  // Get all services
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getAllServices();
      res.json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({ message: "Failed to retrieve services" });
    }
  });

  // Get all therapists
  app.get("/api/therapists", async (req, res) => {
    try {
      const therapists = await storage.getAllTherapists();
      res.json(therapists);
    } catch (error) {
      console.error("Error fetching therapists:", error);
      res.status(500).json({ message: "Failed to retrieve therapists" });
    }
  });

  // Get all packages (public)
  app.get("/api/packages", async (req, res) => {
    try {
      const packages = await storage.getAllPackages();
      res.json(packages);
    } catch (error) {
      console.error("Error fetching packages:", error);
      res.status(500).json({ message: "Failed to retrieve packages" });
    }
  });

  // Admin-protected package routes
  app.post("/api/admin/packages", isAdmin, async (req, res) => {
    try {
      const pkg = req.body;
      const created = await storage.createPackage(pkg);
      res.status(201).json(created);
    } catch (error) {
      console.error("Error creating package:", error);
      res.status(500).json({ message: "Failed to create package" });
    }
  });

  app.put("/api/admin/packages/:id", isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const pkg = req.body;
      const updated = await storage.updatePackage(id, pkg);
      res.json(updated);
    } catch (error) {
      console.error("Error updating package:", error);
      res.status(500).json({ message: "Failed to update package" });
    }
  });

  app.delete("/api/admin/packages/:id", isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deletePackage(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting package:", error);
      res.status(500).json({ message: "Failed to delete package" });
    }
  });

  // Get all testimonials
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ message: "Failed to retrieve testimonials" });
    }
  });

  // Create a new booking
  app.post("/api/bookings", async (req, res) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(validatedData);
      // Set session-based flash message
      req.session.flash = {
        type: "success",
        title: "Booking Successful",
        description: "Your appointment has been booked!"
      };
      res.status(201).json(booking);
    } catch (error) {
      console.error("Error creating booking:", error);
      
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: "Validation error",
          errors: validationError.details 
        });
      }
      
      res.status(500).json({ message: "Failed to create booking" });
    }
  });

  // Flash message endpoint
  app.get("/api/flash", (req, res) => {
    const flash = req.session.flash;
    delete req.session.flash;
    res.json({ flash });
  });

  // Get available time slots for a specific date, service/package, and therapist
  app.get("/api/availability", async (req, res) => {
    try {
      const { date, serviceId, packageId, therapistId } = req.query;
      
      // Validate required parameters
      if (!date || (!serviceId && !packageId) || !therapistId) {
        return res.status(400).json({ 
          message: "Missing required parameters: date, serviceId/packageId, and therapistId" 
        });
      }

      const availableTimeSlots = await storage.getAvailableTimeSlots(
        date as string,
        serviceId ? parseInt(serviceId as string) : undefined,
        packageId ? parseInt(packageId as string) : undefined,
        parseInt(therapistId as string)
      );
      
      res.json(availableTimeSlots);
    } catch (error) {
      console.error("Error fetching availability:", error);
      res.status(500).json({ message: "Failed to retrieve availability" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
