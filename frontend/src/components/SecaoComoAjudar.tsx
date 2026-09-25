import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function SecaoComoAjudar() {
  const formasAjudar = [
    {
      icone: '🏠',
      titulo: 'Adoção Responsável',
      descricao: 'Dê um lar permanente cheio de amor, segurança e cuidados para um dos nossos gatinhos resgatados.',
      linkTexto: 'Ver Animais',
      linkUrl: '/animais',
      isExternal: false,
      bg: 'bg-[#F5F0FC]',
      borda: 'border-purple-200',
    },
    {
      icone: '🛌',
      titulo: 'Lar Temporário (LT)',
      descricao: 'Acolha temporariamente gatinhos em recuperação ou filhotes até que encontrem uma família definitiva.',
      linkTexto: 'Saiba como Ajudar',
      linkUrl: '/faq',
      isExternal: false,
      bg: 'bg-[#FEF8ED]',
      borda: 'border-amber-200',
    },
    {
      icone: '✍️',
      titulo: 'Processo Seletivo',
      descricao: 'Inscreva-se como voluntário no projeto de extensão UFU e contribua nas ações de acolhimento e conscientização.',
      linkTexto: 'Ver Edital & Vagas',
      linkUrl: '/processo-seletivo',
      isExternal: false,
      bg: 'bg-[#FAF5FF]',
      borda: 'border-purple-300/80',
    },
    {
      icone: '📢',
      titulo: 'Divulgação nas Redes',
      descricao: 'Compartilhe nossos posts no Instagram para ajudar os gatinhos a encontrarem famílias amorosas mais rápido.',
      linkTexto: 'Seguir @ufu.mia',
      linkUrl: 'https://instagram.com/ufu.mia',
      isExternal: true,
      bg: 'bg-[#EBF8F2]',
      borda: 'border-emerald-200',
    },
  ];

  return (
    <section id="como-ajudar" className="py-16 sm:py-24 bg-[#F8F6FC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <div className="inline-block text-[#F2C744] font-black text-xs sm:text-sm tracking-widest uppercase mb-2">
            — FAÇA A DIFERENÇA —
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
            Como você pode nos ajudar<span className="text-[#7B1FA2]">.</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
            Você pode transformar a vida dos gatinhos da UFU de diversas formas. Seja acolhendo, participando do processo seletivo ou compartilhando nossas histórias:
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {formasAjudar.map((item, idx) => (
            <motion.div
              key={item.titulo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`${item.bg} ${item.borda} rounded-3xl p-6 sm:p-8 border shadow-2xs hover:shadow-md transition-all flex flex-col justify-between`}
            >
              <div>
                <div className="text-2xl mb-4 bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xs">
                  {item.icone}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {item.titulo}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6 font-medium">
                  {item.descricao}
                </p>
              </div>

              {item.isExternal ? (
                <a
                  href={item.linkUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-between text-xs sm:text-sm font-bold text-[#7B1FA2] hover:text-[#5B107D] pt-3 border-t border-purple-200/60"
                >
                  <span>{item.linkTexto}</span>
                  <span>→</span>
                </a>
              ) : (
                <Link
                  to={item.linkUrl}
                  className="inline-flex items-center justify-between text-xs sm:text-sm font-bold text-[#7B1FA2] hover:text-[#5B107D] pt-3 border-t border-purple-200/60"
                >
                  <span>{item.linkTexto}</span>
                  <span>→</span>
                </Link>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
