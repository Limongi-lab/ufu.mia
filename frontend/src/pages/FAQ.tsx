import Header from '../components/Header';
import SecaoFAQ from '../components/SecaoFAQ';
import FaixaDestaqueInsta from '../components/FaixaDestaqueInsta';
import Footer from '../components/Footer';

export default function FAQ() {
  return (
    <div className="relative z-10 min-h-screen font-sans text-gray-900 flex flex-col justify-between">
      <Header />
      <main>
        <div className="bg-white/45 py-10 sm:py-14 border-b border-purple-100/70 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-roxo tracking-tight">
              Perguntas Frequentes
            </h1>
            <p className="mt-3 text-sm sm:text-base text-gray-700 max-w-2xl mx-auto">
              Reunimos aqui as principais respostas sobre como adotar, como ajudar e como funciona a proteção animal em Uberlândia.
            </p>
          </div>
        </div>

        <SecaoFAQ />
        <FaixaDestaqueInsta />
      </main>
      <Footer />
    </div>
  );
}
