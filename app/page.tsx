import Link from "next/link";
import { PrismaClient } from "@/generated/prisma/client";

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

export default async function HomePage() {
  const [banner, categories] = await Promise.all([
    getBanner(),
    getCategories()
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

        {/* Seção de destaque */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            🚚 Entrega rápida em toda a cidade
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Peça agora e receba sua comida favorita no conforto da sua casa. 
            Entregamos em até 45 minutos!
          </p>
        </div>
      </div>
    </div>
  );
}
