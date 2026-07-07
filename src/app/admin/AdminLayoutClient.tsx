"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/AdminSidebar";
import { ReactNode } from "react";

export function AdminLayoutClient({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-stone-50">
        <div className="animate-spin w-8 h-8 border-4 border-rose-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    redirect("/admin/login");
  }

  if (session?.user && (session.user as any).role !== "admin") {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-stone-50">
      <AdminSidebar />
      <div className="flex-1 p-8 overflow-auto">
        {children}
      </div>
    </div>
  );
}
