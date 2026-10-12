import { Link } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import fotoHero from '../assets/slide/recem-resgate-1.jpg';
import { useConteudo } from '../context/ConteudoContext';
import { Quebras } from './RichText';

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const { t } = useConteudo();
  return (
    <section className="relative overflow-hidden bg-white">
      {/* ── Fundo decorativo: blobs roxos suaves ────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[560px] h-[560px] rounded-full bg-[#EDD9F9] opacity-80 blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 rounded-full bg-[#C9B8F0]/40 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-[#F2C744]/12 blur-2xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-0 sm:pt-20 lg:pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-end">

          {/* ── Lado Esquerdo: Texto ────────────────────────────── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="pb-16 sm:pb-20 lg:pb-24 text-center lg:text-left space-y-7"
          >
            {/* Selo superior */}
            <motion.div variants={item} className="selo-secao mx-auto lg:mx-0">
              {t('hero.selo')}
            </motion.div>

            {/* Título principal — enorme, editorial */}
            <motion.h1
              variants={item}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[1.0] text-gray-900"
            >
              <Quebras texto={t('hero.titulo')} />
            </motion.h1>

            {/* Subtítulo */}
            <motion.p
              variants={item}
              className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-lg mx-auto lg:mx-0 font-normal"
            >
              {t('hero.texto')}
            </motion.p>

            {/* Botões de ação */}
            <motion.div
              variants={item}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1"
            >
              <Link
                to="/animais"
                className="bg-[#7B1FA2] hover:bg-[#6A0DAD] text-white font-bold text-sm sm:text-base px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all btn-shine"
              >
                Adote um gatinho
              </Link>

              <Link
                to="/doacoes"
                className="bg-[#EDD9F9] hover:bg-[#DFC0F7] text-[#7B1FA2] font-bold text-sm sm:text-base px-7 py-4 rounded-full border border-[#C9B8F0] transition-all"
              >
                Fazer doação
              </Link>
            </motion.div>

            {/* Linha de stats rápida */}
            <motion.div
              variants={item}
              className="flex items-center justify-center lg:justify-start gap-6 pt-2"
            >
              {[
                { valor: '100+', label: 'Animais adotados' },
                { valor: '🐾', label: '' },
                { valor: 'UFU', label: 'Projeto oficial' },
              ].map((s, i) => (
                <div key={i} className="text-center lg:text-left">
                  <div className="text-lg font-black text-[#7B1FA2]">{s.valor}</div>
                  {s.label && <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{s.label}</div>}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Lado Direito: Foto ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-end justify-center lg:justify-end"
          >
            {/* Card de foto com moldura editorial */}
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none">

              {/* Fundo decorativo deslocado */}
              <div className="absolute inset-0 bg-[#DFC0F7] rounded-[2.5rem] translate-x-4 translate-y-4 -z-10" />

              {/* Foto principal */}
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-[#EDD9F9]">
                <img
                  src={fotoHero}
                  alt="Gatinho recém resgatado pelo UFU MIA"
                  className="w-full h-[420px] sm:h-[500px] lg:h-[560px] object-cover object-[50%_25%] transition-transform duration-700 hover:scale-105"
                />

                {/* Overlay degradê na base */}
                <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Legenda */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#F2C744] block mb-0.5">
                    {t('hero.foto_selo')}
                  </span>
                  <span className="text-sm sm:text-base font-semibold leading-snug">
                    {t('hero.foto_legenda')}
                  </span>
                </div>
              </div>

              {/* Badge flutuante: patinha */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-16 h-16 sm:w-20 sm:h-20 bg-[#7B1FA2] text-white rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-xl rotate-[-10deg]"
              >
                🐾
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── Onda de transição ────────────────────────────────── */}
      <div className="wave-divider mt-[-1px]">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-12 sm:h-16">
          <path d="M0,0 C480,60 960,60 1440,0 L1440,60 L0,60 Z" fill="#EDD9F9" />
        </svg>
      </div>
    </section>
  );
}
