import { Router } from "express";
import { z } from "zod";
import { countryToCurrency } from "@shared/schema";
import { storage } from "./storage";

const router = Router();

// Generate a 7-digit account number
function generateAccountNumber(): string {
  return Math.floor(1000000 + Math.random() * 9000000).toString();
}

// User registration endpoint
router.post("/api/users/register", async (req, res) => {
  try {
    const { fullName, country, contactNumber, email } = req.body;
    
    // Validate input
    if (!fullName || !country || !contactNumber || !email) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await storage.getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: "User with this email already exists" });
    }

    // Get currency based on country
    const currency = countryToCurrency[country] || "USD";
    
    // Create user
    const user = await storage.createUser({
      fullName,
      country,
      contactNumber,
      email,
      currency,
      accountNumber: generateAccountNumber(),
      balance: "0.00"
    });

    res.status(201).json({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      accountNumber: user.accountNumber,
      currency: user.currency,
      balance: user.balance
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get user by email
router.get("/api/users/email/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const user = await storage.getUserByEmail(email);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      accountNumber: user.accountNumber,
      currency: user.currency,
      balance: user.balance
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get user by ID
router.get("/api/users/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const user = await storage.getUser(id);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      accountNumber: user.accountNumber,
      currency: user.currency,
      balance: user.balance
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;