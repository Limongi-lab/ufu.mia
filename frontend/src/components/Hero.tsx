import { Link } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import fotoHero from '../assets/slide/recem-resgate-1.jpg';

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-[#5B107D] via-[#7B1FA2] to-[#8C1BA8] text-white relative overflow-hidden">
      <motion.div
        animate={{ scale: [1, 1.18, 1], x: [0, -20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 right-0 w-[550px] h-[550px] bg-white/5 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], y: [0, -25, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-24 left-10 w-96 h-96 bg-[#F2C744]/15 rounded-full blur-3xl pointer-events-none"
      />

      {/* Patinhas flutuando ao fundo */}
      {[
        { pos: 'top-[10%] left-[4%]', size: 'text-4xl', dur: 6, delay: 0 },
        { pos: 'top-[55%] left-[46%]', size: 'text-3xl', dur: 7.5, delay: 1.2 },
        { pos: 'bottom-[8%] right-[6%]', size: 'text-5xl', dur: 8, delay: 0.6 },
      ].map((p) => (
        <motion.span
          key={p.pos}
          aria-hidden
          animate={{ y: [0, -18, 0], rotate: [-12, 12, -12] }}
          transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
          className={`absolute ${p.pos} ${p.size} opacity-15 select-none pointer-events-none`}
        >
          🐾
        </motion.span>
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Lado Esquerdo */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            
            <motion.div variants={item} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xs border border-white/20 text-[#F2C744] font-black text-xs sm:text-sm tracking-widest uppercase px-4 py-1.5 rounded-full">
              RESGATE E ADOÇÃO UFU
            </motion.div>

            <motion.h1 variants={item} className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              Dê uma patinha, <br className="hidden sm:inline" />
              Salve uma vida!
            </motion.h1>

            <motion.p variants={item} className="text-base sm:text-lg lg:text-xl text-purple-100 font-normal max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Projeto de extensão da UFU que cuida da saúde e da alimentação dos gatos do Campus Santa Mônica, realiza castrações e promove a adoção responsável.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/animais"
                className="bg-white hover:bg-purple-50 text-[#6A0DAD] font-extrabold text-sm sm:text-base px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 btn-shine"
              >
                Adote Agora
              </Link>

              <Link
                to="/doacoes"
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-full border-2 border-white/60 transition-all transform hover:-translate-y-0.5 backdrop-blur-xs"
              >
                Doe agora
              </Link>
            </motion.div>

          </motion.div>

          {/* Lado Direito: Foto */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-5 flex justify-center items-center"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full max-w-md lg:max-w-none"
            >
              
              <div className="absolute inset-0 bg-[#F2C744]/20 rounded-3xl transform rotate-2 scale-98 blur-xl pointer-events-none" />

              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 bg-purple-900/30">
                <img
                  src={fotoHero}
                  alt="Gatinho recém resgatado pelo UFU MIA"
                  className="w-full h-80 sm:h-96 lg:h-[440px] object-cover object-[50%_30%] transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5 sm:p-6 text-white">
                  <span className="text-xs uppercase tracking-wider text-[#F2C744] font-bold block mb-0.5">
                    UFU MIA · Universidade Federal de Uberlândia
                  </span>
                  <span className="text-sm sm:text-base font-semibold">
                    Gatinho recém resgatado pelo projeto
                  </span>
                </div>
              </div>

            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
