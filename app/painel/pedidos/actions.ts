'use server'

import prisma from '@/lib/prisma-client'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

// Schema de validação para pedido
const pedidoSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome deve ter no máximo 100 caracteres'),
  endereco: z.string().min(1, 'Endereço é obrigatório').max(200, 'Endereço deve ter no máximo 200 caracteres'),
  telefone: z.string().min(1, 'Telefone é obrigatório').max(20, 'Telefone deve ter no máximo 20 caracteres')
})

// Schema para produtos do pedido
const produtoPedidoSchema = z.object({
  produtoId: z.string().min(1, 'Produto é obrigatório'),
  quantidade: z.number().min(1, 'Quantidade deve ser maior que zero')
})

const pedidoComProdutosSchema = pedidoSchema.extend({
  produtos: z.array(produtoPedidoSchema).min(1, 'Pelo menos um produto deve ser selecionado')
})

export async function criarPedido(formData: FormData) {
  try {
    const nome = formData.get('nome') as string
    const endereco = formData.get('endereco') as string
    const telefone = formData.get('telefone') as string
    
    // Pegar produtos do JSON enviado
    const produtosJson = formData.get('produtos') as string
    const produtos = produtosJson ? JSON.parse(produtosJson) : []

    // Validação com Zod
    const validatedData = pedidoComProdutosSchema.parse({
      nome,
      endereco,
      telefone,
      produtos
    })

    // Verificar se todos os produtos existem
    const produtoIds = validatedData.produtos.map(p => p.produtoId)
    const produtosExistentes = await prisma.produto.findMany({
      where: { id: { in: produtoIds } }
    })

    if (produtosExistentes.length !== produtoIds.length) {
      return { error: 'Um ou mais produtos não foram encontrados' }
    }

    // Criar pedido com produtos em uma transação
    const pedido = await prisma.$transaction(async (tx) => {
      // Criar o pedido
      const novoPedido = await tx.pedido.create({
        data: {
          nome: validatedData.nome,
          endereco: validatedData.endereco,
          telefone: validatedData.telefone
        }
      })

      // Criar as associações com produtos
      await tx.pedidoProduto.createMany({
        data: validatedData.produtos.map(produto => ({
          pedidoId: novoPedido.id,
          produtoId: produto.produtoId,
          quantidade: produto.quantidade
        }))
      })

      return novoPedido
    })

    revalidatePath('/painel/pedidos')
    return { success: 'Pedido criado com sucesso!' }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.issues[0]?.message || 'Dados inválidos' }
    }
    console.error('Erro ao criar pedido:', error)
    return { error: 'Erro interno do servidor' }
  }
}

export async function editarPedido(id: string, formData: FormData) {
  try {
    const nome = formData.get('nome') as string
    const endereco = formData.get('endereco') as string
    const telefone = formData.get('telefone') as string
    
    // Pegar produtos do JSON enviado
    const produtosJson = formData.get('produtos') as string
    const produtos = produtosJson ? JSON.parse(produtosJson) : []

    // Validação com Zod
    const validatedData = pedidoComProdutosSchema.parse({
      nome,
      endereco,
      telefone,
      produtos
    })

    // Verificar se o pedido existe
    const pedidoExistente = await prisma.pedido.findUnique({
      where: { id }
    })

    if (!pedidoExistente) {
      return { error: 'Pedido não encontrado' }
    }

    // Verificar se todos os produtos existem
    const produtoIds = validatedData.produtos.map(p => p.produtoId)
    const produtosExistentes = await prisma.produto.findMany({
      where: { id: { in: produtoIds } }
    })

    if (produtosExistentes.length !== produtoIds.length) {
      return { error: 'Um ou mais produtos não foram encontrados' }
    }

    // Atualizar pedido em uma transação
    await prisma.$transaction(async (tx) => {
      // Atualizar dados básicos do pedido
      await tx.pedido.update({
        where: { id },
        data: {
          nome: validatedData.nome,
          endereco: validatedData.endereco,
          telefone: validatedData.telefone
        }
      })

      // Remover produtos existentes
      await tx.pedidoProduto.deleteMany({
        where: { pedidoId: id }
      })

      // Adicionar novos produtos
      await tx.pedidoProduto.createMany({
        data: validatedData.produtos.map(produto => ({
          pedidoId: id,
          produtoId: produto.produtoId,
          quantidade: produto.quantidade
        }))
      })
    })

    revalidatePath('/painel/pedidos')
    return { success: 'Pedido atualizado com sucesso!' }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.issues[0]?.message || 'Dados inválidos' }
    }
    console.error('Erro ao editar pedido:', error)
    return { error: 'Erro interno do servidor' }
  }
}

export async function excluirPedido(id: string) {
  try {
    // Verificar se o pedido existe
    const pedido = await prisma.pedido.findUnique({
      where: { id }
    })

    if (!pedido) {
      return { error: 'Pedido não encontrado' }
    }

    // Excluir pedido (cascade vai remover produtos automaticamente)
    await prisma.pedido.delete({
      where: { id }
    })

    revalidatePath('/painel/pedidos')
    return { success: 'Pedido excluído com sucesso!' }
  } catch (error) {
    console.error('Erro ao excluir pedido:', error)
    return { error: 'Erro interno do servidor' }
  }
}

export async function listarProdutos() {
  try {
    const produtos = await prisma.produto.findMany({
      include: {
        categoria: true
      },
      orderBy: { nome: 'asc' }
    })
    return produtos
  } catch (error) {
    console.error('Erro ao listar produtos:', error)
    return []
  }
}

export async function listarPedidos() {
  try {
    const pedidos = await prisma.pedido.findMany({
      include: {
        produtos: {
          include: {
            produto: {
              include: {
                categoria: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    return pedidos
  } catch (error) {
    console.error('Erro ao listar pedidos:', error)
    return []
  }
}