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
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);

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