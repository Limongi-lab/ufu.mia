import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';
import { useConteudo } from '../context/ConteudoContext';

const ICONES = [
  // coração
  (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  ),
  // casa
  (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  // checklist
  (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  ),
];

const CORES = [
  { bg: 'bg-[#7B1FA2]',   text: 'text-white',         iconeWrap: 'bg-white/20 text-white' },
  { bg: 'bg-[#F2C744]',   text: 'text-[#1F0B2C]',     iconeWrap: 'bg-black/10 text-[#1F0B2C]' },
  { bg: 'bg-white border border-purple-200',   text: 'text-[#4A0E72]',     iconeWrap: 'bg-[#EDD9F9] text-[#7B1FA2]' },
];

export default function SecaoContadores() {
  const { listas } = useConteudo();

  const estatisticas = listas.estatisticas.map((e, i) => ({
    target: e.numero,
    prefix: e.prefixo,
    suffix: e.sufixo,
    titulo: e.titulo,
    icone: ICONES[i % ICONES.length],
    cor: CORES[i % CORES.length],
  }));

  return (
    <section className="secao-lilas py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="selo-secao mx-auto mb-4">Nosso impacto</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900">
            Cada número é uma história
          </h2>
        </motion.div>

        {/* Cards de estatísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {estatisticas.map((item, idx) => (
            <motion.div
              key={item.titulo}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className={`${item.cor.bg} rounded-3xl p-8 flex flex-col items-start gap-5 shadow-md hover:shadow-xl transition-shadow duration-300`}
            >
              {/* Ícone */}
              <div className={`w-12 h-12 rounded-2xl ${item.cor.iconeWrap} flex items-center justify-center`}>
                {item.icone}
              </div>

              {/* Número grande */}
              <div>
                <div className={`text-4xl sm:text-5xl font-black ${item.cor.text} tracking-tight`}>
                  <AnimatedCounter
                    target={item.target}
                    prefix={item.prefix}
                    suffix={item.suffix}
                    duration={2}
                  />
                </div>
                <p className={`mt-1.5 text-sm font-semibold ${item.cor.text} opacity-75 leading-snug`}>
                  {item.titulo}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
