import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("customer_session")?.value;

    if (sessionToken) {
      await prisma.customer.updateMany({
        where: { sessionToken },
        data: { sessionToken: null },
      });
    }

    cookieStore.delete("customer_session");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
