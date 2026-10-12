import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../assets/logo.png';

// SVG oficial do Instagram com gradiente
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="url(#ig-gradient)"
    >
      <defs>
        <radialGradient id="ig-gradient" cx="30%" cy="107%" r="150%">
          <stop offset="0%"   stopColor="#ffd879" />
          <stop offset="10%"  stopColor="#fcd774" />
          <stop offset="20%"  stopColor="#f9b04c" />
          <stop offset="35%"  stopColor="#f07137" />
          <stop offset="50%"  stopColor="#e1306c" />
          <stop offset="70%"  stopColor="#c13584" />
          <stop offset="85%"  stopColor="#833ab4" />
          <stop offset="100%" stopColor="#405de6" />
        </radialGradient>
      </defs>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

const NAV_LINKS = [
  { to: '/',                   label: 'Início' },
  { to: '/animais',            label: 'Animais' },
  { to: '/sobre',              label: 'Sobre Nós' },
  { to: '/como-ajudar',        label: 'Como Ajudar' },
  { to: '/fale-conosco',       label: 'Fale Conosco' },
  { to: '/processo-seletivo',  label: 'Processo Seletivo', pulse: true },
  { to: '/faq',                label: 'Dúvidas' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-purple-100 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-[4.5rem]">

        {/* ── Logo ─────────────────────────────── */}
        <Link
          to="/"
          onClick={(e) => {
            if (location.pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="flex items-center gap-3 group"
        >
          <div className="relative">
            <img
              src={logoImg}
              alt="UFU MIA"
              className="w-11 h-11 rounded-full object-cover shadow-md group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300"
            />
            {/* halo roxo suave ao hover */}
            <div className="absolute inset-0 rounded-full bg-[#7B1FA2]/0 group-hover:bg-[#7B1FA2]/10 transition-colors duration-300" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[1.15rem] font-black text-gray-900 tracking-tight">
              UFU MIA
            </span>
            <span className="hidden min-[360px]:block text-[9px] font-bold text-[#7B1FA2] tracking-widest uppercase mt-0.5">
              Projeto de Extensão UFU
            </span>
          </div>
        </Link>

        {/* ── Nav Desktop ───────────────────────── */}
        <nav className="hidden lg:flex items-center gap-1 text-[13px] font-semibold">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`relative px-3 py-2 rounded-full flex items-center gap-1.5 transition-all duration-200 ${
                isActive(item.to)
                  ? 'text-[#7B1FA2] bg-purple-50 font-bold'
                  : 'text-gray-700 hover:text-[#7B1FA2] hover:bg-purple-50/70'
              }`}
            >
              {item.label}
              {item.pulse && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#F2C744] animate-pulse" />
              )}
            </Link>
          ))}
        </nav>

        {/* ── Direita: Instagram + Doe Agora ────── */}
        <div className="hidden sm:flex items-center gap-2.5">
          <a
            href="https://instagram.com/ufu.mia"
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-xl bg-purple-50 hover:bg-purple-100 flex items-center justify-center transition-colors"
            title="Instagram @ufu.mia"
          >
            <InstagramIcon className="w-5 h-5" />
          </a>

          <Link
            to="/doacoes"
            className="bg-[#7B1FA2] hover:bg-[#6A0DAD] text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-md hover:shadow-lg btn-pulse transition-all"
          >
            Doe agora 💜
          </Link>
        </div>

        {/* ── Mobile: Botão Hamburguer ──────────── */}
        <div className="lg:hidden flex items-center gap-2">
          <Link
            to="/doacoes"
            className="bg-[#7B1FA2] text-white px-3.5 py-2 min-h-10 inline-flex items-center rounded-full text-xs font-bold shadow-sm btn-pulse sm:hidden"
          >
            Doe 💜
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-700 hover:text-[#7B1FA2] hover:bg-purple-50 transition-colors"
            aria-label="Menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ── Mobile Menu Dropdown ───────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="lg:hidden bg-white border-t border-purple-100 px-5 py-5 shadow-lg overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-1.5">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2.5 px-3 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-colors ${
                    isActive(item.to)
                      ? 'bg-purple-50 text-[#7B1FA2] font-bold'
                      : 'text-gray-700 hover:bg-purple-50 hover:text-[#7B1FA2]'
                  }`}
                >
                  {item.label}
                  {item.pulse && <span className="w-1.5 h-1.5 rounded-full bg-[#F2C744] animate-pulse" />}
                </Link>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-purple-100 flex items-center gap-3">
              <Link
                to="/doacoes"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center bg-[#7B1FA2] text-white px-4 py-3 rounded-full text-sm font-bold shadow-sm"
              >
                Doe agora 💜
              </Link>
              <a
                href="https://instagram.com/ufu.mia"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
