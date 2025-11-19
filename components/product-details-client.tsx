'use client';

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  imageUrl?: string | null;
  category: {
    id: string;
    name: string;
    slug: string;
    color: string;
  };
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string | null;
}

export default function ProductDetailsClient({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const addToCart = () => {
    setIsAddingToCart(true);

    // Simular loading
    setTimeout(() => {
      // Pegar carrinho do localStorage
      const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
      
      // Verificar se produto já existe no carrinho
      const existingItemIndex = existingCart.findIndex((item: CartItem) => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Se existe, aumentar quantidade
        existingCart[existingItemIndex].quantity += quantity;
      } else {
        // Se não existe, adicionar novo item
        const newItem: CartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: quantity,
          imageUrl: product.imageUrl
        };
        existingCart.push(newItem);
      }

      // Salvar no localStorage
      localStorage.setItem('cart', JSON.stringify(existingCart));
      
      setIsAddingToCart(false);
      
      // Feedback visual
      alert(`${product.name} adicionado ao carrinho!`);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navegação */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Início
            </Link>
            <span className="text-gray-400">/</span>
            <Link 
              href={`/categoria/${product.category.slug}`} 
              className="text-gray-600 hover:text-gray-900"
            >
              {product.category.name}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Detalhes do Produto */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-2xl shadow-sm overflow-hidden">
          
          {/* Imagem do Produto */}
          <div className="aspect-square lg:aspect-auto">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-8xl">🍽️</span>
              </div>
            )}
          </div>

          {/* Informações do Produto */}
          <div className="p-6 lg:p-8 flex flex-col justify-between">
            <div>
              {/* Categoria */}
              <div className="mb-4">
                <span 
                  className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white"
                  style={{ backgroundColor: product.category.color }}
                >
                  {product.category.name}
                </span>
              </div>

              {/* Nome do Produto */}
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Descrição */}
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Preço */}
              <div className="mb-8">
                <span className="text-3xl lg:text-4xl font-bold text-green-600">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            {/* Controles de Quantidade e Compra */}
            <div className="space-y-6">
              {/* Seletor de Quantidade */}
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">
                  Quantidade:
                </span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <span className="text-lg">−</span>
                  </button>
                  <span className="px-4 py-2 text-lg font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-lg">+</span>
                  </button>
                </div>
              </div>

              {/* Botão Adicionar ao Carrinho */}
              <Button
                onClick={addToCart}
                disabled={isAddingToCart}
                className="w-full py-4 text-lg font-semibold"
                style={{ backgroundColor: product.category.color }}
              >
                {isAddingToCart ? (
                  <span className="flex items-center justify-center space-x-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Adicionando...</span>
                  </span>
                ) : (
                  <>
                    🛒 Adicionar ao Carrinho • R$ {(product.price * quantity).toFixed(2).replace('.', ',')}
                  </>
                )}
              </Button>

              {/* Link para Ver Carrinho */}
              <div className="text-center">
                <Link 
                  href="/carrinho" 
                  className="text-sm text-gray-600 hover:text-gray-900 underline"
                >
                  Ver carrinho
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}