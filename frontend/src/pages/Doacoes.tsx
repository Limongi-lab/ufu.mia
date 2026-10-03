import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Doacoes() {
  const [copied, setCopied] = useState(false);
  const chavePix = 'ufumiaufu@gmail.com';

  const handleCopyPix = () => {
    navigator.clipboard.writeText(chavePix);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="relative z-10 min-h-screen font-sans text-gray-900 flex flex-col justify-between">
      <Header />
      
      <main className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
              Doações
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-600 font-medium">
              Participe de nossos eventos, como bazares e rifas, ou contribua com doações pela chave PIX.
            </p>
          </motion.div>

          <div className="bg-gradient-to-r from-[#5B107D] via-[#7B1FA2] to-[#8C1BA8] text-white rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-xl mb-12">
            <div className="inline-block bg-[#F2C744] text-[#18141D] font-black text-xs uppercase tracking-wider px-3.5 py-1 rounded-full mb-3">
              Chave PIX Oficial (E-mail)
            </div>

            <h2 className="text-2xl sm:text-3xl font-black mb-2">
              Faça sua transferência via PIX
            </h2>

            <p className="text-xs sm:text-sm text-purple-100 max-w-md mx-auto mb-6">
              Abra o app do seu banco, escolha a opção PIX e cole a chave abaixo:
            </p>

            <div className="bg-white text-gray-900 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 max-w-lg mx-auto shadow-md">
              <span className="font-mono text-base sm:text-xl font-bold text-[#7B1FA2] select-all">
                {chavePix}
              </span>

              <button
                onClick={handleCopyPix}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-colors ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#F2C744] hover:bg-[#E0B634] text-[#18141D]'
                }`}
              >
                {copied ? 'Chave copiada!' : 'Copiar Chave PIX'}
              </button>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
