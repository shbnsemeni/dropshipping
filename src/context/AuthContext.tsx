"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";

interface Customer {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  customer: Customer | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/customer/me")
      .then((r) => r.json())
      .then((data) => {
        if (data.customer) setCustomer(data.customer);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/customer/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setCustomer(data.customer);
        return { success: true };
      }
      return { success: false, error: data.error || "Login failed" };
    } catch {
      return { success: false, error: "Connection error" };
    }
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/customer/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setCustomer(data.customer);
        return { success: true };
      }
      return { success: false, error: data.error || "Signup failed" };
    } catch {
      return { success: false, error: "Connection error" };
    }
  }, []);

  const logout = useCallback(async () => {
    await fetch("/api/auth/customer/logout", { method: "POST" });
    setCustomer(null);
  }, []);

  return (
    <AuthContext.Provider value={{ customer, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within CustomerProvider");
  return context;
}
