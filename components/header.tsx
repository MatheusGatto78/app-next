'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { Button } from './ui/button';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface User {
  id: string;
  name: string;
  email: string;
}

export default function Header() {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Carregar usuário
    const loadUser = async () => {
      try {
        const session = await authClient.getSession();
        if (session?.data?.user) {
          setUser(session.data.user as User);
        }
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
      }
    };

    loadUser();

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

  const handleLogout = async () => {
    await authClient.signOut();
    setUser(null);
    router.push('/');
  };

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
            {user && (
              <Link 
                href="/dashboard" 
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  pathname?.startsWith('/dashboard') ? 'text-blue-600' : 'text-gray-700'
                }`}
              >
                Dashboard
              </Link>
            )}
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
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </div>
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden md:block text-sm font-medium">
                    {user.name.split(' ')[0]}
                  </span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowUserMenu(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <Link
                        href="/meus-pedidos"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        📦 Meus Pedidos
                      </Link>
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        📊 Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        🚪 Sair
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link href="/login">
                <Button size="sm" variant="outline">
                  Entrar
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
