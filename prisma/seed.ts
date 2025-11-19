import * as dotenv from 'dotenv'
import { PrismaClient } from '../generated/prisma/client'

// Carregar variáveis de ambiente
dotenv.config()

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Criar banner
  const banner = await prisma.banner.create({
    data: {
      title: 'Delivery Rápido e Saboroso',
      description: 'Peça agora e receba em casa com rapidez e qualidade!',
      imageUrl: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=1200&h=400&fit=crop',
      isActive: true,
    },
  })

  // Criar categorias
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Lanches',
        slug: 'lanches',
        color: '#ff6b35',
        imageUrl: '🍔',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Pizzas',
        slug: 'pizzas',
        color: '#ff9500',
        imageUrl: '🍕',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Bebidas',
        slug: 'bebidas',
        color: '#007aff',
        imageUrl: '🥤',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Sobremesas',
        slug: 'sobremesas',
        color: '#ff2d92',
        imageUrl: '🍰',
      },
    }),
  ])

  // Criar produtos para Lanches
  await Promise.all([
    prisma.product.create({
      data: {
        name: 'X-Burger Clássico',
        slug: 'x-burger-classico',
        description: 'Hambúrguer artesanal com queijo, alface, tomate e molho especial',
        price: 18.90,
        imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
        categoryId: categories[0].id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'X-Bacon Deluxe',
        slug: 'x-bacon-deluxe',
        description: 'Hambúrguer com bacon crocante, queijo cheddar e cebola caramelizada',
        price: 22.90,
        imageUrl: 'https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?w=400&h=300&fit=crop',
        categoryId: categories[0].id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Chicken Burger',
        slug: 'chicken-burger',
        description: 'Peito de frango grelhado, queijo, alface e maionese temperada',
        price: 19.90,
        imageUrl: 'https://images.unsplash.com/photo-1606755962773-d324e2d63154?w=400&h=300&fit=crop',
        categoryId: categories[0].id,
      },
    }),
  ])

  // Criar produtos para Pizzas
  await Promise.all([
    prisma.product.create({
      data: {
        name: 'Pizza Margherita',
        slug: 'pizza-margherita',
        description: 'Molho de tomate, mussarela, manjericão fresco e azeite',
        price: 35.90,
        imageUrl: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop',
        categoryId: categories[1].id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Pizza Pepperoni',
        slug: 'pizza-pepperoni',
        description: 'Molho de tomate, mussarela e pepperoni premium',
        price: 42.90,
        imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop',
        categoryId: categories[1].id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Pizza Quatro Queijos',
        slug: 'pizza-quatro-queijos',
        description: 'Mussarela, gorgonzola, parmesão e provolone',
        price: 39.90,
        imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop',
        categoryId: categories[1].id,
      },
    }),
  ])

  // Criar produtos para Bebidas
  await Promise.all([
    prisma.product.create({
      data: {
        name: 'Coca-Cola 350ml',
        slug: 'coca-cola-350ml',
        description: 'Refrigerante Coca-Cola lata 350ml gelado',
        price: 4.50,
        imageUrl: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=300&fit=crop',
        categoryId: categories[2].id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Suco de Laranja Natural',
        slug: 'suco-laranja-natural',
        description: 'Suco de laranja 100% natural sem açúcar - 300ml',
        price: 6.90,
        imageUrl: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop',
        categoryId: categories[2].id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Água Mineral 500ml',
        slug: 'agua-mineral-500ml',
        description: 'Água mineral sem gás - 500ml',
        price: 3.00,
        imageUrl: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=400&h=300&fit=crop',
        categoryId: categories[2].id,
      },
    }),
  ])

  // Criar produtos para Sobremesas
  await Promise.all([
    prisma.product.create({
      data: {
        name: 'Pudim de Leite',
        slug: 'pudim-de-leite',
        description: 'Pudim de leite condensado com calda de caramelo',
        price: 8.90,
        imageUrl: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop',
        categoryId: categories[3].id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Torta de Chocolate',
        slug: 'torta-de-chocolate',
        description: 'Deliciosa torta de chocolate meio amargo com ganache',
        price: 12.90,
        imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop',
        categoryId: categories[3].id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Sorvete 2 Bolas',
        slug: 'sorvete-2-bolas',
        description: 'Duas bolas de sorvete à sua escolha com cobertura',
        price: 9.90,
        imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop',
        categoryId: categories[3].id,
      },
    }),
  ])

  console.log('✅ Seed completed successfully!')
  console.log(`🎯 Created:`)
  console.log(`   - 1 banner`)
  console.log(`   - 4 categories`)
  console.log(`   - 12 products`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })