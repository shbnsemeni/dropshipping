"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Link from "next/link";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      toast.success("Welcome back!");
      router.push("/");
    } else {
      toast.error(result.error || "Login failed");
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-stone-900">Welcome Back</h1>
          <p className="text-stone-500 mt-2">Sign in to your account</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-stone-200 p-6 md:p-8 space-y-4">
          <Input label="Email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
          <Input label="Password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
          <Button onClick={handleLogin} className="w-full" size="lg" loading={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </div>
        <p className="text-center text-sm text-stone-500 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/account/signup" className="text-rose-600 hover:text-rose-700 font-medium">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
