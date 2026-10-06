import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useConteudo } from '../context/ConteudoContext';
import { ehLinkInterno, linkSeguro } from '../services/conteudo';

function IconeCasa() {
  return (
    <svg className="w-7 h-7 text-[#7B1FA2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 12l9-8 9 8M5 10v10h14V10" />
    </svg>
  );
}

function IconeCama() {
  return (
    <svg className="w-7 h-7 text-[#7B1FA2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 18V9a2 2 0 012-2h4v7H4zm8-2h8v2H4v-2h8zm0 0V7h6a2 2 0 012 2v7" />
    </svg>
  );
}

function IconePessoas() {
  return (
    <svg className="w-7 h-7 text-[#7B1FA2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2M13 7a4 4 0 11-8 0 4 4 0 018 0zm8 14v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}

function IconeMegafone() {
  return (
    <svg className="w-7 h-7 text-[#7B1FA2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M11 5l9 4v6l-9 4V5zM11 8H7a2 2 0 00-2 2v4a2 2 0 002 2h4" />
    </svg>
  );
}

export default function SecaoComoAjudar() {
  const { t, listas } = useConteudo();
  const icones = [<IconeCasa />, <IconeCama />, <IconePessoas />, <IconeMegafone />];
  const estilos = [
    { bg: 'bg-white/70', borda: 'border-purple-200' },
    { bg: 'bg-white/70', borda: 'border-amber-200' },
    { bg: 'bg-white/70', borda: 'border-purple-300/80' },
    { bg: 'bg-white/70', borda: 'border-emerald-200' },
  ];
  const formasAjudar = listas.formas_de_ajudar.map((f, i) => ({
    ...f,
    ...estilos[i % estilos.length],
    icone: icones[i % icones.length],
  }));

  return (
    <section id="como-ajudar" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <div className="inline-block text-[#7B1FA2] font-black text-xs sm:text-sm tracking-widest uppercase mb-2">{t('ajudar.selo')}</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">{t('ajudar.titulo')}</h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
            {t('ajudar.subtitulo')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {formasAjudar.map((item, idx) => (
            <motion.div
              key={item.titulo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`${item.bg} ${item.borda} rounded-3xl p-6 sm:p-8 border shadow-2xs hover:shadow-md transition-all flex flex-col justify-between`}
            >
              <div>
                <div className="mb-4 bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xs">
                  {item.icone}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {item.titulo}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6 font-medium">
                  {item.descricao}
                </p>
              </div>

              {item.link_texto && (
                ehLinkInterno(linkSeguro(item.link_url)) ? (
                  <Link
                    to={linkSeguro(item.link_url)}
                    className="inline-flex items-center justify-between text-xs sm:text-sm font-bold text-[#7B1FA2] hover:text-[#5B107D] pt-3 border-t border-purple-200/60"
                  >
                    <span>{item.link_texto}</span>
                    <span>→</span>
                  </Link>
                ) : (
                  <a
                    href={linkSeguro(item.link_url)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-between text-xs sm:text-sm font-bold text-[#7B1FA2] hover:text-[#5B107D] pt-3 border-t border-purple-200/60"
                  >
                    <span>{item.link_texto}</span>
                    <span>→</span>
                  </a>
                )
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
