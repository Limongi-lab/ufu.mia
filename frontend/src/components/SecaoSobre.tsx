import { useState } from 'react';

export default function SecaoSobre() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const compromissos = [
    {
      titulo: 'Compromisso com o Resgate Ético',
      descricao: 'Monitoramento contínuo dos campi da UFU (Santa Mônica, Umuarama e Glória), acolhendo animais em vulnerabilidade com respeito e dedicação.',
    },
    {
      titulo: 'Foco em Saúde, Vacinação e Castração',
      descricao: 'Todos os felinos resgatados passam por triagem veterinária, exames, vermifugação, vacinação e cirurgia de castração antes de serem doados.',
    },
    {
      titulo: 'Construindo Lares Amorosos e Conexões',
      descricao: 'Entrevistas de adoção criteriosas para garantir que cada gatinho vá para um ambiente seguro, telado e acolhedor por toda a vida.',
    },
  ];

  return (
    <section id="sobre" className="py-16 sm:py-24 bg-[#FAF7FD] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Lado Esquerdo: Imagem no estilo do modelo Weblium (com fundo de cor sólida) */}
          <div className="lg:col-span-6 flex justify-center">
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
          </div>

          {/* Lado Direito: Textos e Accordion com (+) como no modelo */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Ícone de patinha em círculo */}
            <div className="w-14 h-14 rounded-full bg-[#7B1FA2] text-white flex items-center justify-center text-2xl shadow-md">
              🐾
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
              O <strong>UFU MIA</strong> é um projeto de extensão da <strong>Universidade Federal de Uberlândia (UFU)</strong> que acolhe, trata e prepara gatinhos para adoção responsável, transformando o campus em um espaço de cuidado e conscientização.
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
                      <p className="mt-2.5 text-xs sm:text-sm text-gray-600 leading-relaxed animate-fadeIn">
                        {item.descricao}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
