import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("customer_session")?.value;

    if (!sessionToken) {
      return NextResponse.json({ customer: null });
    }

    const customer = await prisma.customer.findFirst({
      where: { sessionToken },
    });

    if (!customer) {
      return NextResponse.json({ customer: null });
    }

    return NextResponse.json({
      customer: { id: customer.id, email: customer.email, name: customer.name },
    });
  } catch (error) {
    console.error("Me error:", error);
    return NextResponse.json({ customer: null });
  }
}
