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
import { Edit } from 'lucide-react'
import { editarProduto } from '../actions'
import { toast } from 'sonner'

interface Categoria {
  id: string
  nome: string
}

interface Produto {
  id: string
  nome: string
  descricao: string | null
  preco: number
  categoriaId: string
}

interface EditProdutoProps {
  produto: Produto
  categorias: Categoria[]
}

export default function EditProduto({ produto, categorias }: EditProdutoProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    
    try {
      const result = await editarProduto(produto.id, formData)
      
      if (result.error) {
        toast.error(result.error)
      } else if (result.success) {
        toast.success(result.success)
        setOpen(false)
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
        <Button variant="outline" size="sm" className="gap-2">
          <Edit className="h-4 w-4" />
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Produto</DialogTitle>
          <DialogDescription>
            Atualize as informações do produto abaixo.
          </DialogDescription>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              name="nome"
              defaultValue={produto.nome}
              placeholder="Digite o nome do produto"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Input
              id="descricao"
              name="descricao"
              defaultValue={produto.descricao || ''}
              placeholder="Descrição opcional do produto"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="preco">Preço</Label>
            <Input
              id="preco"
              name="preco"
              type="number"
              step="0.01"
              min="0.01"
              defaultValue={produto.preco}
              placeholder="0.00"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="categoriaId">Categoria</Label>
            <Select name="categoriaId" defaultValue={produto.categoriaId} required>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categorias.map((categoria) => (
                  <SelectItem key={categoria.id} value={categoria.id}>
                    {categoria.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}