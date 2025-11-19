import Link from "next/link";
import { PrismaClient } from "@/generated/prisma/client";
import Features from "../components/features";
import CTASection from "../components/cta-section";

const prisma = new PrismaClient();

async function getBanner() {
  return await prisma.banner.findFirst({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' }
  });
}

async function getCategories() {
  return await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { name: 'asc' }
  });
}

async function getFeaturedProducts() {
  return await prisma.product.findMany({
    take: 4,
    where: { isActive: true },
    orderBy: { createdAt: 'desc' },
    include: {
      category: true
    }
  });
}

export default async function HomePage() {
  const [banner, categories, featuredProducts] = await Promise.all([
    getBanner(),
    getCategories(),
    getFeaturedProducts()
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Principal */}
      {banner && (
        <div className="relative h-64 md:h-96 overflow-hidden">
          <img
            src={banner.imageUrl}
            alt={banner.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                {banner.title}
              </h1>
              {banner.description && (
                <p className="text-lg md:text-xl max-w-2xl">
                  {banner.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Container Principal */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
          Escolha sua categoria
        </h2>

        {/* Grid de Categorias */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categoria/${category.slug}`}
              className="group"
            >
              <div
                className="relative overflow-hidden rounded-xl p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{ backgroundColor: category.color }}
              >
                <div className="text-white">
                  <div className="text-4xl mb-3">
                    {category.imageUrl || '🍽️'}
                  </div>
                  <h3 className="text-lg font-semibold">
                    {category.name}
                  </h3>
                </div>
                
                {/* Overlay de hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-xl"></div>
              </div>
            </Link>
          ))}
        </div>

        {/* Produtos em Destaque */}
        {featuredProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
              Produtos em Destaque
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/produto/${product.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={product.imageUrl || 'https://via.placeholder.com/300x200?text=Produto'}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div 
                        className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold text-white"
                        style={{ backgroundColor: product.category.color }}
                      >
                        {product.category.name}
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-green-600">
                          R$ {product.price.toFixed(2).replace('.', ',')}
                        </span>
                        <span className="text-orange-600 text-sm font-medium">
                          Ver detalhes →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Features Section */}
      <Features />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
