import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import prisma from '@/lib/prisma-client'
import AddPedido from './_components/add-pedido'
import { listarProdutos } from './actions'
import { PedidosDataTable } from './_components/pedidos-data-table'

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

  // Transformar dados para o formato esperado
  const pedidosData = pedidos.map(pedido => ({
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
            <PedidosDataTable 
              pedidos={pedidosData} 
              produtos={produtos} 
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}