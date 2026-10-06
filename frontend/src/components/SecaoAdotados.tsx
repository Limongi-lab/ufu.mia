import { motion } from 'framer-motion';
import f1 from '../assets/slide/adotado-1.jpg';
import f2 from '../assets/slide/adotado-2.jpg';
import f3 from '../assets/slide/adotado-3.jpg';
import f4 from '../assets/slide/adotado-4.jpg';
import f5 from '../assets/slide/adotado-5.jpg';
import f6 from '../assets/slide/adotado-6.jpg';
import { useConteudo } from '../context/ConteudoContext';

const fotos = [f1, f2, f3, f4, f5, f6];

export default function SecaoAdotados() {
  const { t } = useConteudo();
  return (
    <section className="py-14 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <div className="inline-block text-[#7B1FA2] font-black text-xs sm:text-sm tracking-widest uppercase mb-2">{t('adotados.selo')}</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight">{t('adotados.titulo')}</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
          {fotos.map((foto, idx) => (
            <motion.div
              key={foto}
              initial={{ opacity: 0, scale: 0.85, rotate: idx % 2 === 0 ? -4 : 4 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ type: 'spring', stiffness: 120, damping: 14, delay: (idx % 3) * 0.1 }}
              whileTap={{ scale: 0.97 }}
              className="overflow-hidden rounded-3xl border-4 border-white shadow-lg bg-white"
            >
              <img
                src={foto}
                alt="Gatinho resgatado que foi adotado"
                loading="lazy"
                className="w-full aspect-square object-cover transition-transform duration-500 hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
