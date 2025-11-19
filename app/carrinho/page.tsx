'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string | null;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Carregar carrinho do localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    setIsLoading(false);
  }, []);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }

    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (id: string) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando carrinho...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold text-gray-900">Carrinho de Compras</h1>
          </div>
        </div>

        {/* Empty State */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="text-6xl mb-6">🛒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Seu carrinho está vazio
            </h2>
            <p className="text-gray-600 mb-8">
              Adicione alguns produtos deliciosos ao seu carrinho para continuar.
            </p>
            <Link href="/">
              <Button className="px-8 py-3 text-lg">
                🍽️ Ver Cardápio
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Carrinho de Compras ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'itens'})
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Lista de Itens */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Itens do Pedido
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-sm text-red-600 hover:text-red-800 transition-colors"
                  >
                    Limpar carrinho
                  </button>
                </div>
              </div>

              <div className="divide-y">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6 flex gap-4">
                    {/* Imagem */}
                    <div className="w-20 h-20 shrink-0">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">🍽️</span>
                        </div>
                      )}
                    </div>

                    {/* Informações */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900 truncate">
                        {item.name}
                      </h3>
                      <p className="text-lg font-semibold text-green-600 mt-1">
                        R$ {item.price.toFixed(2).replace('.', ',')}
                      </p>

                      {/* Controles de Quantidade */}
                      <div className="flex items-center mt-4 space-x-4">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <span className="text-lg">−</span>
                          </button>
                          <span className="px-4 py-2 text-lg font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <span className="text-lg">+</span>
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-sm text-red-600 hover:text-red-800 transition-colors"
                        >
                          Remover
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">
                        R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Resumo do Pedido */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Resumo do Pedido
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Itens ({getTotalItems()})
                  </span>
                  <span className="text-gray-900">
                    R$ {getTotalPrice().toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Taxa de entrega</span>
                  <span className="text-gray-900">R$ 5,00</span>
                </div>

                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-green-600">
                      R$ {(getTotalPrice() + 5).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>
              </div>

              <Link href="/checkout" className="block mt-6">
                <Button className="w-full py-4 text-lg font-semibold">
                  🚚 Finalizar Pedido
                </Button>
              </Link>

              <Link 
                href="/" 
                className="block text-center mt-4 text-sm text-gray-600 hover:text-gray-900"
              >
                Continuar comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}