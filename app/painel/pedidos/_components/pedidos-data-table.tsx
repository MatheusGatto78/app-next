"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown } from "lucide-react"
import EditPedido from './edit-pedido'
import DeletePedido from './delete-pedido'

type PedidoData = {
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

interface PedidosDataTableProps {
  pedidos: PedidoData[]
  produtos: Produto[]
}

export function PedidosDataTable({ pedidos, produtos }: PedidosDataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

  const columns: ColumnDef<PedidoData>[] = [
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
        
        return (
          <div className="flex gap-2 justify-end">
            <EditPedido
              pedido={{
                id: pedido.id,
                nome: pedido.nome,
                endereco: pedido.endereco,
                telefone: pedido.telefone,
                produtos: pedido.produtos
              }}
              produtos={produtos}
            />
            <DeletePedido id={pedido.id} nome={pedido.nome} />
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data: pedidos,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar por cliente..."
          value={(table.getColumn("nome")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("nome")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  )
}