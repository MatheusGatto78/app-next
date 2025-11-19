import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma-client";

export async function GET() {
  try {
    // Buscar todas as estatísticas em paralelo
    const [
      totalProducts,
      totalCategories,
      totalOrders,
      orders,
      recentOrders
    ] = await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.order.count(),
      prisma.order.findMany({
        include: {
          items: true
        }
      }),
      prisma.order.findMany({
        take: 10,
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          items: {
            include: {
              product: true
            }
          }
        }
      })
    ]);

    // Calcular receita total
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

    // Calcular pedidos por dia para o gráfico (últimos 30 dias)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const ordersByDay = await prisma.order.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: {
          gte: thirtyDaysAgo
        }
      },
      _count: true,
      _sum: {
        total: true
      }
    });

    // Agrupar por dia
    const chartData = ordersByDay.reduce((acc: any[], order) => {
      const date = new Date(order.createdAt).toLocaleDateString('pt-BR');
      const existing = acc.find(item => item.date === date);
      
      if (existing) {
        existing.orders += order._count;
        existing.revenue += order._sum.total || 0;
      } else {
        acc.push({
          date,
          orders: order._count,
          revenue: order._sum.total || 0
        });
      }
      
      return acc;
    }, []);

    return NextResponse.json({
      totalProducts,
      totalCategories,
      totalOrders,
      totalRevenue,
      recentOrders,
      chartData
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard statistics' },
      { status: 500 }
    );
  }
}
