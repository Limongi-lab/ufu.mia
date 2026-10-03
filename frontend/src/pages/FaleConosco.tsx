import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import lucyImg from '../assets/equipe/lucy.png';
import gabiImg from '../assets/equipe/gabi.png';
import luizaImg from '../assets/equipe/luiza.png';
import laraImg from '../assets/equipe/lara.png';
import juImg from '../assets/equipe/ju.png';

type Pessoa = {
  nome: string;
  telefone: string;
  wa: string;
  foto?: string;
};

type Grupo = {
  pergunta: string;
  funcao: string;
  pessoas: Pessoa[];
};

const grupos: Grupo[] = [
  {
    pergunta: 'Quer adotar, ser Lar Temporário ou tirar dúvidas gerais?',
    funcao: 'Coordenação Interna',
    pessoas: [
      { nome: 'Gabriela', telefone: '+55 16 99315-6561', wa: '5516993156561', foto: gabiImg },
      { nome: 'Leticia', telefone: '+55 16 99754-0285', wa: '5516997540285' },
    ],
  },
  {
    pergunta: 'Quer ser Voluntário ou Extensionista?',
    funcao: 'Gestão de Pessoas',
    pessoas: [{ nome: 'Lucy', telefone: '+55 34 99660-3683', wa: '5534996603683', foto: lucyImg }],
  },
  {
    pergunta: 'Dúvidas sobre Resgates?',
    funcao: 'Resgates',
    pessoas: [
      { nome: 'Ana Reis', telefone: '+55 34 99634-8547', wa: '5534996348547' },
      { nome: 'Lara', telefone: '+55 34 99877-3833', wa: '5534998773833', foto: laraImg },
    ],
  },
  {
    pergunta: 'Quer falar com nosso Marketing?',
    funcao: 'Marketing',
    pessoas: [{ nome: 'Sabrina', telefone: '+55 34 99105-9830', wa: '5534991059830' }],
  },
  {
    pergunta: 'Quer falar com a equipe de Artes?',
    funcao: 'Artes',
    pessoas: [{ nome: 'Luíza', telefone: '+55 34 99670-2802', wa: '5534996702802', foto: luizaImg }],
  },
  {
    pergunta: 'Dúvidas sobre nossos Eventos?',
    funcao: 'Eventos',
    pessoas: [{ nome: 'Ana Luiza', telefone: '+55 16 99720-0381', wa: '5516997200381' }],
  },
  {
    pergunta: 'Dúvidas sobre doações e PIX?',
    funcao: 'Financeiro',
    pessoas: [{ nome: 'Júlia', telefone: '+55 34 99659-8855', wa: '5534996598855', foto: juImg }],
  },
];

// Enquanto a pessoa não tem foto, mostra as iniciais num círculo roxo
function Avatar({ pessoa }: { pessoa: Pessoa }) {
  const base =
    'w-16 h-16 rounded-full shrink-0 border-2 border-[#EADFFB] shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3';

  if (pessoa.foto) {
    return <img src={pessoa.foto} alt={pessoa.nome} className={`${base} object-cover`} />;
  }

  const iniciais = pessoa.nome
    .split(' ')
    .map((parte) => parte[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      aria-label={pessoa.nome}
      className={`${base} bg-gradient-to-br from-[#7B1FA2] to-[#B05CD1] text-white flex items-center justify-center font-black text-lg`}
    >
      {iniciais}
    </div>
  );
}

export default function FaleConosco() {
  return (
    <div className="relative z-10 min-h-screen font-sans text-gray-900 flex flex-col justify-between">
      <Header />
      <main className="py-12 sm:py-16">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center mb-10"
          >
            <p className="text-[#7B1FA2] font-black text-xs sm:text-sm tracking-widest uppercase mb-2">
              Fale Conosco
            </p>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Manda um alô para a equipe
            </h1>
            <p className="mt-3 text-sm text-gray-700">
              Escolha a pessoa certa para o assunto e fale direto pelo WhatsApp
            </p>
          </motion.div>

          <div className="space-y-9">
            {grupos.map((grupo) => (
              <motion.section
                key={grupo.funcao}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
              >
                <h2 className="text-center font-bold text-gray-900 mb-3">{grupo.pergunta}</h2>

                <div className="space-y-3">
                  {grupo.pessoas.map((pessoa) => (
                    <a
                      key={pessoa.nome}
                      href={`https://wa.me/${pessoa.wa}`}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-4 bg-white/90 hover:bg-white rounded-2xl px-4 py-3 shadow-sm border border-white/70 transition-all hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <Avatar pessoa={pessoa} />
                      <div className="min-w-0 flex-1 text-left">
                        <p className="font-bold text-gray-900 truncate">
                          Manda um alô pra {pessoa.nome}
                        </p>
                        <p className="text-xs font-semibold text-[#7B1FA2] mt-0.5">{grupo.funcao}</p>
                        <p className="text-xs text-gray-600 mt-0.5">{pessoa.telefone}</p>
                      </div>
                      <span
                        aria-hidden
                        className="text-[#7B1FA2] text-xl font-black transition-transform duration-300 group-hover:translate-x-1.5"
                      >
                        →
                      </span>
                    </a>
                  ))}
                </div>
              </motion.section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
