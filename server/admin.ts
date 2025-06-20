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


export default adminRoutes; 