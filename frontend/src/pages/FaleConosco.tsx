import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useConteudo } from '../context/ConteudoContext';
import lucyImg from '../assets/equipe/lucy.png';
import gabiImg from '../assets/equipe/gabi.png';
import luizaImg from '../assets/equipe/luiza.png';
import laraImg from '../assets/equipe/lara.png';
import juImg from '../assets/equipe/ju.png';

// Fotos que já estão no site: usadas enquanto a pessoa não tiver foto enviada pelo painel
const FOTOS_LOCAIS: Record<string, string> = {
  gabriela: gabiImg,
  lucy: lucyImg,
  lara: laraImg,
  luiza: luizaImg,
  julia: juImg,
};

const semAcento = (texto: string) =>
  texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

type Pessoa = {
  nome: string;
  telefone: string;
  whatsapp: string;
  foto: string | null;
};

// Enquanto a pessoa não tem foto, mostra as iniciais num círculo roxo
function Avatar({ pessoa }: { pessoa: Pessoa }) {
  const base =
    'w-16 h-16 rounded-full shrink-0 border-2 border-[#EADFFB] shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3';

  const foto = pessoa.foto || FOTOS_LOCAIS[semAcento(pessoa.nome)];

  if (foto) {
    return <img src={foto} alt={pessoa.nome} className={`${base} object-cover`} />;
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
  const { t, listas } = useConteudo();
  const grupos = listas.contatos;
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
            <p className="text-[#7B1FA2] font-black text-xs sm:text-sm tracking-widest uppercase mb-2">{t('fale.selo')}</p>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">{t('fale.titulo')}</h1>
            <p className="mt-3 text-sm text-gray-700">{t('fale.subtitulo')}</p>
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
                      href={`https://wa.me/${encodeURIComponent(pessoa.whatsapp)}`}
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
