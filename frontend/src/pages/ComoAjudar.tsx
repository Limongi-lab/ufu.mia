import Header from '../components/Header';
import Footer from '../components/Footer';
import SecaoComoAjudar from '../components/SecaoComoAjudar';
import SecaoDoacao from '../components/SecaoDoacao';

export default function ComoAjudar() {
  return (
    <div className="relative z-10 min-h-screen font-sans text-gray-900 flex flex-col justify-between">
      <Header />
      <main>
        <SecaoComoAjudar />
        <SecaoDoacao />
      </main>
      <Footer />
    </div>
  );
}
