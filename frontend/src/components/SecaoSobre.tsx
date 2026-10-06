import { useState } from 'react';
import { motion } from 'framer-motion';
import fotoSobre from '../assets/slide/recem-resgate-2.jpg';
import { useConteudo } from '../context/ConteudoContext';
import { Quebras } from './RichText';

export default function SecaoSobre() {
  const { t, listas } = useConteudo();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const compromissos = listas.pontos_sobre;

  return (
    <section id="sobre" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Lado Esquerdo: Imagem com moldura estilizada e animação suave */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex justify-center"
          >
            <div className="relative w-full max-w-lg">
              
              {/* Fundo colorido sólido da imagem */}
              <div className="absolute inset-0 bg-[#7B1FA2] rounded-3xl transform -rotate-2 scale-98 opacity-90" />

              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src={fotoSobre}
                  alt="Gatinho recém resgatado pelo UFU MIA"
                  className="w-full h-80 sm:h-96 lg:h-[460px] object-cover object-[50%_25%]"
                />
              </div>

            </div>
          </motion.div>

          {/* Lado Direito: Textos e Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6 space-y-6"
          >
            
            {/* Ícone de patinha em círculo */}
            <div className="w-14 h-14 rounded-2xl bg-[#7B1FA2] text-white flex items-center justify-center text-2xl shadow-md">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </div>

            <div className="inline-block text-[#7B1FA2] font-black text-xs sm:text-sm tracking-widest uppercase">{t('sobre.selo')}</div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">{t('sobre.titulo')}</h2>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
              <Quebras texto={t('sobre.texto')} />
            </p>

            {/* Lista de Compromissos com (+) */}
            <div className="pt-2 divide-y divide-purple-200 border-y border-purple-200">
              {compromissos.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <div key={item.titulo} className="py-4">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="w-full text-left flex justify-between items-center gap-4 focus:outline-none group"
                    >
                      <span className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#7B1FA2] transition-colors">
                        {item.titulo}
                      </span>
                      <span className="text-2xl font-black text-[#7B1FA2] shrink-0 transition-transform duration-200">
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>

                    {isOpen && (
                      <p className="mt-2.5 text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                        {item.descricao}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
