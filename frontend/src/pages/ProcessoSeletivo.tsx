import Header from '../components/Header';
import SecaoProcessoSeletivo from '../components/SecaoProcessoSeletivo';
import SecaoFAQ from '../components/SecaoFAQ';
import Footer from '../components/Footer';

export default function ProcessoSeletivo() {
  return (
    <div className="relative z-10 min-h-screen font-sans text-gray-900 flex flex-col justify-between">
      <Header />
      <main>
        {/* Banner Superior da Página */}
        <div className="bg-gradient-to-r from-[#5B107D] via-[#7B1FA2] to-[#8C1BA8] py-12 sm:py-16 text-white text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="inline-block bg-[#F2C744] text-[#18141D] font-black text-xs uppercase tracking-wider px-3.5 py-1 rounded-full mb-3">
              Universidade Federal de Uberlândia
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
              Processo Seletivo UFU MIA
            </h1>
            <p className="mt-3 text-sm sm:text-base text-purple-100 max-w-2xl mx-auto leading-relaxed">
              Venha fazer a diferença na proteção, manejo ético e acolhimento dos felinos da UFU. Confira nosso edital oficial e preencha sua inscrição online!
            </p>
          </div>
        </div>

        <SecaoProcessoSeletivo />
        <SecaoFAQ />
      </main>
      <Footer />
    </div>
  );
}
