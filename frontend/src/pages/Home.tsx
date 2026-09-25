import Header from '../components/Header';
import Hero from '../components/Hero';
import SecaoAnimais from '../components/SecaoAnimais';
import SecaoSobre from '../components/SecaoSobre';
import SecaoComoAjudar from '../components/SecaoComoAjudar';
import SecaoDoacao from '../components/SecaoDoacao';
import SecaoFAQ from '../components/SecaoFAQ';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Header />
      <main>
        <Hero />
        <SecaoAnimais />
        <SecaoSobre />
        <SecaoComoAjudar />
        <SecaoDoacao />
        <SecaoFAQ />
      </main>
      <Footer />
    </div>
  );
}
