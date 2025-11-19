'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product: {
    name: string;
    imageUrl: string | null;
  };
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  total: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

export default function MeusPedidosPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadUserAndOrders = async () => {
      try {
        // Verificar autenticação
        const session = await authClient.getSession();
        if (!session?.data?.user) {
          router.push('/login');
          return;
        }

        setUser(session.data.user);

        // Carregar pedidos do usuário
        const response = await fetch('/api/orders/my-orders');
        if (response.ok) {
          const data = await response.json();
          setOrders(data.orders || []);
        }
      } catch (error) {
        console.error('Erro ao carregar pedidos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserAndOrders();
  }, [router]);

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      pending: 'Pendente',
      confirmed: 'Confirmado',
      preparing: 'Em Preparo',
      delivered: 'Entregue',
      cancelled: 'Cancelado'
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colorMap: { [key: string]: string } = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      preparing: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Carregando seus pedidos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Meus Pedidos
          </h1>
          <p className="text-gray-600">
            Acompanhe o status dos seus pedidos
          </p>
        </div>

        {/* Lista de Pedidos */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Nenhum pedido ainda
            </h2>
            <p className="text-gray-600 mb-6">
              Faça seu primeiro pedido e ele aparecerá aqui!
            </p>
            <Link href="/">
              <Button size="lg">
                Ver Cardápio
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Cabeçalho do Pedido */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Pedido #{order.id.substring(0, 8).toUpperCase()}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {getStatusText(order.status)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">
                        R$ {order.total.toFixed(2).replace('.', ',')}
                      </p>
                      <p className="text-sm text-gray-500">
                        {order.items.reduce((sum, item) => sum + item.quantity, 0)} item(ns)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Itens do Pedido */}
                <div className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Itens do Pedido:</h4>
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 pb-3 border-b border-gray-100 last:border-0"
                      >
                        <div className="w-16 h-16 shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                          {item.product.imageUrl ? (
                            <img
                              src={item.product.imageUrl}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-2xl">
                              🍽️
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900">
                            {item.product.name}
                          </h5>
                          <p className="text-sm text-gray-600">
                            Quantidade: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                          </p>
                          <p className="text-xs text-gray-500">
                            R$ {item.price.toFixed(2).replace('.', ',')} cada
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Info de Entrega */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h5 className="font-semibold text-gray-900 mb-2">Informações de Entrega:</h5>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><span className="font-medium">Nome:</span> {order.customerName}</p>
                      <p><span className="font-medium">Email:</span> {order.customerEmail}</p>
                      <p><span className="font-medium">Telefone:</span> {order.customerPhone}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Botão Voltar */}
        <div className="mt-8 text-center">
          <Link href="/">
            <Button variant="outline" size="lg">
              ← Voltar para o Início
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
