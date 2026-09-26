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
          <stop offset="0%" stopColor="#ffd879" />
          <stop offset="10%" stopColor="#fcd774" />
          <stop offset="20%" stopColor="#f9b04c" />
          <stop offset="35%" stopColor="#f07137" />
          <stop offset="50%" stopColor="#e1306c" />
          <stop offset="70%" stopColor="#c13584" />
          <stop offset="85%" stopColor="#833ab4" />
          <stop offset="100%" stopColor="#405de6" />
        </radialGradient>
      </defs>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-purple-100/60 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
        
        {/* Logo UFU MIA */}
        <Link to="/" className="flex items-center gap-3.5 group">
          <img
            src={logoImg}
            alt="UFU MIA"
            className="w-12 h-12 rounded-full object-cover shadow-xs group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col">
            <span className="text-xl font-black text-gray-900 tracking-tight leading-none">
              Ufu Mia
            </span>
            <span className="text-[10px] font-bold text-[#7B1FA2] tracking-wider uppercase mt-1">
              Projeto de Extensão UFU
            </span>
          </div>
        </Link>

        {/* Menu Desktop */}
        <nav className="hidden lg:flex items-center gap-5 text-[13px] font-semibold">
          {[
            { to: '/', label: 'Início' },
            { to: '/animais', label: 'Animais' },
            { to: '/sobre', label: 'Sobre Nós' },
            { to: '/como-ajudar', label: 'Como Ajudar' },
            { to: '/fale-conosco', label: 'Fale Conosco' },
            { to: '/processo-seletivo', label: 'Processo Seletivo', pulse: true },
            { to: '/faq', label: 'Dúvidas' },
          ].map((item: { to: string; label: string; pulse?: boolean }) => (
            <Link
              key={item.to}
              to={item.to}
              className={`transition-colors py-1 relative flex items-center gap-1.5 ${
                isActive(item.to) ? 'text-[#7B1FA2] font-bold' : 'text-gray-700 hover:text-[#7B1FA2]'
              }`}
            >
              {item.label}
              {item.pulse && <span className="w-2 h-2 rounded-full bg-[#F2C744] animate-pulse" />}
              {isActive(item.to) && (
                <motion.div
                  layoutId="navIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7B1FA2] rounded-full"
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Lado Direito: Instagram + Botão Doações */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://instagram.com/ufu.mia"
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-xl bg-[#F5F0FC] hover:bg-gray-50 flex items-center justify-center transition-colors shadow-2xs"
            title="Instagram @ufu.mia"
          >
            <InstagramIcon className="w-5 h-5" />
          </a>

          <Link
            to="/doacoes"
            className="bg-[#7B1FA2] hover:bg-[#6A0DAD] text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-xs hover:shadow-md transition-all transform hover:-translate-y-0.5"
          >
            Doe agora
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-2">
          <Link
            to="/doacoes"
            className="bg-[#7B1FA2] text-white px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xs sm:hidden"
          >
            Doe agora
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-700 hover:text-[#7B1FA2] focus:outline-none"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown com animação */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-purple-100/60 px-5 py-4 space-y-2 shadow-lg overflow-hidden"
          >
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-bold text-gray-800 hover:text-[#7B1FA2]"
            >
              Início
            </Link>
            <Link
              to="/animais"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-bold text-gray-800 hover:text-[#7B1FA2]"
            >
              Animais para Adoção
            </Link>
            <Link
              to="/sobre"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-bold text-gray-800 hover:text-[#7B1FA2]"
            >
              Sobre Nós
            </Link>
            <Link
              to="/como-ajudar"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-bold text-gray-800 hover:text-[#7B1FA2]"
            >
              Como Ajudar
            </Link>
            <Link
              to="/fale-conosco"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-bold text-gray-800 hover:text-[#7B1FA2]"
            >
              Fale Conosco
            </Link>
            <Link
              to="/processo-seletivo"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-bold text-[#7B1FA2]"
            >
              Processo Seletivo
            </Link>
            <Link
              to="/faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-bold text-gray-800 hover:text-[#7B1FA2]"
            >
              Perguntas Frequentes
            </Link>
            <Link
              to="/doacoes"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-bold text-[#7B1FA2]"
            >
              Doações e PIX
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
