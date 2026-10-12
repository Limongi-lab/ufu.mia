import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useConteudo } from '../context/ConteudoContext';
import { ehLinkInterno, linkSeguro } from '../services/conteudo';

function IconeCasa() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 12l9-8 9 8M5 10v10h14V10" />
    </svg>
  );
}

function IconeCama() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 18V9a2 2 0 012-2h4v7H4zm8-2h8v2H4v-2h8zm0 0V7h6a2 2 0 012 2v7" />
    </svg>
  );
}

function IconePessoas() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2M13 7a4 4 0 11-8 0 4 4 0 018 0zm8 14v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}

function IconeMegafone() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M11 5l9 4v6l-9 4V5zM11 8H7a2 2 0 00-2 2v4a2 2 0 002 2h4" />
    </svg>
  );
}

// Variantes de cartões alternados (editorial)
const ESTILOS = [
  { bg: 'bg-[#7B1FA2]',  iconeWrap: 'bg-white/20', iconeCor: 'text-white', tituloCor: 'text-white', textoCor: 'text-purple-200', linkCor: 'text-[#F2C744]', bordaLink: 'border-white/20' },
  { bg: 'bg-white',      iconeWrap: 'bg-purple-50', iconeCor: 'text-[#7B1FA2]', tituloCor: 'text-gray-900', textoCor: 'text-gray-500', linkCor: 'text-[#7B1FA2]', bordaLink: 'border-purple-100' },
  { bg: 'bg-[#F2C744]',  iconeWrap: 'bg-black/10',  iconeCor: 'text-[#1F0B2C]', tituloCor: 'text-[#1F0B2C]', textoCor: 'text-[#1F0B2C]/70', linkCor: 'text-[#1F0B2C]', bordaLink: 'border-black/20' },
  { bg: 'bg-[#1F0B2C]',  iconeWrap: 'bg-white/10',  iconeCor: 'text-white', tituloCor: 'text-white', textoCor: 'text-purple-300', linkCor: 'text-[#F2C744]', bordaLink: 'border-white/15' },
];

export default function SecaoComoAjudar() {
  const { t, listas } = useConteudo();
  const icones = [<IconeCasa />, <IconeCama />, <IconePessoas />, <IconeMegafone />];

  const formasAjudar = listas.formas_de_ajudar.map((f, i) => ({
    ...f,
    icone: icones[i % icones.length],
    estilo: ESTILOS[i % ESTILOS.length],
  }));

  return (
    <section id="como-ajudar" className="secao-lilas py-16 sm:py-24 relative overflow-hidden">
      {/* Blob decorativo */}
      <div className="pointer-events-none absolute bottom-0 right-0 w-80 h-80 bg-[#DFC0F7] rounded-full blur-3xl opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12 sm:mb-16"
        >
          <div className="selo-secao mb-4">{t('ajudar.selo')}</div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.05]">
            {t('ajudar.titulo')}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-500 leading-relaxed font-normal max-w-xl">
            {t('ajudar.subtitulo')}
          </p>
        </motion.div>

        {/* Grid de cartões */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {formasAjudar.map((item, idx) => {
            const e = item.estilo;
            return (
              <motion.div
                key={item.titulo}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`${e.bg} rounded-3xl p-7 flex flex-col justify-between min-h-[280px] shadow-sm hover:shadow-xl transition-shadow duration-300`}
              >
                <div>
                  {/* Ícone */}
                  <div className={`${e.iconeWrap} w-12 h-12 rounded-2xl flex items-center justify-center mb-5`}>
                    <span className={e.iconeCor}>{item.icone}</span>
                  </div>

                  <h3 className={`text-xl font-black ${e.tituloCor} leading-snug mb-2`}>
                    {item.titulo}
                  </h3>

                  <p className={`text-xs sm:text-sm ${e.textoCor} leading-relaxed font-medium`}>
                    {item.descricao}
                  </p>
                </div>

                {item.link_texto && (
                  <div className={`pt-4 mt-4 border-t ${e.bordaLink}`}>
                    {ehLinkInterno(linkSeguro(item.link_url)) ? (
                      <Link
                        to={linkSeguro(item.link_url)}
                        className={`inline-flex items-center gap-1.5 text-sm font-bold ${e.linkCor} hover:gap-3 transition-all`}
                      >
                        <span>{item.link_texto}</span>
                        <span aria-hidden>→</span>
                      </Link>
                    ) : (
                      <a
                        href={linkSeguro(item.link_url)}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex items-center gap-1.5 text-sm font-bold ${e.linkCor} hover:gap-3 transition-all`}
                      >
                        <span>{item.link_texto}</span>
                        <span aria-hidden>→</span>
                      </a>
                    )}
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
