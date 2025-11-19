'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string | null;
}

interface FormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

interface FormErrors {
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    customerName: '',
    customerEmail: '',
    customerPhone: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    // Carregar carrinho do localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const cart = JSON.parse(savedCart);
      if (cart.length === 0) {
        router.push('/carrinho');
        return;
      }
      setCartItems(cart);
    } else {
      router.push('/carrinho');
      return;
    }
    setIsLoading(false);
  }, [router]);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Nome é obrigatório';
    } else if (formData.customerName.trim().length < 2) {
      newErrors.customerName = 'Nome deve ter pelo menos 2 caracteres';
    }

    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Email inválido';
    }

    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = 'Telefone é obrigatório';
    } else if (!/^[\d\s\(\)\-\+]+$/.test(formData.customerPhone)) {
      newErrors.customerPhone = 'Telefone inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simular envio do pedido
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Criar objeto do pedido
      const order = {
        customer: formData,
        items: cartItems,
        total: getTotalPrice() + 5, // inclui taxa de entrega
        orderDate: new Date().toISOString()
      };

      console.log('Pedido criado:', order);

      // Limpar carrinho
      localStorage.removeItem('cart');

      // Simular resposta de sucesso
      alert('🎉 Pedido realizado com sucesso! Em breve você receberá uma confirmação por email.');
      
      // Redirecionar para home
      router.push('/');
      
    } catch (error) {
      console.error('Erro ao enviar pedido:', error);
      alert('❌ Erro ao processar pedido. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpar erro do campo quando usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Finalizar Pedido</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* Formulário */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Seus Dados
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nome */}
              <div>
                <Label htmlFor="customerName">Nome Completo *</Label>
                <Input
                  id="customerName"
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => handleInputChange('customerName', e.target.value)}
                  placeholder="Digite seu nome completo"
                  className={errors.customerName ? 'border-red-500' : ''}
                />
                {errors.customerName && (
                  <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="customerEmail">Email *</Label>
                <Input
                  id="customerEmail"
                  type="email"
                  value={formData.customerEmail}
                  onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                  placeholder="seu@email.com"
                  className={errors.customerEmail ? 'border-red-500' : ''}
                />
                {errors.customerEmail && (
                  <p className="text-red-500 text-sm mt-1">{errors.customerEmail}</p>
                )}
              </div>

              {/* Telefone */}
              <div>
                <Label htmlFor="customerPhone">Telefone/WhatsApp *</Label>
                <Input
                  id="customerPhone"
                  type="tel"
                  value={formData.customerPhone}
                  onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                  placeholder="(11) 99999-9999"
                  className={errors.customerPhone ? 'border-red-500' : ''}
                />
                {errors.customerPhone && (
                  <p className="text-red-500 text-sm mt-1">{errors.customerPhone}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 text-lg font-semibold"
              >
                {isSubmitting ? (
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
                    <span>Processando...</span>
                  </span>
                ) : (
                  '🚚 Confirmar Pedido'
                )}
              </Button>
            </form>
          </div>

          {/* Resumo do Pedido */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Resumo do Pedido
            </h2>

            {/* Lista de Itens */}
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 shrink-0">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-lg">🍽️</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                    <p className="text-xs text-gray-600">Qtd: {item.quantity}</p>
                  </div>
                  <div className="text-sm font-semibold text-gray-900">
                    R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                  </div>
                </div>
              ))}
            </div>

            {/* Totais */}
            <div className="border-t pt-4 space-y-2">
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

              <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                <span>Total</span>
                <span className="text-green-600">
                  R$ {(getTotalPrice() + 5).toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="text-sm font-semibold text-blue-900 mb-2">
                📱 Como funciona?
              </h4>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>✅ Confirme seus dados</li>
                <li>✅ Receba confirmação por email</li>
                <li>✅ Acompanhe pelo WhatsApp</li>
                <li>✅ Entrega em até 45 minutos</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}