import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import prisma from '@/lib/prisma-client'
import AddPedido from './_components/add-pedido'
import EditPedido from './_components/edit-pedido'
import DeletePedido from './_components/delete-pedido'
import { listarProdutos } from './actions'

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
          {pedidos.length === 0 ? (
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Endereço</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Produtos</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pedidos.map((pedido) => {
                  const total = calcularTotalPedido(pedido.produtos)
                  
                  return (
                    <TableRow key={pedido.id}>
                      <TableCell className="font-medium">{pedido.nome}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{pedido.endereco}</TableCell>
                      <TableCell>{pedido.telefone}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {pedido.produtos.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-xs">
                                {item.quantidade}x {item.produto.nome}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-semibold text-green-600">
                        R$ {total.toFixed(2).replace('.', ',')}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{pedido.createdAt.toLocaleDateString('pt-BR')}</div>
                          <div className="text-muted-foreground">
                            {pedido.createdAt.toLocaleTimeString('pt-BR', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <EditPedido
                            pedido={{
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
                              }))
                            }}
                            produtos={produtos}
                          />
                          <DeletePedido id={pedido.id} nome={pedido.nome} />
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
