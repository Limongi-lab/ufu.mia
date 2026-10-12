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
    <section className="secao-lilas py-16 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Cabeçalho alinhado à esquerda — estilo editorial */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10"
        >
          <div>
            <div className="selo-secao mb-3">{t('adotados.selo')}</div>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight">
              {t('adotados.titulo')}
            </h2>
          </div>
          <p className="text-sm text-gray-500 max-w-xs font-normal hidden sm:block">
            Cada foto representa uma vida que encontrou um lar cheio de amor. 💜
          </p>
        </motion.div>

        {/* Grade de fotos */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {fotos.map((foto, idx) => (
            <motion.div
              key={foto}
              initial={{ opacity: 0, scale: 0.88 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: (idx % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileTap={{ scale: 0.97 }}
              className={`overflow-hidden rounded-3xl shadow-md bg-white ${
                idx === 0 ? 'col-span-2 md:col-span-1 row-span-1' : ''
              }`}
            >
              <img
                src={foto}
                alt="Gatinho resgatado que foi adotado"
                loading="lazy"
                className="w-full aspect-square object-cover transition-transform duration-500 hover:scale-108"
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
