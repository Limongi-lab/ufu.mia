import Header from '../components/Header';
import SecaoSobre from '../components/SecaoSobre';
import SecaoCCD from '../components/SecaoCCD';
import SecaoAtuacaoUFU from '../components/SecaoAtuacaoUFU';
import SecaoContadores from '../components/SecaoContadores';
import Footer from '../components/Footer';
import { useConteudo } from '../context/ConteudoContext';

export default function Sobre() {
  const { t } = useConteudo();
  return (
    <div className="relative z-10 min-h-screen font-sans text-gray-900 flex flex-col justify-between">
      <Header />
      <main>
        <div className="bg-white/45 py-10 sm:py-14 border-b border-purple-100/70 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-roxo tracking-tight">{t('pagina_sobre.titulo')}</h1>
            <p className="mt-3 text-sm sm:text-base text-gray-700 max-w-2xl mx-auto">{t('pagina_sobre.texto')}</p>
          </div>
        </div>

        <SecaoSobre />
        <SecaoCCD />
        <SecaoAtuacaoUFU />
        <SecaoContadores />
      </main>
      <Footer />
    </div>
  );
}
