import { Router, Request, Response, NextFunction } from "express";
import { storage } from "./storage";
import { insertTherapistSchema } from "@shared/schema";
import "express-session";

declare module "express-session" {
  interface SessionData {
    isAdmin?: boolean;
  }
}

const adminRoutes = Router();

// Middleware to check if user is an admin
const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.isAdmin) {
    return next();
  }
  res.status(403).json({ message: "Forbidden: Admins only" });
};

// Admin Login
adminRoutes.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASSWORD
  ) {
    req.session.isAdmin = true;
    req.session.save((err) => {
      if (err) {
        return res.status(500).json({ message: "Session save error" });
      }
      res.status(200).json({ message: "Login successful" });
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Admin Logout
adminRoutes.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Could not log out" });
    }
    res.status(200).json({ message: "Logout successful" });
  });
});

// Check session status
adminRoutes.get("/session", (req, res) => {
  if (req.session.isAdmin) {
    res.status(200).json({ isAdmin: true });
  } else {
    res.status(200).json({ isAdmin: false });
  }
});


// Therapist Management
adminRoutes.get("/therapists", isAdmin, async (req, res) => {
  const therapists = await storage.getAllTherapists();
  res.json(therapists);
});

adminRoutes.post("/therapists", isAdmin, async (req, res) => {
  try {
    const validatedData = insertTherapistSchema.parse(req.body);
    const newTherapist = await storage.createTherapist(validatedData);
    res.status(201).json(newTherapist);
  } catch (error) {
    res.status(400).json({ message: "Validation error", error });
  }
});

adminRoutes.put("/therapists/:id", isAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const validatedData = insertTherapistSchema.partial().parse(req.body);
    const updatedTherapist = await storage.updateTherapist(id, validatedData);
    res.json(updatedTherapist);
  } catch (error) {
    res.status(400).json({ message: "Validation error", error });
  }
});

adminRoutes.delete("/therapists/:id", isAdmin, async (req, res) => {
  const id = parseInt(req.params.id);
  await storage.deleteTherapist(id);
  res.status(204).send();
});

// Service Management
adminRoutes.get("/services", isAdmin, async (req, res) => {
  const allServices = await storage.getAllServices();
  res.json(allServices);
});

adminRoutes.post("/services", isAdmin, async (req, res) => {
  try {
    // Note: Drizzle-zod schema can be used here for validation if needed
    const newService = await storage.createService(req.body);
    res.status(201).json(newService);
  } catch (error) {
    res.status(400).json({ message: "Validation error", error });
  }
});

adminRoutes.put("/services/:id", isAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updatedService = await storage.updateService(id, req.body);
    res.json(updatedService);
  } catch (error) {
    res.status(400).json({ message: "Validation error", error });
  }
});

adminRoutes.delete("/services/:id", isAdmin, async (req, res) => {
  const id = parseInt(req.params.id);
  await storage.deleteService(id);
  res.status(204).send();
});

// Get all bookings (admin only)
adminRoutes.get("/bookings", isAdmin, async (req, res) => {
  try {
    const allBookings = await storage.getAllBookings();
    res.json(allBookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings", error });
  }
});

// Optionally, add a delete route for bookings if you want to support cancellation
adminRoutes.delete("/bookings/:id", isAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await storage.deleteBooking(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Failed to delete booking", error });
  }
});


export default adminRoutes; 