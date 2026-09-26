import Header from '../components/Header';
import SecaoAnimais from '../components/SecaoAnimais';
import SecaoComoAjudar from '../components/SecaoComoAjudar';
import Footer from '../components/Footer';

export default function Animais() {
  return (
    <div className="relative z-10 min-h-screen font-sans text-gray-900 flex flex-col justify-between">
      <Header />
      <main>
        <div className="bg-gradient-to-r from-[#5B107D] via-[#7B1FA2] to-[#8C1BA8] py-12 sm:py-16 text-white text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="inline-block bg-[#F2C744] text-[#18141D] font-black text-xs uppercase tracking-wider px-3.5 py-1 rounded-full mb-3">
              UFU MIA • Adoção Responsável
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
              Gatinhos para Adoção
            </h1>
            <p className="mt-3 text-sm sm:text-base text-purple-100 max-w-2xl mx-auto leading-relaxed">
              Cada gatinho acolhido na Universidade Federal de Uberlândia passa por cuidados veterinários, vacinação e castração. Encontre seu novo companheiro!
            </p>
          </div>
        </div>

        <SecaoAnimais />
        <SecaoComoAjudar />
      </main>
      <Footer />
    </div>
  );
}
