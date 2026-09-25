import { Link } from 'react-router-dom';

export default function SecaoComoAjudar() {
  const formasAjudar = [
    {
      icone: '🏠',
      titulo: 'Adoção Responsável',
      descricao: 'Dê um lar permanente cheio de amor, segurança e cuidados para um dos nossos gatinhos.',
      linkTexto: 'Ver Animais',
      linkUrl: '/animais',
      bg: 'bg-[#F5F0FC]',
      borda: 'border-purple-200',
    },
    {
      icone: '🛌',
      titulo: 'Lar Temporário (LT)',
      descricao: 'Acolha temporariamente durante a recuperação ou férias até que o gatinho encontre uma família.',
      linkTexto: 'Oferecer LT',
      linkUrl: '/faq',
      bg: 'bg-[#FEF8ED]',
      borda: 'border-amber-200',
    },
    {
      icone: '🍲',
      titulo: 'Doação de Ração & Sachês',
      descricao: 'Ajude com ração de qualidade para filhotes e adultos, sachês, vermífugos e antipulgas.',
      linkTexto: 'Como Doar',
      linkUrl: '/doacoes',
      bg: 'bg-[#FDF2F8]',
      borda: 'border-pink-200',
    },
    {
      icone: '💳',
      titulo: 'Contribuição via PIX',
      descricao: 'Qualquer valor nos ajuda a custear castrações, consultas emergenciais e alimentação.',
      linkTexto: 'Fazer Doação',
      linkUrl: '/doacoes',
      bg: 'bg-[#EBF8F2]',
      borda: 'border-emerald-200',
    },
  ];

  return (
    <section id="como-ajudar" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-block text-[#F2C744] font-black text-xs sm:text-sm tracking-widest uppercase mb-2">
            — FAÇA A DIFERENÇA —
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
            Como você pode nos ajudar<span className="text-[#7B1FA2]">.</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
            Você pode transformar a vida dos gatinhos da UFU de diversas formas. Seja com um lar, voluntariado ou doações:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {formasAjudar.map((item) => (
            <div
              key={item.titulo}
              className={`${item.bg} ${item.borda} rounded-3xl p-6 sm:p-8 border shadow-2xs hover:shadow-md transition-all flex flex-col justify-between`}
            >
              <div>
                <div className="text-3xl mb-4 bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xs">
                  {item.icone}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {item.titulo}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6 font-medium">
                  {item.descricao}
                </p>
              </div>

              <Link
                to={item.linkUrl}
                className="inline-flex items-center justify-between text-xs sm:text-sm font-bold text-[#7B1FA2] hover:text-[#5B107D] pt-3 border-t border-purple-200/60"
              >
                <span>{item.linkTexto}</span>
                <span>→</span>
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
