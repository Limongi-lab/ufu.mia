import { motion } from 'framer-motion';
import tigre from '../assets/slide/tigre.jpg';
import { useConteudo } from '../context/ConteudoContext';


export default function SecaoCCD() {
  const { t } = useConteudo();
  const passos = [
    { letra: 'C', titulo: t('ccd.passo1_titulo'), texto: t('ccd.passo1_texto') },
    { letra: 'C', titulo: t('ccd.passo2_titulo'), texto: t('ccd.passo2_texto') },
    { letra: 'D', titulo: t('ccd.passo3_titulo'), texto: t('ccd.passo3_texto') },
  ];
  return (
    <section className="py-14 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
        >
          <div className="inline-block text-[#7B1FA2] font-black text-xs sm:text-sm tracking-widest uppercase mb-2">{t('ccd.selo')}</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight">{t('ccd.titulo')}</h2>
          <p className="mt-2 text-sm sm:text-base text-gray-700">{t('ccd.subtitulo')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {passos.map((p, idx) => (
            <motion.div
              key={p.titulo}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.55, delay: idx * 0.15, ease: 'easeOut' }}
            >
              <div className="h-full bg-white/80 border border-purple-200 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-[#7B1FA2] text-white flex items-center justify-center text-3xl font-black mb-4 shadow-md">
                  {p.letra}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{p.titulo}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{p.texto}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="mt-8 sm:mt-10 bg-gradient-to-r from-[#5B107D] via-[#7B1FA2] to-[#8C1BA8] text-white rounded-3xl p-6 sm:p-10 shadow-lg flex flex-col md:flex-row md:items-center gap-6 md:gap-10"
        >
          <img
            src={tigre}
            alt="Tigre, um dos gatinhos do projeto"
            className="w-full max-w-xs mx-auto md:mx-0 md:w-64 rounded-2xl shadow-lg shrink-0"
          />
          <div>
          <p className="text-[#F2C744] font-black text-xs sm:text-sm tracking-widest uppercase mb-2">{t('ccd.curiosidade_selo')}</p>
          <h3 className="text-xl sm:text-2xl font-black mb-3">{t('ccd.curiosidade_titulo')}</h3>
          <p className="text-sm sm:text-base text-purple-100 leading-relaxed">
            {t('ccd.curiosidade_texto')}
          </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
