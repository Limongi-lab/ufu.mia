import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

export default function SecaoContadores() {
  const estatisticas = [
    {
      target: 180,
      prefix: '+',
      suffix: '',
      titulo: 'Animais encaminhados para adoção',
      icone: (
        <svg className="w-6 h-6 text-[#7B1FA2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      ),
    },
    {
      target: 250,
      prefix: '+',
      suffix: '',
      titulo: 'Animais acolhidos e atendidos',
      icone: (
        <svg className="w-6 h-6 text-[#7B1FA2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      target: 230,
      prefix: '+',
      suffix: '',
      titulo: 'Castrações realizadas com sucesso',
      icone: (
        <svg className="w-6 h-6 text-[#7B1FA2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#F8F6FC] border-y border-purple-100/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {estatisticas.map((item, idx) => (
            <motion.div
              key={item.titulo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="text-center flex flex-col items-center"
            >
              {/* Ícone circular em tom lilás suave */}
              <div className="w-16 h-16 rounded-2xl bg-[#F5F0FC] border border-purple-200 flex items-center justify-center mb-4 shadow-2xs">
                {item.icone}
              </div>

              {/* Número grande */}
              <div className="text-3xl sm:text-4xl font-extrabold text-[#7B1FA2] tracking-tight mb-1.5">
                <AnimatedCounter
                  target={item.target}
                  prefix={item.prefix}
                  suffix={item.suffix}
                  duration={2}
                />
              </div>

              {/* Título da estatística */}
              <p className="text-xs sm:text-sm font-semibold text-gray-600 max-w-[220px] leading-relaxed">
                {item.titulo}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
