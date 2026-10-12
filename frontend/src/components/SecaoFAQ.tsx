import { useState } from 'react';
import { motion } from 'framer-motion';
import { useConteudo } from '../context/ConteudoContext';
import { Paragrafos } from './RichText';

export default function SecaoFAQ() {
  const { t, listas } = useConteudo();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = listas.faq;

  return (
    <section id="faq" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block text-[#7B1FA2] font-black text-xs sm:text-sm tracking-widest uppercase mb-2">{t('faq.selo')}</div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">{t('faq.titulo')}</h2>
          <p className="mt-2 text-sm text-gray-600">{t('faq.subtitulo')}</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={faq.pergunta}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
                  isOpen ? 'border-[#7B1FA2] bg-white shadow-sm' : 'border-gray-200/80 bg-white hover:border-purple-200'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left px-6 py-5 flex justify-between items-center gap-4 focus:outline-none"
                >
                  <span className={`font-bold text-sm sm:text-base transition-colors ${isOpen ? 'text-[#7B1FA2]' : 'text-gray-900'}`}>
                    {faq.pergunta}
                  </span>
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-transform duration-200 shrink-0 ${
                      isOpen ? 'bg-[#7B1FA2] text-white rotate-180' : 'bg-[#FAF7FD] text-gray-600'
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 border-t border-purple-50 text-gray-600">
                    <Paragrafos texto={faq.resposta} className="text-xs sm:text-sm text-gray-700 leading-relaxed mt-3 first:mt-0" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
