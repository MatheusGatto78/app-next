import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import prisma from '@/lib/prisma-client'
import AddPedido from './_components/add-pedido'
import EditPedido from './_components/edit-pedido'
import DeletePedido from './_components/delete-pedido'
import { listarProdutos } from './actions'
import { DataTable } from './_components/data-table'
import { columns, PedidoData } from './_components/columns-simple'
import { ColumnDef } from "@tanstack/react-table"

export default async function PedidosPage() {
  const [pedidos, produtos] = await Promise.all([
    prisma.pedido.findMany({
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
    }),
    listarProdutos()
  ])

  function calcularTotalPedido(produtos: any[]) {
    return produtos.reduce((total, item) => {
      return total + (item.produto.preco * item.quantidade)
    }, 0)
  }

  // Transformar dados para o formato esperado pelo DataTable
  const pedidosData: PedidoData[] = pedidos.map(pedido => ({
    id: pedido.id,
    nome: pedido.nome,
    endereco: pedido.endereco,
    telefone: pedido.telefone,
    produtos: pedido.produtos.map(p => ({
      produto: {
        id: p.produto.id,
        nome: p.produto.nome,
        preco: p.produto.preco
      },
      quantidade: p.quantidade
    })),
    total: calcularTotalPedido(pedido.produtos),
    createdAt: pedido.createdAt
  }))

  // Adicionar coluna de ações
  const columnsWithActions: ColumnDef<PedidoData>[] = [
    ...columns,
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

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
          <p className="text-muted-foreground">
            Gerencie os pedidos dos clientes
          </p>
        </div>
        <AddPedido produtos={produtos} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Pedidos</CardTitle>
          <CardDescription>
            Todos os pedidos realizados pelos clientes
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pedidosData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-lg border border-dashed p-8">
                <h3 className="text-lg font-semibold">Nenhum pedido encontrado</h3>
                <p className="text-muted-foreground mt-2">
                  Comece criando o primeiro pedido.
                </p>
                <div className="mt-4">
                  <AddPedido produtos={produtos} />
                </div>
              </div>
            </div>
          ) : (
            <DataTable columns={columnsWithActions} data={pedidosData} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
