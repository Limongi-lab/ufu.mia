import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import logoImg from '../assets/logo.png';
import { useConteudo } from '../context/ConteudoContext';
import { URL_ADMIN } from '../services/conteudo';

export default function Footer() {
  const { t } = useConteudo();
  return (
    <footer className="bg-[#1F0B2C] text-white pt-16 pb-12 border-t border-purple-900/50">
      <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-purple-900/40">
          
          {/* Coluna 1: Logo e Descrição */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3.5">
              <img
                src={logoImg}
                alt="UFU MIA"
                className="w-13 h-13 rounded-full object-cover p-0.5 bg-white shadow-md"
              />
              <div>
                <span className="text-2xl font-black text-white tracking-tight block">
                  Ufu Mia
                </span>
                <span className="text-xs text-[#C9B8F0] font-semibold">{t('rodape.subtitulo')}</span>
              </div>
            </div>
            
            <p className="text-sm text-purple-200/80 leading-relaxed max-w-sm">{t('rodape.descricao')}</p>
          </div>

          {/* Coluna 2: Navegação Rápida */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-[#F2C744] uppercase tracking-wider">
              Navegação
            </h4>
            <ul className="space-y-2 text-sm text-purple-200/70 font-medium">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Início</Link>
              </li>
              <li>
                <Link to="/animais" className="hover:text-white transition-colors">Gatinhos para Adoção</Link>
              </li>
              <li>
                <Link to="/processo-seletivo" className="hover:text-white transition-colors">
                  Processo Seletivo
                </Link>
              </li>
              <li>
                <Link to="/como-ajudar" className="hover:text-white transition-colors">Como Ajudar</Link>
              </li>
              <li>
                <Link to="/fale-conosco" className="hover:text-white transition-colors">Fale Conosco</Link>
              </li>
              <li>
                <Link to="/sobre" className="hover:text-white transition-colors">Sobre o Projeto</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">Perguntas Frequentes</Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Contato & Institucional */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-black text-[#F2C744] uppercase tracking-wider">
              Contato & Localização
            </h4>
            <p className="text-sm text-purple-200/80">
              E-mail: <strong className="text-white font-mono text-sm select-all">{t('rodape.email')}</strong>
            </p>
            <p className="text-sm text-purple-200/70">{t('rodape.localizacao')}</p>
            <div className="pt-2">
              <a
                href="https://instagram.com/ufu.mia"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-900/60 hover:bg-purple-800 border border-purple-700/50 text-xs sm:text-sm font-bold text-white transition-all hover:scale-105"
              >
                <span>Instagram @ufu.mia</span>
              </a>
            </div>
          </div>

        </div>

        {/* Rodapé inferior */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-purple-300/60 font-medium">
          <p>© {new Date().getFullYear()} UFU MIA, Universidade Federal de Uberlândia. Todos os direitos reservados.</p>
          <p className="font-semibold text-purple-200/80 flex items-center gap-2">
            Feito por Rafael Limongi
            {URL_ADMIN && (
              <a
                href={URL_ADMIN}
                aria-label="Área da equipe"
                title="Área da equipe"
                className="inline-flex p-1 opacity-20 hover:opacity-100 focus-visible:opacity-100 transition-opacity"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5" aria-hidden="true">
                  <rect x="4" y="11" width="16" height="10" rx="2" />
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                </svg>
              </a>
            )}
          </p>
        </div>

      </Reveal>
    </footer>
  );
}
