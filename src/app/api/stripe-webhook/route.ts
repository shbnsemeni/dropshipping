import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const metadata = session.metadata!;

    const items = JSON.parse(metadata.items);

    const total = session.amount_total ? session.amount_total / 100 : 0;

    await prisma.order.create({
      data: {
        customerEmail: metadata.customerEmail,
        customerName: metadata.customerName,
        address: metadata.address,
        city: metadata.city,
        state: metadata.state,
        zip: metadata.zip,
        country: metadata.country,
        total,
        stripeSessionId: session.id,
        status: "paid",
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });
  }

  return NextResponse.json({ received: true });
}
