import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useConteudo } from '../context/ConteudoContext';


export default function SecaoCarinho() {
  const { t } = useConteudo();

  return (
    <section className="secao-branca py-16 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

          {/* ── Card esquerdo: frase de impacto ─────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#EDD9F9] rounded-[2rem] p-10 sm:p-14 flex flex-col justify-between min-h-[320px] relative overflow-hidden"
          >
            {/* Patinha decorativa de fundo */}
            <span className="absolute -bottom-6 -right-6 text-[8rem] opacity-10 select-none pointer-events-none" aria-hidden>
              🐾
            </span>

            <div>
              <div className="selo-secao mb-6">Sobre nossa missão</div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.05]">
                Tem carinho<br />
                <span className="text-[#7B1FA2]">por aqui.</span>
              </h2>
              <p className="mt-5 text-gray-500 text-sm sm:text-base leading-relaxed max-w-sm font-normal">
                {t('sobre.texto').split('|')[0] || 'Cuidamos de animais em situação de vulnerabilidade com amor, responsabilidade e ciência.'}
              </p>
            </div>
          </motion.div>

          {/* ── Card direito: informações de contato/localização ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4"
          >
            {/* Card: Onde estamos */}
            <div className="flex-1 bg-white border border-purple-100 rounded-[2rem] p-8 flex items-start gap-5 hover:shadow-lg transition-shadow duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-[#7B1FA2] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#7B1FA2] block mb-1">Onde estamos</span>
                <h3 className="text-lg font-black text-gray-900 leading-snug">
                  {t('rodape.localizacao') || 'Universidade Federal de Uberlândia'}
                </h3>
              </div>
            </div>

            {/* Card: Fale conosco */}
            <div className="flex-1 bg-[#7B1FA2] rounded-[2rem] p-8 flex items-start gap-5 hover:shadow-xl transition-shadow duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-purple-200 block mb-1">Fale com a gente</span>
                <h3 className="text-lg font-black text-white leading-snug">
                  {t('rodape.email') || 'ufumia@ufu.br'}
                </h3>
                <Link
                  to="/fale-conosco"
                  className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-[#F2C744] hover:gap-2 transition-all"
                >
                  Entrar em contato <span aria-hidden>→</span>
                </Link>
              </div>
            </div>

            {/* Card: Instagram */}
            <div className="bg-[#F2C744] rounded-[2rem] p-6 flex items-center justify-between hover:shadow-lg transition-shadow duration-300 group">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#1F0B2C]/60 block mb-0.5">Nos siga</span>
                <span className="text-base font-black text-[#1F0B2C]">@ufu.mia</span>
              </div>
              <a
                href="https://instagram.com/ufu.mia"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-[#1F0B2C] text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-[#4A0E72] transition-colors group-hover:scale-105 transition-transform duration-300"
              >
                Ver Instagram →
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
