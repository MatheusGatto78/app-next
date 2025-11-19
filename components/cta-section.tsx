import { Button } from './ui/button';
import Link from 'next/link';

interface CTASectionProps {
  className?: string;
}

export default function CTASection({ className = "" }: CTASectionProps) {
  return (
    <section 
      className={`py-20 text-white ${className}`}
      style={{
        background: 'linear-gradient(to right, rgb(249, 115, 22), rgb(220, 38, 38))'
      }}
    >
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Está com fome?
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Peça agora e receba em casa comida deliciosa e quentinha!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/categoria/lanches">
              <Button 
                size="lg" 
                className="bg-white text-orange-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg min-w-[200px]"
              >
                🍔 Ver Cardápio
              </Button>
            </Link>
            <Link href="/carrinho">
              <Button 
                size="lg"
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-orange-600 font-semibold px-8 py-4 text-lg min-w-[200px]"
              >
                🛒 Meu Carrinho
              </Button>
            </Link>
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-6 text-sm opacity-80">
            <div className="flex items-center gap-2">
              <span>⏰</span>
              <span>Entrega em até 30min</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🆓</span>
              <span>Frete grátis acima de R$ 50</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📞</span>
              <span>(11) 99999-9999</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}