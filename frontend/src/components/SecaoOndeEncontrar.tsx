export default function SecaoOndeEncontrar() {
  const locais = [
    {
      titulo: 'Feira de adoção',
      subtitulo: 'Agenda divulgada no Instagram',
      endereco: 'Campus Santa Mônica & Eventos',
      cidade: 'Uberlândia - MG',
      botaoTexto: 'Ver Instagram',
      botaoUrl: 'https://instagram.com/ufu.mia',
      bgCard: 'bg-[#EBF4FE]',
      corTextoTitulo: 'text-[#1D3557]',
      corSubtitulo: 'text-[#2B6CB0]',
      corBotao: 'border-[#2B6CB0] text-[#2B6CB0] hover:bg-[#2B6CB0] hover:text-white',
      icone: (
        <svg className="w-10 h-10 text-[#2B6CB0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      titulo: 'Ponto de Apoio UFU',
      subtitulo: 'Segunda à sexta das 9h às 17h',
      endereco: 'Campus Santa Mônica - Bloco 1A',
      cidade: 'Uberlândia - MG',
      botaoTexto: 'Falar com a ONG',
      botaoUrl: 'mailto:ufumiaufu@gmail.com',
      bgCard: 'bg-[#EAF8F1]',
      corTextoTitulo: 'text-[#134E39]',
      corSubtitulo: 'text-[#1D8E64]',
      corBotao: 'border-[#1D8E64] text-[#1D8E64] hover:bg-[#1D8E64] hover:text-white',
      icone: (
        <svg className="w-10 h-10 text-[#1D8E64]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      titulo: 'Clínica & Castrações',
      subtitulo: 'Triagem e Parcerias Veterinárias',
      endereco: 'Hospital Veterinário UFU & Parceiros',
      cidade: 'Uberlândia - MG',
      botaoTexto: 'Saiba como Ajudar',
      botaoUrl: '#doacoes',
      bgCard: 'bg-[#F2EDFB]',
      corTextoTitulo: 'text-[#3E1B64]',
      corSubtitulo: 'text-[#6A28A8]',
      corBotao: 'border-[#6A28A8] text-[#6A28A8] hover:bg-[#6A28A8] hover:text-white',
      icone: (
        <svg className="w-10 h-10 text-[#6A28A8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111827] tracking-tight">
            Onde nos encontrar
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {locais.map((local) => (
            <div
              key={local.titulo}
              className={`${local.bgCard} rounded-xl p-8 text-center flex flex-col justify-between items-center transition-transform hover:-translate-y-1 duration-200`}
            >
              <div className="flex flex-col items-center">
                <div className="mb-5">
                  {local.icone}
                </div>

                <h3 className={`text-xl font-bold ${local.corTextoTitulo} mb-1.5`}>
                  {local.titulo}
                </h3>

                <p className={`text-sm font-semibold ${local.corSubtitulo} mb-3`}>
                  {local.subtitulo}
                </p>

                <p className="text-xs sm:text-sm text-gray-600 mb-1">
                  {local.endereco}
                </p>
                <p className="text-xs text-gray-500 mb-6">
                  {local.cidade}
                </p>
              </div>

              <a
                href={local.botaoUrl}
                target={local.botaoUrl.startsWith('http') ? '_blank' : '_self'}
                rel="noreferrer"
                className={`inline-flex items-center gap-2 text-xs sm:text-sm font-bold px-6 py-2.5 rounded-lg border-2 bg-white ${local.corBotao} transition-colors shadow-2xs`}
              >
                <span>{local.botaoTexto}</span>
                <span>→</span>
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
