import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Doacoes() {
  const [copied, setCopied] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const chavePix = 'ufumiaufu@gmail.com';

  const planos = [
    {
      id: 'livre',
      titulo: 'Quantia livre',
      valor: 'R$ 00,00',
      descricao: 'Aqui você nos ajuda com a quantia que cabe no seu bolso ou no seu coração! Qualquer valor será uma grande ajuda.',
      icone: '💙',
      bgCard: 'bg-[#F5F0FC] border-purple-200',
      corBotao: 'bg-[#7B1FA2] hover:bg-[#6A0DAD] text-white',
    },
    {
      id: 'racao',
      titulo: 'Ração & Alimentação',
      valor: 'R$ 98,90',
      descricao: 'Com esse valor você nos ajuda a comprar sacos de ração premium e sachês para os gatinhos acolhidos no campus.',
      icone: '🥣',
      bgCard: 'bg-[#FEF8ED] border-amber-200',
      corBotao: 'bg-[#F2C744] hover:bg-[#E0B634] text-[#18141D]',
    },
    {
      id: 'castracao',
      titulo: 'Cirurgia de castração',
      valor: 'R$ 150,00',
      descricao: 'Com esse valor você nos ajuda com a cirurgia de castração e medicação pós-operatória que previne o abandono.',
      icone: '🩺',
      bgCard: 'bg-[#FDF2F8] border-pink-200',
      corBotao: 'bg-[#7B1FA2] hover:bg-[#6A0DAD] text-white',
    },
  ];

  const handleCopyPix = () => {
    navigator.clipboard.writeText(chavePix);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col justify-between">
      <Header />
      
      <main className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          {/* Título da Página no estilo do novo modelo */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-block text-[#F2C744] font-black text-xs sm:text-sm tracking-widest uppercase mb-2">
              — DOAR AGORA —
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
              Doações<span className="text-[#7B1FA2]">.</span>
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-600 font-medium">
              Doe uma quantia livre ou selecione uma de nossas campanhas de apadrinhamento!
            </p>
          </div>

          {/* Cards de Opções de Doação */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {planos.map((plano) => (
              <div
                key={plano.id}
                className={`${plano.bgCard} rounded-3xl p-6 sm:p-8 border shadow-2xs hover:shadow-md transition-all flex flex-col justify-between text-center`}
              >
                <div>
                  <div className="text-4xl mb-4">{plano.icone}</div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {plano.titulo}
                  </h3>

                  <div className="text-3xl sm:text-4xl font-black text-[#7B1FA2] my-3">
                    {plano.valor}
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6 font-medium">
                    {plano.descricao}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSelectedPlan(plano.titulo);
                    handleCopyPix();
                  }}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-colors shadow-2xs ${plano.corBotao}`}
                >
                  Doar agora
                </button>
              </div>
            ))}
          </div>

          {/* Banner de Chave PIX */}
          <div className="bg-gradient-to-r from-[#5B107D] via-[#7B1FA2] to-[#8C1BA8] text-white rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-xl mb-12">
            <div className="inline-block bg-[#F2C744] text-[#18141D] font-black text-xs uppercase tracking-wider px-3.5 py-1 rounded-full mb-3">
              Chave PIX Oficial (E-mail)
            </div>

            <h2 className="text-2xl sm:text-3xl font-black mb-2">
              Faça sua transferência via PIX
            </h2>

            <p className="text-xs sm:text-sm text-purple-100 max-w-md mx-auto mb-6">
              Abra o app do seu banco, escolha a opção PIX e cole a chave abaixo:
            </p>

            <div className="bg-white text-gray-900 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 max-w-lg mx-auto shadow-md">
              <span className="font-mono text-base sm:text-xl font-bold text-[#7B1FA2] select-all">
                {chavePix}
              </span>

              <button
                onClick={handleCopyPix}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-colors ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#F2C744] hover:bg-[#E0B634] text-[#18141D]'
                }`}
              >
                {copied ? 'Chave copiada! ✓' : 'Copiar Chave PIX'}
              </button>
            </div>

            {selectedPlan && (
              <p className="text-xs text-[#F2C744] mt-4 font-bold">
                Plano selecionado: {selectedPlan}. Agradecemos de coração pelo apoio! 💕
              </p>
            )}
          </div>

          {/* Seção Apoio Mensal */}
          <div className="text-center bg-[#FAF7FD] rounded-3xl p-8 sm:p-10 border border-purple-100 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              Gostaria de nos apoiar mensalmente?
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-6">
              Conheça nossos planos de doações recorrentes para garantir ração e atendimento médico contínuo aos felinos.
            </p>
            <a
              href="mailto:ufumiaufu@gmail.com"
              className="inline-block bg-white hover:bg-purple-50 text-[#7B1FA2] font-bold text-xs sm:text-sm px-8 py-3 rounded-full border-2 border-[#7B1FA2] transition-colors"
            >
              Falar com a Coordenação UFU
            </a>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
