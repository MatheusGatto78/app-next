'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function Header() {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    // Função para atualizar contagem do carrinho
    const updateCartCount = () => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const cart = JSON.parse(savedCart) as CartItem[];
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        setCartItemsCount(totalItems);
      } else {
        setCartItemsCount(0);
      }
    };

    // Atualizar na primeira carga
    updateCartCount();

    // Escutar mudanças no localStorage
    const handleStorageChange = () => {
      updateCartCount();
    };

    window.addEventListener('storage', handleStorageChange);

    // Também escutar mudanças diretas no carrinho
    const interval = setInterval(updateCartCount, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Não mostrar header nas páginas de auth
  if (pathname?.startsWith('/login') || pathname?.startsWith('/registro')) {
    return null;
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl">🍔</div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">DeliveryApp</h1>
              <p className="text-xs text-gray-500">Sabor que chega até você</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                pathname === '/' ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              Início
            </Link>
            <Link 
              href="/categoria/lanches" 
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Lanches
            </Link>
            <Link 
              href="/categoria/pizzas" 
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Pizzas
            </Link>
            <Link 
              href="/categoria/bebidas" 
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Bebidas
            </Link>
          </nav>

          {/* Cart and User Actions */}
          <div className="flex items-center space-x-4">
            
            {/* Cart */}
            <Link 
              href="/carrinho" 
              className="relative flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <div className="relative">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 2.5M7 13l1.5-2.5M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount > 99 ? '99+' : cartItemsCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:block text-sm font-medium">Carrinho</span>
            </Link>

            {/* User Menu */}
            <div className="flex items-center space-x-2">
              <Link 
                href="/login" 
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Entrar
              </Link>
              <span className="text-gray-300">|</span>
              <Link 
                href="/registro" 
                className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                Cadastrar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}