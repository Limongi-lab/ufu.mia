import Reveal from './Reveal';
import { Link } from 'react-router-dom';

export default function SecaoAtuacaoUFU() {
  const frentes = [
    {
      titulo: 'Eventos',
      subtitulo: 'Arrecadação',
      descricao: 'Organização de bazares, rifas, feirinhas e outras ações para arrecadar fundos para os gatinhos.',
      linkTexto: 'Falar com Eventos',
      linkUrl: '/fale-conosco',
      bgCard: 'bg-lilas-suave border-purple-200',
      corTitulo: 'text-roxo',
    },
    {
      titulo: 'Marketing',
      subtitulo: 'Comunicação',
      descricao: 'Divulgação nas redes sociais e campanhas para dar visibilidade ao projeto e aos gatinhos.',
      linkTexto: 'Falar com Marketing',
      linkUrl: '/fale-conosco',
      bgCard: 'bg-[#FDF2F8] border-pink-200',
      corTitulo: 'text-pink-700',
    },
    {
      titulo: 'Artes',
      subtitulo: 'Design',
      descricao: 'Criação de materiais visuais e design para divulgação.',
      linkTexto: 'Falar com Artes',
      linkUrl: '/fale-conosco',
      bgCard: 'bg-amarelo-suave border-amber-200',
      corTitulo: 'text-amber-800',
    },
    {
      titulo: 'Resgates',
      subtitulo: 'Mapeamento e captura',
      descricao: 'Equipe dedicada ao mapeamento e à captura dos gatos.',
      linkTexto: 'Falar com Resgates',
      linkUrl: '/fale-conosco',
      bgCard: 'bg-purple-50 border-purple-200',
      corTitulo: 'text-roxo',
    },
    {
      titulo: 'Coordenação Interna',
      subtitulo: 'Organização',
      descricao: 'Gestão das equipes e organização do trabalho.',
      linkTexto: 'Falar com a Coordenação',
      linkUrl: '/fale-conosco',
      bgCard: 'bg-[#FDF2F8] border-pink-200',
      corTitulo: 'text-pink-700',
    },
    {
      titulo: 'Gente e Gestão',
      subtitulo: 'Apoio e logística',
      descricao: 'Apoio e logística para os voluntários e participantes do projeto.',
      linkTexto: 'Entrar para a equipe',
      linkUrl: '/processo-seletivo',
      bgCard: 'bg-lilas-suave border-purple-200',
      corTitulo: 'text-roxo',
    },
  ];

  return (
    <Reveal>
    <section className="py-14 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-block bg-lilas/40 text-roxo font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-full mb-2">
            Nossas Frentes de Trabalho
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-preto tracking-tight">
            Frentes de atuação do projeto
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            Conheça as equipes que fazem o UFU MIA acontecer todos os dias.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </Reveal>
  );
}
