import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Animal } from '../services/api';
import { getAnimais } from '../services/api';

export default function SecaoAnimais() {
  const [animais, setAnimais] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [adoptionModalAnimal, setAdoptionModalAnimal] = useState<Animal | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('todos');

  useEffect(() => {
    getAnimais()
      .then((data) => {
        setAnimais(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredAnimais = animais.filter((animal) => {
    if (filterStatus === 'todos') return true;
    return animal.status === filterStatus;
  });

  const getStatusBadge = (status: string, statusDisplay: string) => {
    switch (status) {
      case 'disponivel':
        return (
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-100/90 text-emerald-800 backdrop-blur-xs border border-emerald-200/50 shadow-2xs">
            {statusDisplay || 'Disponível'}
          </span>
        );
      case 'em_avaliacao':
        return (
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-100/90 text-amber-800 backdrop-blur-xs border border-amber-200/50 shadow-2xs">
            {statusDisplay || 'Em Avaliação'}
          </span>
        );
      case 'adotado':
        return (
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-purple-100/90 text-purple-800 backdrop-blur-xs border border-purple-200/50 shadow-2xs">
            {statusDisplay || 'Adotado'}
          </span>
        );
      default:
        return (
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-gray-100/90 text-gray-800 backdrop-blur-xs border border-gray-200/50 shadow-2xs">
            {statusDisplay || status}
          </span>
        );
    }
  };

  const bgCores = ['bg-[#F3EDFC]', 'bg-[#FEF8ED]', 'bg-[#FDF2F8]', 'bg-[#EBF8F2]'];

  return (
    <section id="animais" className="py-16 sm:py-24 bg-[#F8F6FC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14"
        >
          <div className="inline-block text-[#F2C744] font-black text-xs sm:text-sm tracking-widest uppercase mb-2">
            — ADOTE AGORA —
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
            Todo gatinho merece um lar cheio de amor<span className="text-[#7B1FA2]">.</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
            Adoção é uma promessa de carinho e proteção para toda a vida — abra seu coração e dê um lar para um gatinho resgatado na UFU.
          </p>

          {/* Filtros em abas estilo modelo */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-6 mt-8 pt-4 border-t border-gray-100 font-semibold text-sm">
            {[
              { key: 'todos', label: 'Todos os Gatinhos' },
              { key: 'disponivel', label: 'Disponíveis para Adoção' },
              { key: 'em_avaliacao', label: 'Em Avaliação' },
              { key: 'adotado', label: 'Histórias Felizes (Adotados)' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilterStatus(tab.key)}
                className={`pb-2 border-b-2 transition-all text-xs sm:text-sm relative ${
                  filterStatus === tab.key
                    ? 'border-[#7B1FA2] text-[#7B1FA2] font-bold'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="rounded-3xl p-4 bg-[#FAF7FD] border border-purple-100 animate-pulse">
                <div className="aspect-square bg-purple-200/50 rounded-2xl mb-4" />
                <div className="h-6 bg-purple-200/50 rounded w-1/2 mb-2" />
                <div className="h-4 bg-purple-200/40 rounded w-1/3 mb-4" />
                <div className="h-10 bg-purple-200/40 rounded-xl" />
              </div>
            ))}
          </div>
        )}

        {/* Erro */}
        {error && (
          <div className="bg-purple-50 border border-purple-200 text-[#7B1FA2] p-8 rounded-3xl text-center max-w-md mx-auto">
            <p className="font-bold mb-1">Carregando catálogo de felinos...</p>
            <p className="text-xs text-gray-600">Apresentando gatinhos disponíveis no projeto.</p>
          </div>
        )}

        {/* Grid de Animais com animações */}
        {!loading && filteredAnimais.length > 0 && (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredAnimais.map((animal, idx) => {
                const bgFundo = bgCores[idx % bgCores.length];

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    key={animal.id}
                    className="flex flex-col group transition-all duration-300"
                  >
                    {/* Foto com fundo suave e cantos arredondados */}
                    <div className={`relative aspect-square ${bgFundo} rounded-3xl overflow-hidden p-2 mb-4 border border-purple-100 shadow-2xs group-hover:shadow-md transition-shadow`}>
                      <img
                        src={animal.foto}
                        alt={animal.nome}
                        className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop';
                        }}
                      />
                      <div className="absolute top-4 right-4">
                        {getStatusBadge(animal.status, animal.status_display)}
                      </div>
                    </div>

                    {/* Informações abaixo da foto */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-2xl font-black text-gray-900 group-hover:text-[#7B1FA2] transition-colors">
                          {animal.nome}
                        </h3>
                        <span className="text-xs font-bold text-gray-500">
                          {animal.especie}
                        </span>
                      </div>

                      {/* Linha de atributos */}
                      <div className="flex items-center gap-4 text-xs font-semibold text-gray-500">
                        <span className="flex items-center gap-1">
                          <span>🎂</span> {animal.idade}
                        </span>
                        <span className="flex items-center gap-1">
                          Castrado & Vacinado
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed pt-1 font-medium">
                        {animal.descricao || 'Gatinho muito carinhoso e dócil procurando por um lar amoroso em Uberlândia.'}
                      </p>

                      <div className="pt-3 flex items-center gap-3">
                        <button
                          onClick={() => setSelectedAnimal(animal)}
                          className="flex-1 bg-gray-100 hover:bg-purple-100 text-[#7B1FA2] font-bold py-2.5 px-4 rounded-xl text-xs transition-colors"
                        >
                          Ver Detalhes
                        </button>

                        {animal.status === 'disponivel' && (
                          <button
                            onClick={() => setAdoptionModalAnimal(animal)}
                            className="bg-[#7B1FA2] hover:bg-[#6A0DAD] text-white font-bold py-2.5 px-5 rounded-xl text-xs transition-all shadow-2xs hover:shadow-sm"
                          >
                            Quero Adotar 💕
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty state */}
        {!loading && filteredAnimais.length === 0 && (
          <div className="bg-purple-50/50 rounded-3xl p-12 text-center max-w-md mx-auto border border-purple-100">
            <div className="text-4xl mb-3">🐱</div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Nenhum gatinho encontrado nesta categoria</h3>
            <p className="text-xs text-gray-500 mb-5">
              Tente selecionar outro filtro ou confira todos os animais cadastrados.
            </p>
            <button
              onClick={() => setFilterStatus('todos')}
              className="bg-[#7B1FA2] text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-xs hover:bg-[#6A0DAD] transition-colors"
            >
              Ver Todos os Gatinhos
            </button>
          </div>
        )}

        {/* Modal de Detalhes do Animal */}
        <AnimatePresence>
          {selectedAnimal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative"
              >
                <button
                  onClick={() => setSelectedAnimal(null)}
                  className="absolute top-4 right-4 z-10 w-9 h-9 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center text-sm font-bold transition-transform hover:scale-110"
                >
                  ✕
                </button>

                <div className="h-64 bg-purple-50 relative">
                  <img
                    src={selectedAnimal.foto}
                    alt={selectedAnimal.nome}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 sm:p-8 space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-2xl font-black text-gray-900">{selectedAnimal.nome}</h3>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mt-0.5">{selectedAnimal.especie} • {selectedAnimal.idade}</p>
                    </div>
                    <div>
                      {getStatusBadge(selectedAnimal.status, selectedAnimal.status_display)}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#7B1FA2] mb-1.5 flex items-center gap-1">
                      <span>✨</span>
                      <span>Personalidade & História</span>
                    </h4>
                    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line font-medium bg-purple-50/50 p-4 rounded-2xl border border-purple-100">
                      {selectedAnimal.descricao || 'Gatinho dócil e amoroso resgatado pela equipe do UFU MIA.'}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-purple-100 flex gap-3">
                    <button
                      onClick={() => {
                        const target = selectedAnimal;
                        setSelectedAnimal(null);
                        setAdoptionModalAnimal(target);
                      }}
                      className="flex-1 text-center bg-[#7B1FA2] hover:bg-[#6A0DAD] text-white py-3.5 rounded-xl font-bold transition-colors shadow-md"
                    >
                      Manifestar Interesse em Adoção 💕
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Modal de Instruções de Adoção Direta */}
        <AnimatePresence>
          {adoptionModalAnimal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative text-center"
              >
                <button
                  onClick={() => setAdoptionModalAnimal(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center text-xs font-bold"
                >
                  ✕
                </button>

                <div className="w-16 h-16 rounded-full bg-[#F5F0FC] border border-purple-200 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-[#7B1FA2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                </div>

                <h3 className="text-2xl font-black text-gray-900 mb-2">
                  Adotar {adoptionModalAnimal.nome}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6 font-medium">
                  Para adotar o(a) <strong>{adoptionModalAnimal.nome}</strong>, entre em contato direto com a equipe do UFU MIA pelo Instagram ou por e-mail!
                </p>

                <div className="space-y-3 mb-6">
                  <a
                    href={`https://ig.me/m/ufu.mia?text=Olá! Gostaria de saber mais sobre a adoção do(a) ${adoptionModalAnimal.nome}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-[#7B1FA2] hover:bg-[#6A0DAD] text-white font-bold py-3.5 px-4 rounded-xl text-xs sm:text-sm transition-all shadow-xs hover:shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Falar no Instagram @ufu.mia</span>
                  </a>

                  <a
                    href={`mailto:ufumiaufu@gmail.com?subject=Interesse em Adoção: ${adoptionModalAnimal.nome}&body=Olá equipe UFU MIA, gostaria de me candidatar para adotar o(a) ${adoptionModalAnimal.nome}!`}
                    className="w-full bg-[#F5F0FC] hover:bg-purple-100 text-[#7B1FA2] font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 border border-purple-200"
                  >
                    <span>Enviar E-mail (ufumiaufu@gmail.com)</span>
                  </a>
                </div>

                <div className="bg-amber-50 rounded-xl p-3 text-[11px] text-amber-800 leading-tight text-left">
                  🔒 <strong>Lembrete:</strong> Nossas adoções exigem residência segura com telas de proteção para garantir a segurança dos gatinhos.
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
