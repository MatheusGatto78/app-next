import Link from "next/link";
import { notFound } from "next/navigation";
import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

async function getCategoryBySlug(slug: string) {
  return await prisma.category.findUnique({
    where: { slug, isActive: true },
    include: {
      products: {
        where: { isActive: true },
        orderBy: { name: 'asc' }
      }
    }
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header da Categoria */}
      <div 
        className="relative py-16"
        style={{ backgroundColor: category.color }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <div className="text-6xl mb-4">
              {category.imageUrl || '🍽️'}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {category.name}
            </h1>
            <p className="text-lg opacity-90">
              Escolha seus produtos favoritos
            </p>
          </div>
        </div>
      </div>

      {/* Navegação */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Início
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">
              {category.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Lista de Produtos */}
      <div className="container mx-auto px-4 py-8">
        {category.products.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-gray-500">
              Esta categoria ainda não possui produtos cadastrados.
            </p>
            <Link 
              href="/"
              className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Voltar ao início
            </Link>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {category.products.length} {category.products.length === 1 ? 'produto' : 'produtos'} 
              {' '}disponível{category.products.length === 1 ? '' : 'is'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.products.map((product) => (
                <Link
                  key={product.id}
                  href={`/produto/${product.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                    {/* Imagem do Produto */}
                    <div className="aspect-video overflow-hidden">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-4xl">🍽️</span>
                        </div>
                      )}
                    </div>

                    {/* Informações do Produto */}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-green-600">
                          R$ {product.price.toFixed(2).replace('.', ',')}
                        </span>
                        <span className="text-xs text-gray-500 group-hover:text-blue-600 transition-colors">
                          Ver detalhes →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    select: { slug: true }
  });

  return categories.map((category) => ({
    slug: category.slug,
  }));
}