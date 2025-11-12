'use server'

import prisma from '@/lib/prisma-client'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

// Schema de validação para produto
const produtoSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome deve ter no máximo 100 caracteres'),
  descricao: z.string().optional(),
  preco: z.number().min(0.01, 'Preço deve ser maior que zero'),
  categoriaId: z.string().min(1, 'Categoria é obrigatória')
})

export async function criarProduto(formData: FormData) {
  try {
    const nome = formData.get('nome') as string
    const descricao = formData.get('descricao') as string
    const preco = parseFloat(formData.get('preco') as string)
    const categoriaId = formData.get('categoriaId') as string

    // Validação com Zod
    const validatedData = produtoSchema.parse({
      nome,
      descricao: descricao || undefined,
      preco,
      categoriaId
    })

    // Verificar se a categoria existe
    const categoria = await prisma.categorias.findUnique({
      where: { id: categoriaId }
    })

    if (!categoria) {
      return { error: 'Categoria não encontrada' }
    }

    await prisma.produto.create({
      data: validatedData
    })

    revalidatePath('/painel/produtos')
    return { success: 'Produto criado com sucesso!' }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.issues[0]?.message || 'Dados inválidos' }
    }
    console.error('Erro ao criar produto:', error)
    return { error: 'Erro interno do servidor' }
  }
}

export async function editarProduto(id: string, formData: FormData) {
  try {
    const nome = formData.get('nome') as string
    const descricao = formData.get('descricao') as string
    const preco = parseFloat(formData.get('preco') as string)
    const categoriaId = formData.get('categoriaId') as string

    // Validação com Zod
    const validatedData = produtoSchema.parse({
      nome,
      descricao: descricao || undefined,
      preco,
      categoriaId
    })

    // Verificar se o produto existe
    const produto = await prisma.produto.findUnique({
      where: { id }
    })

    if (!produto) {
      return { error: 'Produto não encontrado' }
    }

    // Verificar se a categoria existe
    const categoria = await prisma.categorias.findUnique({
      where: { id: categoriaId }
    })

    if (!categoria) {
      return { error: 'Categoria não encontrada' }
    }

    await prisma.produto.update({
      where: { id },
      data: validatedData
    })

    revalidatePath('/painel/produtos')
    return { success: 'Produto atualizado com sucesso!' }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.issues[0]?.message || 'Dados inválidos' }
    }
    console.error('Erro ao editar produto:', error)
    return { error: 'Erro interno do servidor' }
  }
}

export async function excluirProduto(id: string) {
  try {
    // Verificar se o produto existe
    const produto = await prisma.produto.findUnique({
      where: { id }
    })

    if (!produto) {
      return { error: 'Produto não encontrado' }
    }

    await prisma.produto.delete({
      where: { id }
    })

    revalidatePath('/painel/produtos')
    return { success: 'Produto excluído com sucesso!' }
  } catch (error) {
    console.error('Erro ao excluir produto:', error)
    return { error: 'Erro interno do servidor' }
  }
}

export async function listarCategorias() {
  try {
    const categorias = await prisma.categorias.findMany({
      orderBy: { nome: 'asc' }
    })
    return categorias
  } catch (error) {
    console.error('Erro ao listar categorias:', error)
    return []
  }
}