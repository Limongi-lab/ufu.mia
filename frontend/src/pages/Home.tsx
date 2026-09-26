import Header from '../components/Header';
import Hero from '../components/Hero';
import SecaoAnimais from '../components/SecaoAnimais';
import SecaoSobre from '../components/SecaoSobre';
import SecaoProcessoSeletivo from '../components/SecaoProcessoSeletivo';
import SecaoComoAjudar from '../components/SecaoComoAjudar';
import SecaoContadores from '../components/SecaoContadores';
import SecaoFAQ from '../components/SecaoFAQ';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="relative z-10 min-h-screen font-sans text-gray-900 flex flex-col justify-between">
      <Header />
      <main>
        <Hero />
        <SecaoAnimais />
        <SecaoSobre />
        <SecaoProcessoSeletivo />
        <SecaoComoAjudar />
        <SecaoContadores />
        <SecaoFAQ />
      </main>
      <Footer />
    </div>
  );
}
