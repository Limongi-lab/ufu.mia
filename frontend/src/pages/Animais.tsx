import Header from '../components/Header';
import SecaoAnimais from '../components/SecaoAnimais';
import Footer from '../components/Footer';

export default function Animais() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col justify-between">
      <Header />
      <main>
        <div className="bg-lilas-suave py-10 sm:py-14 border-b border-purple-100 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-roxo tracking-tight">
              Gatinhos para Adoção
            </h1>
            <p className="mt-3 text-sm sm:text-base text-gray-700 max-w-2xl mx-auto">
              Cada animalzinho resgatado no campus da UFU recebe todos os cuidados antes de ir para um novo lar. Adote com responsabilidade!
            </p>
          </div>
        </div>

        <SecaoAnimais />
      </main>
      <Footer />
    </div>
  );
}
