import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo e Descrição */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-2xl">🍔</div>
              <div>
                <h2 className="text-xl font-bold">DeliveryApp</h2>
                <p className="text-sm text-gray-400">Sabor que chega até você</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              O melhor delivery da cidade com comida de qualidade, 
              entrega rápida e preços justos. Sua satisfação é nossa prioridade!
            </p>
          </div>

          {/* Links Úteis */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Cardápio</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categoria/lanches" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Lanches
                </Link>
              </li>
              <li>
                <Link href="/categoria/pizzas" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Pizzas
                </Link>
              </li>
              <li>
                <Link href="/categoria/bebidas" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Bebidas
                </Link>
              </li>
              <li>
                <Link href="/categoria/sobremesas" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Sobremesas
                </Link>
              </li>
            </ul>
          </div>

          {/* Atendimento */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Atendimento</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center space-x-2">
                <span>📞</span>
                <span>(11) 99999-9999</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>✉️</span>
                <span>contato@deliveryapp.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>📍</span>
                <span>São Paulo, SP</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>🕒</span>
                <span>Seg a Dom: 18h às 00h</span>
              </li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Redes Sociais</h3>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                aria-label="Facebook"
              >
                <span className="text-lg">📘</span>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                aria-label="Instagram"
              >
                <span className="text-lg">📸</span>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                aria-label="WhatsApp"
              >
                <span className="text-lg">💬</span>
              </a>
            </div>
            
            <div className="mt-6">
              <h4 className="font-semibold mb-2 text-sm">Baixe nosso app</h4>
              <div className="space-y-2">
                <a 
                  href="#" 
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors text-sm"
                >
                  <span>📱</span>
                  <span>App Store</span>
                </a>
                <a 
                  href="#" 
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors text-sm"
                >
                  <span>🤖</span>
                  <span>Google Play</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Linha de Separação */}
        <hr className="border-gray-700 my-8" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div className="mb-4 md:mb-0">
            <p>&copy; 2025 DeliveryApp. Todos os direitos reservados.</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Termos de Uso
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Ajuda
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}