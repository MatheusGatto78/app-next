import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma/client";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Obter session do cookie (Better Auth usa cookies)
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('better-auth.session_token')?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    // Buscar session no banco para obter userId
    const session = await prisma.session.findUnique({
      where: { token: sessionToken },
      include: { user: true }
    });

    if (!session || !session.userId) {
      return NextResponse.json(
        { error: "Sessão inválida" },
        { status: 401 }
      );
    }

    // Buscar pedidos do usuário
    const orders = await prisma.order.findMany({
      where: {
        userId: session.userId
      },
      include: {
        items: {
          include: {
            product: {
              select: {
                name: true,
                imageUrl: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({
      success: true,
      orders
    });

  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar pedidos" },
      { status: 500 }
    );
  }
}
