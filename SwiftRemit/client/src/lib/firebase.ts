import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-api-key",
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project"}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project"}.firebasestorage.app`,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "demo-app-id",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export interface UserProfile {
  uid: string;
  fullName: string;
  country: string;
  contactNumber: string;
  email: string;
  currency: string;
  accountNumber: string;
  balance: number;
  createdAt: Date;
}

// Generate a 7-digit account number
function generateAccountNumber(): string {
  return Math.floor(1000000 + Math.random() * 9000000).toString();
}

// Get currency based on country
function getCurrencyForCountry(countryCode: string): string {
  const countryToCurrency: Record<string, string> = {
    US: "USD",
    UK: "GBP", 
    NG: "NGN",
    IN: "INR",
    CA: "CAD",
    AU: "AUD",
    DE: "EUR",
    FR: "EUR"
  };
  return countryToCurrency[countryCode] || "USD";
}

export async function signUpUser(userData: {
  fullName: string;
  country: string;
  contactNumber: string;
  email: string;
  password: string;
}) {
  try {
    // Create Firebase authentication account
    const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
    const user = userCredential.user;

    // Create user profile in our PostgreSQL database via API
    const response = await fetch("/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: userData.fullName,
        country: userData.country,
        contactNumber: userData.contactNumber,
        email: userData.email,
      }),
    });

    if (!response.ok) {
      // If database creation fails, delete the Firebase user
      await user.delete();
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to create user profile");
    }

    const userProfile = await response.json();
    
    return { user, userProfile };
  } catch (error: any) {
    throw new Error(error.message || "Failed to create account");
  }
}

export async function signInUser(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message || "Failed to sign in");
  }
}

export async function signOutUser() {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message || "Failed to sign out");
  }
}

export async function getUserProfile(email: string): Promise<UserProfile | null> {
  try {
    const response = await fetch(`/api/users/email/${encodeURIComponent(email)}`);
    
    if (!response.ok) {
      return null;
    }
    
    const userProfile = await response.json();
    return {
      uid: userProfile.id.toString(),
      fullName: userProfile.fullName,
      country: userProfile.country || "US",
      contactNumber: userProfile.contactNumber,
      email: userProfile.email,
      currency: userProfile.currency,
      accountNumber: userProfile.accountNumber,
      balance: parseFloat(userProfile.balance),
      createdAt: new Date(userProfile.createdAt)
    };
  } catch (error) {
    console.error("Error getting user profile:", error);
    return null;
  }
}

export function onAuthStateChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

// Auth hook for React components
import { useState, useEffect } from "react";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOutUser();
  };

  return { user, loading, logout };
}
