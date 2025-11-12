'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Plus, X } from 'lucide-react'
import { criarPedido } from '../actions'
import { toast } from 'sonner'

interface Produto {
  id: string
  nome: string
  preco: number
  categoria: {
    nome: string
  }
}

interface ProdutoSelecionado {
  produtoId: string
  nome: string
  preco: number
  quantidade: number
}

interface AddPedidoProps {
  produtos: Produto[]
}

export default function AddPedido({ produtos }: AddPedidoProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [produtosSelecionados, setProdutosSelecionados] = useState<ProdutoSelecionado[]>([])
  const [produtoAtual, setProdutoAtual] = useState('')
  const [quantidadeAtual, setQuantidadeAtual] = useState(1)

  function adicionarProduto() {
    if (!produtoAtual) return

    const produto = produtos.find(p => p.id === produtoAtual)
    if (!produto) return

    // Verificar se produto já foi adicionado
    const jaAdicionado = produtosSelecionados.some(p => p.produtoId === produtoAtual)
    if (jaAdicionado) {
      toast.error('Produto já foi adicionado ao pedido')
      return
    }

    const novoProduto: ProdutoSelecionado = {
      produtoId: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      quantidade: quantidadeAtual
    }

    setProdutosSelecionados([...produtosSelecionados, novoProduto])
    setProdutoAtual('')
    setQuantidadeAtual(1)
  }

  function removerProduto(produtoId: string) {
    setProdutosSelecionados(produtosSelecionados.filter(p => p.produtoId !== produtoId))
  }

  function calcularTotal() {
    return produtosSelecionados.reduce((total, produto) => {
      return total + (produto.preco * produto.quantidade)
    }, 0)
  }

  async function handleSubmit(formData: FormData) {
    if (produtosSelecionados.length === 0) {
      toast.error('Adicione pelo menos um produto ao pedido')
      return
    }

    setIsSubmitting(true)
    
    try {
      // Adicionar produtos ao FormData como JSON
      formData.append('produtos', JSON.stringify(
        produtosSelecionados.map(p => ({
          produtoId: p.produtoId,
          quantidade: p.quantidade
        }))
      ))

      const result = await criarPedido(formData)
      
      if (result.error) {
        toast.error(result.error)
      } else if (result.success) {
        toast.success(result.success)
        setOpen(false)
        // Reset form
        const form = document.getElementById('add-pedido-form') as HTMLFormElement
        form?.reset()
        setProdutosSelecionados([])
        setProdutoAtual('')
        setQuantidadeAtual(1)
      }
    } catch (error) {
      toast.error('Erro inesperado')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Pedido
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Pedido</DialogTitle>
          <DialogDescription>
            Preencha os dados do cliente e selecione os produtos.
          </DialogDescription>
        </DialogHeader>
        <form id="add-pedido-form" action={handleSubmit} className="space-y-4">
          {/* Dados do Cliente */}
          <div className="space-y-4 border-b pb-4">
            <h3 className="font-medium">Dados do Cliente</h3>
            
            <div className="space-y-2">
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                name="nome"
                placeholder="Nome completo do cliente"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endereco">Endereço</Label>
              <Input
                id="endereco"
                name="endereco"
                placeholder="Endereço completo"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                name="telefone"
                placeholder="(00) 00000-0000"
                required
              />
            </div>
          </div>

          {/* Seleção de Produtos */}
          <div className="space-y-4">
            <h3 className="font-medium">Produtos</h3>
            
            <div className="flex gap-2">
              <div className="flex-1">
                <Select value={produtoAtual} onValueChange={setProdutoAtual}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um produto" />
                  </SelectTrigger>
                  <SelectContent>
                    {produtos.map((produto) => (
                      <SelectItem key={produto.id} value={produto.id}>
                        {produto.nome} - R$ {produto.preco.toFixed(2).replace('.', ',')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-24">
                <Input
                  type="number"
                  min="1"
                  value={quantidadeAtual}
                  onChange={(e) => setQuantidadeAtual(parseInt(e.target.value) || 1)}
                  placeholder="Qtd"
                />
              </div>
              
              <Button
                type="button"
                onClick={adicionarProduto}
                disabled={!produtoAtual}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Lista de Produtos Selecionados */}
            {produtosSelecionados.length > 0 && (
              <div className="space-y-2">
                <Label>Produtos Selecionados</Label>
                <div className="border rounded-lg p-3 space-y-2 max-h-40 overflow-y-auto">
                  {produtosSelecionados.map((produto) => (
                    <div key={produto.produtoId} className="flex items-center justify-between bg-muted p-2 rounded">
                      <div className="flex-1">
                        <span className="font-medium">{produto.nome}</span>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge variant="outline">Qtd: {produto.quantidade}</Badge>
                          <span>R$ {(produto.preco * produto.quantidade).toFixed(2).replace('.', ',')}</span>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removerProduto(produto.produtoId)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <div className="border-t pt-2 font-medium text-right">
                    Total: R$ {calcularTotal().toFixed(2).replace('.', ',')}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || produtosSelecionados.length === 0}
            >
              {isSubmitting ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}