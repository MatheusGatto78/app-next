import Link from 'next/link';
import { Button } from './ui/button';

interface FeaturesProps {
  className?: string;
}

export default function Features({ className = "" }: FeaturesProps) {
  const features = [
    {
      icon: "🚚",
      title: "Entrega Rápida",
      description: "Receba seu pedido em até 30 minutos na região metropolitana",
      color: "bg-green-50 border-green-200"
    },
    {
      icon: "💳",
      title: "Pagamento Fácil",
      description: "Pix, cartão de crédito, débito ou dinheiro na entrega",
      color: "bg-blue-50 border-blue-200"
    },
    {
      icon: "⭐",
      title: "Qualidade Premium",
      description: "Ingredientes frescos e selecionados para sua satisfação",
      color: "bg-yellow-50 border-yellow-200"
    },
    {
      icon: "📱",
      title: "Acompanhe o Pedido",
      description: "Saiba em tempo real onde está seu pedido pelo nosso app",
      color: "bg-purple-50 border-purple-200"
    }
  ];

  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Por que escolher nosso delivery?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Oferecemos a melhor experiência em delivery com qualidade, rapidez e comodidade
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`p-6 rounded-xl border-2 ${feature.color} hover:shadow-lg transition-shadow`}
            >
              <div className="text-4xl mb-4 text-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}