import { useState } from 'react';

export default function FaixaDestaqueInsta() {
  const [copied, setCopied] = useState(false);
  const pix = 'ufumiaufu@gmail.com';

  const copyPix = () => {
    navigator.clipboard.writeText(pix);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="bg-[#7B1FA2] text-white py-8 sm:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          <div className="space-y-1">
            <div className="inline-block bg-[#F2C744] text-[#1F1A24] font-black text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded-sm mb-1">
              Campanha Ativa • UFU MIA
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              Vi um gato na UFU, o que eu faço?
            </h3>
            <p className="text-sm text-purple-100 max-w-xl">
              Nossa equipe atua no manejo ético e acolhimento nos campi de Uberlândia. Você pode ajudar sendo Lar Temporário (LT) ou contribuindo com qualquer valor!
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              onClick={copyPix}
              className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all shadow-xs ${
                copied
                  ? 'bg-emerald-500 text-white'
                  : 'bg-[#F2C744] hover:bg-[#E0B634] text-[#1F1A24]'
              }`}
            >
              {copied ? 'Chave PIX copiada!' : 'Copiar PIX: ufumiaufu@gmail.com'}
            </button>

            <a
              href="https://instagram.com/ufu.mia"
              target="_blank"
              rel="noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors"
            >
              Ver Instagram @ufu.mia
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
