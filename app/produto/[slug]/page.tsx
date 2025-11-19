import { notFound } from "next/navigation";
import { PrismaClient } from "@/generated/prisma/client";
import ProductDetailsClient from "@/components/product-details-client";

const prisma = new PrismaClient();

async function getProductBySlug(slug: string) {
  return await prisma.product.findUnique({
    where: { slug, isActive: true },
    include: {
      category: true
    }
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailsClient product={product} />;
}

export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    select: { slug: true }
  });

  return products.map((product) => ({
    slug: product.slug,
  }));
}