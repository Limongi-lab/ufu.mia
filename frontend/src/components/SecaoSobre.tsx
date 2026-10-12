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
    <section id="sobre" className="secao-branca py-16 sm:py-24 relative overflow-hidden">
      {/* Blob decorativo */}
      <div className="pointer-events-none absolute top-0 right-0 w-96 h-96 bg-[#EDD9F9] rounded-full blur-3xl opacity-70" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* ── Lado Esquerdo: Foto ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-lg">
              {/* Bloco de cor deslocado — efeito editorial */}
              <div className="absolute inset-0 bg-[#7B1FA2] rounded-[2.5rem] -translate-x-4 translate-y-4 opacity-100" />

              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl">
                <img
                  src={fotoSobre}
                  alt="Gatinho resgatado pelo UFU MIA"
                  className="w-full h-[380px] sm:h-[460px] lg:h-[520px] object-cover object-[50%_25%]"
                />
                {/* Overlay roxo suave no rodapé */}
                <div className="absolute bottom-0 inset-x-0 h-1/4 bg-gradient-to-t from-[#1F0B2C]/50 to-transparent" />
              </div>

              {/* Selo flutuante */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-5 -right-5 bg-[#F2C744] text-[#1F0B2C] font-black text-sm px-5 py-3 rounded-2xl shadow-xl rotate-3"
              >
                💜 Projeto UFU
              </motion.div>
            </div>
          </motion.div>

          {/* ── Lado Direito: Texto + Accordion ────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-7"
          >
            <div className="selo-secao">{t('sobre.selo')}</div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.05]">
              {t('sobre.titulo')}
            </h2>

            <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-normal max-w-lg">
              <Quebras texto={t('sobre.texto')} />
            </p>

            {/* Accordion de compromissos */}
            <div className="divide-y divide-gray-100 border-y border-gray-100 pt-1">
              {compromissos.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <div key={item.titulo}>
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="w-full text-left flex justify-between items-center gap-4 py-4 focus:outline-none group"
                    >
                      <span className={`text-base font-bold transition-colors ${isOpen ? 'text-[#7B1FA2]' : 'text-gray-800 group-hover:text-[#7B1FA2]'}`}>
                        {item.titulo}
                      </span>
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm shrink-0 transition-all duration-200 ${
                        isOpen
                          ? 'bg-[#7B1FA2] text-white rotate-45'
                          : 'bg-purple-50 text-[#7B1FA2]'
                      }`}>
                        +
                      </span>
                    </button>
                    {isOpen && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="pb-4 text-sm text-gray-500 leading-relaxed font-medium"
                      >
                        {item.descricao}
                      </motion.p>
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
