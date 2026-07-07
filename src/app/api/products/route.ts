import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const featured = searchParams.get("featured");
  const slug = searchParams.get("slug");

  if (slug) {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: { category: true },
    });
    if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ ...product, images: JSON.parse(product.images) });
  }

  const where: any = {};

  if (category) {
    const cat = await prisma.category.findUnique({ where: { slug: category } });
    if (cat) where.categoryId = cat.id;
  }

  if (search) {
    where.name = { contains: search };
  }

  if (featured === "true") {
    where.featured = true;
  }

  const products = await prisma.product.findMany({
    where,
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(
    products.map((p) => ({ ...p, images: JSON.parse(p.images) }))
  );
}
