import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import prisma from '@/lib/prisma-client'
import AddProduto from './_components/add-produto'
import EditProduto from './_components/edit-produto'
import DeleteProduto from './_components/delete-produto'
import { listarCategorias } from './actions'

export default async function ProdutosPage() {
  const [produtos, categorias] = await Promise.all([
    prisma.produto.findMany({
      include: {
        categoria: true
      },
      orderBy: {
        nome: 'asc'
      }
    }),
    listarCategorias()
  ])

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Produtos</h1>
          <p className="text-muted-foreground">
            Gerencie os produtos do sistema
          </p>
        </div>
        <AddProduto categorias={categorias} />
      </div>

      {produtos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-lg border border-dashed p-8">
            <h3 className="text-lg font-semibold">Nenhum produto encontrado</h3>
            <p className="text-muted-foreground mt-2">
              Comece criando seu primeiro produto.
            </p>
            <div className="mt-4">
              <AddProduto categorias={categorias} />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {produtos.map((produto) => (
            <Card key={produto.id} className="transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{produto.nome}</CardTitle>
                    <Badge variant="secondary" className="w-fit">
                      {produto.categoria.nome}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">
                      R$ {produto.preco.toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                </div>
              </CardHeader>
              
              {produto.descricao && (
                <CardContent>
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {produto.descricao}
                  </p>
                </CardContent>
              )}
              
              <CardFooter className="flex gap-2">
                <EditProduto 
                  produto={{
                    id: produto.id,
                    nome: produto.nome,
                    descricao: produto.descricao,
                    preco: produto.preco,
                    categoriaId: produto.categoriaId
                  }}
                  categorias={categorias}
                />
                <DeleteProduto id={produto.id} nome={produto.nome} />
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
