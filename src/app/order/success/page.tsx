"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
      <p className="text-gray-600 mb-2">
        Thank you for your purchase. Your order has been confirmed.
      </p>
      {sessionId && (
        <p className="text-sm text-gray-500 mb-8">
          Session ID: <span className="font-mono">{sessionId.slice(0, 20)}...</span>
        </p>
      )}
      <p className="text-sm text-gray-500 mb-8">
        You will receive an email confirmation shortly. Redirecting to home in {countdown}s...
      </p>
      <div className="flex justify-center gap-4">
        <Link href="/">
          <Button>Continue Shopping</Button>
        </Link>
        <Link href="/products">
          <Button variant="outline">Browse Products</Button>
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-gray-500">Loading...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
