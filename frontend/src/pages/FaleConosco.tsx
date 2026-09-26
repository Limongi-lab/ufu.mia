import Header from '../components/Header';
import Footer from '../components/Footer';
import lucyImg from '../assets/equipe/lucy.png';
import gabiImg from '../assets/equipe/gabi.png';
import luizaImg from '../assets/equipe/luiza.png';
import laraImg from '../assets/equipe/lara.png';
import juImg from '../assets/equipe/ju.png';

const contatos = [
  {
    pergunta: 'Quer ser Voluntário?',
    nome: 'Lucy',
    funcao: 'Voluntariado',
    telefone: '+55 34 9654-9358',
    wa: '553496549358',
    foto: lucyImg,
  },
  {
    pergunta: 'Quer Adotar ou ser Lar Temporário?',
    nome: 'Gabi',
    funcao: 'Adoção e Lar Temporário',
    telefone: '+55 16 99315-6561',
    wa: '5516993156561',
    foto: gabiImg,
  },
  {
    pergunta: 'Quer falar com nosso Marketing?',
    nome: 'Luiza',
    funcao: 'Marketing',
    telefone: '+55 34 9670-2802',
    wa: '553496702802',
    foto: luizaImg,
  },
  {
    pergunta: 'Dúvidas sobre Resgates?',
    nome: 'Lara',
    funcao: 'Resgates',
    telefone: '+55 34 9877-3833',
    wa: '553498773833',
    foto: laraImg,
  },
  {
    pergunta: 'Dúvida sobre nossos Eventos?',
    nome: 'Ju',
    funcao: 'Eventos',
    telefone: '+55 34 9168-8855',
    wa: '553491688855',
    foto: juImg,
  },
];

export default function FaleConosco() {
  return (
    <div className="relative z-10 min-h-screen font-sans text-gray-900 flex flex-col justify-between">
      <Header />
      <main className="py-12 sm:py-16">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-[#7B1FA2] font-black text-xs sm:text-sm tracking-widest uppercase mb-2">
              Fale Conosco
            </p>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Manda um alô para a equipe
            </h1>
            <p className="mt-3 text-sm text-gray-600">
              Escolha a pessoa certa para o assunto e fale direto pelo WhatsApp
            </p>
          </div>

          <div className="space-y-7">
            {contatos.map((pessoa) => (
              <div key={pessoa.nome}>
                <h2 className="text-center font-bold text-gray-900 mb-3">
                  {pessoa.pergunta}
                </h2>
                <a
                  href={`https://wa.me/${pessoa.wa}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 bg-white/90 hover:bg-white rounded-2xl px-4 py-3 shadow-sm border border-white/70 transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <img
                    src={pessoa.foto}
                    alt={pessoa.nome}
                    className="w-14 h-14 rounded-full object-cover shrink-0 border-2 border-[#EADFFB]"
                  />
                  <div className="min-w-0 flex-1 text-left">
                    <p className="font-bold text-gray-900">
                      Manda um alô pra {pessoa.nome}
                    </p>
                    <p className="text-xs font-semibold text-[#7B1FA2] mt-0.5">
                      {pessoa.funcao}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{pessoa.telefone}</p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
