"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

export type PedidoData = {
  id: string
  nome: string
  endereco: string
  telefone: string
  produtos: {
    produto: {
      id: string
      nome: string
      preco: number
    }
    quantidade: number
  }[]
  total: number
  createdAt: Date
}

interface Produto {
  id: string
  nome: string
  preco: number
  categoria: {
    nome: string
  }
}

export function createColumns(produtos: Produto[]): ColumnDef<PedidoData>[] {
  return [
    {
      accessorKey: "nome",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Cliente
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <div className="font-medium">{row.getValue("nome")}</div>
      },
    },
    {
      accessorKey: "endereco",
      header: "Endereço",
      cell: ({ row }) => {
        return (
          <div className="max-w-[200px] truncate">
            {row.getValue("endereco")}
          </div>
        )
      },
    },
    {
      accessorKey: "telefone",
      header: "Telefone",
    },
    {
      id: "produtos",
      header: "Produtos",
      cell: ({ row }) => {
        const produtos = row.original.produtos
        return (
          <div className="space-y-1">
            {produtos.map((item, index) => (
              <Badge key={index} variant="secondary" className="text-xs mr-1 mb-1">
                {item.quantidade}x {item.produto.nome}
              </Badge>
            ))}
          </div>
        )
      },
    },
    {
      accessorKey: "total",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="justify-end"
          >
            Total
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const total = parseFloat(row.getValue("total"))
        const formatted = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(total)
   
        return <div className="text-right font-semibold text-green-600">{formatted}</div>
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Data
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const date = row.getValue("createdAt") as Date
        return (
          <div className="text-sm">
            <div>{date.toLocaleDateString('pt-BR')}</div>
            <div className="text-muted-foreground">
              {date.toLocaleTimeString('pt-BR', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>
        )
      },
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const pedido = row.original
   
        // Retornar placeholder que será substituído pela página
        return (
          <div className="flex gap-2 justify-end">
            <span data-pedido-id={pedido.id} data-action="edit">Editar</span>
            <span data-pedido-id={pedido.id} data-action="delete">Excluir</span>
          </div>
        )
      },
    },
  ]
}