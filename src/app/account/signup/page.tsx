"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Link from "next/link";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSignup = async () => {
    if (!name || !email || !password || !confirm) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    const result = await signup(name, email, password);
    setLoading(false);
    if (result.success) {
      toast.success("Account created! Welcome!");
      router.push("/");
    } else {
      toast.error(result.error || "Signup failed");
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-stone-900">Create Account</h1>
          <p className="text-stone-500 mt-2">Join us and start shopping</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-stone-200 p-6 md:p-8 space-y-4">
          <Input label="Full Name" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" required />
          <Input label="Email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
          <Input label="Password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" required />
          <Input label="Confirm Password" name="confirm" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Repeat your password" required />
          <Button onClick={handleSignup} className="w-full" size="lg" loading={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </div>
        <p className="text-center text-sm text-stone-500 mt-6">
          Already have an account?{" "}
          <Link href="/account/login" className="text-rose-600 hover:text-rose-700 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
