import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../assets/logo.png';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
        
        {/* Logo do UFU MIA estilo Paws & Tails */}
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
            <span className="text-[10px] font-bold text-[#7B1FA2] tracking-wider uppercase mt-0.5">
              Projeto de Extensão UFU
            </span>
          </div>
        </Link>

        {/* Menu Desktop Centralizado */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold">
          <Link
            to="/"
            className={`transition-colors py-1 ${
              isActive('/') ? 'text-[#7B1FA2] font-bold' : 'text-gray-700 hover:text-[#7B1FA2]'
            }`}
          >
            Início
          </Link>
          <Link
            to="/animais"
            className={`transition-colors py-1 ${
              isActive('/animais') ? 'text-[#7B1FA2] font-bold' : 'text-gray-700 hover:text-[#7B1FA2]'
            }`}
          >
            Animais
          </Link>
          <Link
            to="/sobre"
            className={`transition-colors py-1 ${
              isActive('/sobre') ? 'text-[#7B1FA2] font-bold' : 'text-gray-700 hover:text-[#7B1FA2]'
            }`}
          >
            Sobre Nós
          </Link>
          <Link
            to="/sobre#como-ajudar"
            className="text-gray-700 hover:text-[#7B1FA2] transition-colors py-1"
          >
            Como Ajudar
          </Link>
          <Link
            to="/faq"
            className={`transition-colors py-1 ${
              isActive('/faq') ? 'text-[#7B1FA2] font-bold' : 'text-gray-700 hover:text-[#7B1FA2]'
            }`}
          >
            Dúvidas
          </Link>
          <Link
            to="/doacoes"
            className={`transition-colors py-1 ${
              isActive('/doacoes') ? 'text-[#7B1FA2] font-bold' : 'text-gray-700 hover:text-[#7B1FA2]'
            }`}
          >
            Doações
          </Link>
        </nav>

        {/* Lado Direito: Redes Sociais & Botão Doe Agora */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://instagram.com/ufu.mia"
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-lg bg-[#F5F0FC] hover:bg-[#7B1FA2] text-[#7B1FA2] hover:text-white flex items-center justify-center transition-colors text-sm font-bold"
            title="Instagram @ufu.mia"
          >
            📷
          </a>

          <Link
            to="/doacoes"
            className="bg-[#7B1FA2] hover:bg-[#6A0DAD] text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-xs hover:shadow-md transition-all transform hover:-translate-y-0.5 flex items-center gap-1.5"
          >
            <span>Doe agora</span>
            <span className="text-[#F2C744]">❤️</span>
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

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-5 py-4 space-y-2 shadow-lg">
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
            Animais para Adoção 🐾
          </Link>
          <Link
            to="/sobre"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-gray-800 hover:text-[#7B1FA2]"
          >
            Sobre Nós
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
            Doações & PIX ❤️
          </Link>
        </div>
      )}
    </header>
  );
}
