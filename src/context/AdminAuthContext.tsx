"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth, isFirebaseConfigured } from "@/lib/firebase/client";

interface AdminAuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  isFirebaseReady: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  loginDemoAdmin: () => void;
  isDemoSession: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  isFirebaseReady: false,
  login: async () => {},
  logout: async () => {},
  loginDemoAdmin: () => {},
  isDemoSession: false,
});

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemoSession, setIsDemoSession] = useState(false);

  const isFirebaseReady = isFirebaseConfigured() && Boolean(auth);

  useEffect(() => {
    // Check if there is an active local demo session stored in sessionStorage
    if (typeof window !== "undefined") {
      const demo = sessionStorage.getItem("ff_admin_demo_session");
      if (demo === "true") {
        setIsDemoSession(true);
        setLoading(false);
        return;
      }
    }

    if (!isFirebaseReady || !auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isFirebaseReady]);

  const login = async (email: string, pass: string) => {
    if (!isFirebaseReady || !auth) {
      throw new Error(
        "Firebase Authentication is not configured yet in .env.local. Please check the setup instructions."
      );
    }
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const loginDemoAdmin = () => {
    setIsDemoSession(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("ff_admin_demo_session", "true");
    }
  };

  const logout = async () => {
    if (isDemoSession) {
      setIsDemoSession(false);
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("ff_admin_demo_session");
      }
    }
    if (auth) {
      await firebaseSignOut(auth);
    }
    setUser(null);
  };

  const isAdmin = Boolean(user) || isDemoSession;

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        loading,
        isAdmin,
        isFirebaseReady,
        login,
        logout,
        loginDemoAdmin,
        isDemoSession,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => useContext(AdminAuthContext);
