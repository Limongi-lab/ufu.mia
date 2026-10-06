import Reveal from './Reveal';
import { Link } from 'react-router-dom';
import { useConteudo } from '../context/ConteudoContext';
import { ehLinkInterno, linkSeguro } from '../services/conteudo';

export default function SecaoAtuacaoUFU() {
  const { t, listas } = useConteudo();
  const estilos = [
    { bgCard: 'bg-lilas-suave border-purple-200', corTitulo: 'text-roxo' },
    { bgCard: 'bg-[#FDF2F8] border-pink-200', corTitulo: 'text-pink-700' },
    { bgCard: 'bg-amarelo-suave border-amber-200', corTitulo: 'text-amber-800' },
    { bgCard: 'bg-purple-50 border-purple-200', corTitulo: 'text-roxo' },
    { bgCard: 'bg-[#FDF2F8] border-pink-200', corTitulo: 'text-pink-700' },
    { bgCard: 'bg-lilas-suave border-purple-200', corTitulo: 'text-roxo' },
  ];
  const frentes = listas.frentes.map((f, i) => ({ ...f, ...estilos[i % estilos.length] }));

  return (
    <Reveal>
    <section className="py-14 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-block bg-lilas/40 text-roxo font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-full mb-2">{t('frentes.selo')}</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-preto tracking-tight">{t('frentes.titulo')}</h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">{t('frentes.subtitulo')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {frentes.map((item) => (
            <div
              key={item.titulo}
              className={`${item.bgCard} rounded-2xl p-6 border shadow-2xs hover:shadow-md transition-all flex flex-col justify-between`}
            >
              <div>
                <h3 className={`text-lg font-bold ${item.corTitulo} mb-2.5`}>
                  {item.titulo}
                </h3>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-6 font-normal">
                  {item.descricao}
                </p>
              </div>

              {item.link_texto && (
                ehLinkInterno(linkSeguro(item.link_url)) ? (
                  <Link
                    to={linkSeguro(item.link_url)}
                        className="inline-flex items-center justify-between text-xs sm:text-sm font-bold text-roxo hover:text-roxo-escuro pt-3 border-t border-purple-200/60"
                  >
                    <span>{item.link_texto}</span>
                    <span>→</span>
                  </Link>
                ) : (
                  <a
                    href={linkSeguro(item.link_url)}
                    target="_blank"
                    rel="noreferrer"
                        className="inline-flex items-center justify-between text-xs sm:text-sm font-bold text-roxo hover:text-roxo-escuro pt-3 border-t border-purple-200/60"
                  >
                    <span>{item.link_texto}</span>
                    <span>→</span>
                  </a>
                )
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
    </Reveal>
  );
}
