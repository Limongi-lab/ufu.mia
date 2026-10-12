import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import logoImg from '../assets/logo.png';
import { useConteudo } from '../context/ConteudoContext';
import { URL_ADMIN } from '../services/conteudo';

export default function Footer() {
  const { t } = useConteudo();
  return (
    <footer className="bg-[#1F0B2C] text-white pt-16 pb-10 relative overflow-hidden">
      {/* Blob decorativo */}
      <div className="pointer-events-none absolute top-0 right-0 w-80 h-80 bg-[#7B1FA2]/10 rounded-full blur-3xl" />

      <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Bloco Superior ──────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-white/10">

          {/* Coluna 1: Marca */}
          <div className="md:col-span-5 space-y-5">
            <Link to="/" className="inline-flex items-center gap-3.5 group">
              <div className="relative">
                <img
                  src={logoImg}
                  alt="UFU MIA"
                  className="w-14 h-14 rounded-full object-cover p-0.5 bg-white shadow-md group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div>
                <span className="text-2xl font-black text-white tracking-tight block">UFU MIA</span>
                <span className="text-xs text-[#C9B8F0] font-semibold">{t('rodape.subtitulo')}</span>
              </div>
            </Link>

            <p className="text-sm text-white/60 leading-relaxed max-w-sm">
              {t('rodape.descricao')}
            </p>

            {/* Botão Instagram */}
            <a
              href="https://instagram.com/ufu.mia"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/20 text-sm font-bold text-white hover:bg-white/10 transition-colors"
            >
              <span className="text-base">📸</span>
              @ufu.mia no Instagram
            </a>
          </div>

          {/* Coluna 2: Navegação */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-[10px] font-black text-[#F2C744] uppercase tracking-widest">
              Navegação
            </h4>
            <ul className="space-y-2.5">
              {[
                { to: '/',                  label: 'Início' },
                { to: '/animais',           label: 'Gatinhos para Adoção' },
                { to: '/processo-seletivo', label: 'Processo Seletivo' },
                { to: '/como-ajudar',       label: 'Como Ajudar' },
                { to: '/fale-conosco',      label: 'Fale Conosco' },
                { to: '/sobre',             label: 'Sobre o Projeto' },
                { to: '/faq',               label: 'Perguntas Frequentes' },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-white/55 hover:text-white transition-colors font-medium"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Contato */}
          <div className="md:col-span-4 space-y-5">
            <h4 className="text-[10px] font-black text-[#F2C744] uppercase tracking-widest">
              Contato
            </h4>

            {/* Email */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold mb-0.5">E-mail</p>
                <strong className="text-white font-mono text-sm select-all">{t('rodape.email')}</strong>
              </div>
            </div>

            {/* Localização */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold mb-0.5">Localização</p>
                <p className="text-sm text-white/70">{t('rodape.localizacao')}</p>
              </div>
            </div>

            {/* CTA doação */}
            <Link
              to="/doacoes"
              className="block mt-6 w-full text-center bg-[#7B1FA2] hover:bg-[#6A0DAD] text-white px-6 py-3.5 rounded-full font-bold text-sm shadow-lg hover:shadow-xl transition-all btn-shine"
            >
              Fazer uma doação 💜
            </Link>
          </div>

        </div>

        {/* ── Rodapé inferior ─────────────────────────────────── */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/35 font-medium">
          <p>© {new Date().getFullYear()} UFU MIA — Universidade Federal de Uberlândia.</p>
          <p className="flex items-center gap-2">
            Feito por Rafael Limongi
            {URL_ADMIN && (
              <a
                href={URL_ADMIN}
                aria-label="Área da equipe"
                title="Área da equipe"
                className="inline-flex p-1 opacity-25 hover:opacity-100 focus-visible:opacity-100 transition-opacity"
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
