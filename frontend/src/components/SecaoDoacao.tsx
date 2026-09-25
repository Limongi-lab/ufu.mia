import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SecaoDoacao() {
  const [copied, setCopied] = useState(false);
  const chavePix = 'ufumiaufu@gmail.com';

  const handleCopy = () => {
    navigator.clipboard.writeText(chavePix);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="doacoes" className="py-16 sm:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Banner de Doação no estilo vibrante do Instagram do UFU MIA */}
        <div className="bg-gradient-to-r from-[#5B107D] via-[#7B1FA2] to-[#8C1BA8] text-white p-8 sm:p-14 rounded-3xl shadow-xl text-center relative overflow-hidden">
          
          <div className="inline-block bg-[#F2C744] text-[#18141D] font-black text-xs uppercase tracking-wider px-3.5 py-1 rounded-full mb-3">
            Ajude Nossos Resgates
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-3 tracking-tight text-white">
            Faça parte dessa corrente de amor!
          </h2>

          <p className="text-sm sm:text-base text-purple-100 max-w-xl mx-auto mb-8 leading-relaxed font-normal">
            O UFU MIA depende de doações voluntárias para ração, vacinas, exames e cirurgias de castração dos gatinhos.
          </p>

          {/* Campo de Chave PIX */}
          <div className="bg-white text-gray-900 p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 max-w-xl mx-auto shadow-md">
            <div className="text-center sm:text-left">
              <span className="text-[10px] text-gray-500 font-bold block uppercase tracking-wider">Chave PIX Oficial (E-mail)</span>
              <span className="text-[#7B1FA2] font-mono text-base sm:text-xl font-black select-all">
                {chavePix}
              </span>
            </div>

            <button
              onClick={handleCopy}
              className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-xs ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#F2C744] hover:bg-[#E0B634] text-[#18141D]'
              }`}
            >
              {copied ? 'Chave copiada! ✓' : 'Copiar Chave PIX'}
            </button>
          </div>

          <div className="pt-8 flex justify-center gap-4">
            <Link
              to="/doacoes"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white hover:text-[#F2C744] transition-colors underline decoration-2 underline-offset-4"
            >
              <span>Ver todas as opções de doação e apadrinhamento</span>
              <span>→</span>
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
