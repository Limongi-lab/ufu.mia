import { Link } from 'react-router-dom';

export default function SecaoAtuacaoUFU() {
  const frentes = [
    {
      titulo: 'Resgate nos Campi',
      subtitulo: 'UFU - Universidade Federal de Uberlândia',
      descricao: 'Monitoramento diário, resgate ético e triagem de felinos que circulam nos espaços da UFU.',
      linkTexto: 'Como Ajudar',
      linkUrl: '/como-ajudar',
      bgCard: 'bg-lilas-suave border-purple-200',
      corTitulo: 'text-roxo',
    },
    {
      titulo: 'Castração & Saúde',
      subtitulo: 'Hospital Veterinário UFU',
      descricao: 'Controle populacional ético com castrações, vacinação e tratamento de doenças.',
      linkTexto: 'Apoiar Tratamentos',
      linkUrl: '/doacoes',
      bgCard: 'bg-[#FDF2F8] border-pink-200',
      corTitulo: 'text-pink-700',
    },
    {
      titulo: 'Lar Temporário (LT)',
      subtitulo: 'Acolhimento Voluntário',
      descricao: 'Espaço temporário para gatinhos em recuperação ou filhotes aguardando vacinação.',
      linkTexto: 'Oferecer Lar (LT)',
      linkUrl: '/fale-conosco',
      bgCard: 'bg-amarelo-suave border-amber-200',
      corTitulo: 'text-amber-800',
    },
    {
      titulo: 'Feiras & Adoção',
      subtitulo: 'Posse Responsável',
      descricao: 'Eventos presenciais e entrevistas criteriosas para garantir um lar seguro e telado.',
      linkTexto: 'Ver Animais',
      linkUrl: '/animais',
      bgCard: 'bg-purple-50 border-purple-200',
      corTitulo: 'text-roxo',
    },
  ];

  return (
    <section className="py-14 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-block bg-lilas/40 text-roxo font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-full mb-2">
            Nossas Frentes de Trabalho
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-preto tracking-tight">
            Como atuamos na UFU
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            Conheça as ações contínuas do projeto de extensão para garantir o bem-estar felino em Uberlândia.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {frentes.map((item) => (
            <div
              key={item.titulo}
              className={`${item.bgCard} rounded-2xl p-6 border shadow-2xs hover:shadow-md transition-all flex flex-col justify-between`}
            >
              <div>
                <h3 className={`text-lg font-bold ${item.corTitulo} mb-1`}>
                  {item.titulo}
                </h3>

                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5">
                  {item.subtitulo}
                </p>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-6 font-normal">
                  {item.descricao}
                </p>
              </div>

              <Link
                to={item.linkUrl}
                className="inline-flex items-center justify-between text-xs sm:text-sm font-bold text-roxo hover:text-roxo-escuro pt-3 border-t border-purple-200/60"
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
