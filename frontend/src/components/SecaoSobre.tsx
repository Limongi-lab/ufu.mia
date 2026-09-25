import { useState } from 'react';
import { motion } from 'framer-motion';

export default function SecaoSobre() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const compromissos = [
    {
      titulo: 'Compromisso com o Resgate Ético',
      descricao: 'Monitoramento e acolhimento contínuo na Universidade Federal de Uberlândia (UFU), acolhendo animais em vulnerabilidade com respeito, responsabilidade e dedicação.',
    },
    {
      titulo: 'Foco em Saúde, Vacinação e Castração',
      descricao: 'Todos os felinos resgatados passam por triagem veterinária, exames, vermifugação, vacinação e cirurgia de castração antes de serem encaminhados para adoção responsável.',
    },
    {
      titulo: 'Construindo Lares Amorosos e Conexões',
      descricao: 'Entrevistas de adoção criteriosas para garantir que cada gatinho vá para um ambiente seguro, com telas de proteção e acolhedor por toda a vida.',
    },
  ];

  return (
    <section id="sobre" className="py-16 sm:py-24 bg-[#FAF7FD] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Lado Esquerdo: Imagem com moldura estilizada e animação suave */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex justify-center"
          >
            <div className="relative w-full max-w-lg">
              
              {/* Fundo colorido sólido da imagem */}
              <div className="absolute inset-0 bg-[#7B1FA2] rounded-3xl transform -rotate-2 scale-98 opacity-90" />

              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?q=80&w=800&auto=format&fit=crop"
                  alt="Acolhimento com carinho UFU MIA"
                  className="w-full h-80 sm:h-96 lg:h-[460px] object-cover"
                />
              </div>

            </div>
          </motion.div>

          {/* Lado Direito: Textos e Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6 space-y-6"
          >
            
            {/* Ícone de patinha em círculo */}
            <div className="w-14 h-14 rounded-2xl bg-[#7B1FA2] text-white flex items-center justify-center text-2xl shadow-md">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </div>

            <div className="inline-block text-[#F2C744] font-black text-xs sm:text-sm tracking-widest uppercase">
              — SOBRE O PROJETO —
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">
              O que nos move a cuidar dos gatinhos da UFU<span className="text-[#7B1FA2]">.</span>
            </h2>

            <p className="text-base sm:text-lg text-gray-800 font-semibold leading-relaxed">
              Nosso amor pelos animais é o que move cada voluntário, cada resgate e cada nova chance de vida.
            </p>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
              O <strong>UFU MIA</strong> é um projeto de extensão da <strong>Universidade Federal de Uberlândia (UFU)</strong> que acolhe, trata e prepara gatinhos para adoção responsável, transformando a universidade em um espaço de cuidado, saúde pública e conscientização.
            </p>

            {/* Lista de Compromissos com (+) */}
            <div className="pt-2 divide-y divide-purple-200 border-y border-purple-200">
              {compromissos.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <div key={item.titulo} className="py-4">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="w-full text-left flex justify-between items-center gap-4 focus:outline-none group"
                    >
                      <span className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#7B1FA2] transition-colors">
                        {item.titulo}
                      </span>
                      <span className="text-2xl font-black text-[#7B1FA2] shrink-0 transition-transform duration-200">
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>

                    {isOpen && (
                      <p className="mt-2.5 text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                        {item.descricao}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
