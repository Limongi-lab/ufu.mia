import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function FaixaDestaqueInsta() {
  return (
    <section className="bg-gradient-to-r from-[#5B107D] via-[#7B1FA2] to-[#8C1BA8] text-white py-10 sm:py-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left"
        >
          
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-block bg-[#F2C744] text-[#1F1A24] font-black text-[11px] uppercase tracking-wider px-3 py-0.5 rounded-full mb-1">
              Participe da Causa • UFU MIA
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white">
              Quer fazer parte da nossa história?
            </h3>
            <p className="text-xs sm:text-sm text-purple-100 leading-relaxed">
              Acompanhe nossos resgates diários na UFU, novos gatinhos disponíveis para adoção e novidades do Processo Seletivo!
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              to="/processo-seletivo"
              className="bg-[#F2C744] hover:bg-[#E0B634] text-[#1F1A24] font-bold px-5 py-3 rounded-xl text-xs sm:text-sm transition-all shadow-xs hover:shadow-md transform hover:-translate-y-0.5 flex items-center gap-1.5"
            >
              <span>Processo Seletivo</span>
            </Link>

            <a
              href="https://instagram.com/ufu.mia"
              target="_blank"
              rel="noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2"
            >
              <span>Instagram @ufu.mia</span>
            </a>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
