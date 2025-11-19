import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma/client";
import { headers } from "next/headers";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerName, customerEmail, customerPhone, items, total, userId } = body;

    // Validar dados
    if (!customerName || !customerEmail || !customerPhone || !items || !total) {
      return NextResponse.json(
        { error: "Dados incompletos" },
        { status: 400 }
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Carrinho vazio" },
        { status: 400 }
      );
    }

    // Criar pedido no banco de dados
    const order = await prisma.order.create({
      data: {
        customerName,
        customerEmail,
        customerPhone,
        total,
        status: "pending",
        userId: userId || null,
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        customerName: order.customerName,
        total: order.total,
        status: order.status,
        createdAt: order.createdAt
      }
    });

  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    return NextResponse.json(
      { error: "Erro ao processar pedido" },
      { status: 500 }
    );
  }
}
