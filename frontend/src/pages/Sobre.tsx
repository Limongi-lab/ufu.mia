import Header from '../components/Header';
import SecaoSobre from '../components/SecaoSobre';
import SecaoContadores from '../components/SecaoContadores';
import Footer from '../components/Footer';

export default function Sobre() {
  return (
    <div className="relative z-10 min-h-screen font-sans text-gray-900 flex flex-col justify-between">
      <Header />
      <main>
        <div className="bg-white/45 py-10 sm:py-14 border-b border-purple-100/70 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-roxo tracking-tight">
              Sobre o UFU MIA
            </h1>
            <p className="mt-3 text-sm sm:text-base text-gray-700 max-w-2xl mx-auto">
              Conheça a história e o propósito do projeto de extensão universitária voltado ao bem-estar e acolhimento dos felinos na UFU.
            </p>
          </div>
        </div>

        <SecaoSobre />
        <SecaoContadores />
      </main>
      <Footer />
    </div>
  );
}
