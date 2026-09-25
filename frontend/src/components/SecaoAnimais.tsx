import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Animal } from '../services/api';
import { getAnimais } from '../services/api';

export default function SecaoAnimais() {
  const [animais, setAnimais] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('todos');

  useEffect(() => {
    getAnimais()
      .then(setAnimais)
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
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
            {statusDisplay || 'Disponível'}
          </span>
        );
      case 'em_avaliacao':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
            {statusDisplay || 'Em Avaliação'}
          </span>
        );
      case 'adotado':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800">
            {statusDisplay || 'Adotado'}
          </span>
        );
      default:
        return (
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-800">
            {statusDisplay || status}
          </span>
        );
    }
  };

  const bgCores = ['bg-[#F3EDFC]', 'bg-[#FEF8ED]', 'bg-[#FDF2F8]', 'bg-[#EBF8F2]'];

  return (
    <section id="animais" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho no estilo do modelo Weblium */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
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
            <button
              onClick={() => setFilterStatus('todos')}
              className={`pb-2 border-b-2 transition-colors ${
                filterStatus === 'todos'
                  ? 'border-[#7B1FA2] text-[#7B1FA2] font-bold'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              Todos os Gatinhos
            </button>
            <button
              onClick={() => setFilterStatus('disponivel')}
              className={`pb-2 border-b-2 transition-colors ${
                filterStatus === 'disponivel'
                  ? 'border-[#7B1FA2] text-[#7B1FA2] font-bold'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              Disponíveis para Adoção
            </button>
            <button
              onClick={() => setFilterStatus('em_avaliacao')}
              className={`pb-2 border-b-2 transition-colors ${
                filterStatus === 'em_avaliacao'
                  ? 'border-[#7B1FA2] text-[#7B1FA2] font-bold'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              Em Avaliação
            </button>
            <button
              onClick={() => setFilterStatus('adotado')}
              className={`pb-2 border-b-2 transition-colors ${
                filterStatus === 'adotado'
                  ? 'border-[#7B1FA2] text-[#7B1FA2] font-bold'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              Histórias Felizes (Adotados)
            </button>
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="rounded-2xl p-4 animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-2xl mb-4" />
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
                <div className="h-10 bg-gray-200 rounded-lg" />
              </div>
            ))}
          </div>
        )}

        {/* Erro */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-8 rounded-2xl text-center max-w-md mx-auto">
            <p className="font-bold mb-1">Não foi possível carregar os animais.</p>
            <p className="text-xs text-gray-600">{error}</p>
          </div>
        )}

        {/* Grid de Animais no Estilo Minimalista e Moderno do Modelo */}
        {!loading && !error && filteredAnimais.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAnimais.map((animal, idx) => {
              const bgFundo = bgCores[idx % bgCores.length];

              return (
                <div
                  key={animal.id}
                  className="flex flex-col group transition-all duration-300"
                >
                  {/* Foto com fundo pastel e cantos arredondados */}
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

                  {/* Informações abaixo da foto como no modelo */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-2xl font-black text-gray-900 group-hover:text-[#7B1FA2] transition-colors">
                        {animal.nome}
                      </h3>
                      <span className="text-xs font-bold text-gray-500">
                        {animal.especie}
                      </span>
                    </div>

                    {/* Linha de atributos com mini-ícones */}
                    <div className="flex items-center gap-4 text-xs font-semibold text-gray-500">
                      <span className="flex items-center gap-1">
                        <span>🎂</span> {animal.idade}
                      </span>
                      <span className="flex items-center gap-1">
                        <span>🐾</span> Castrado & Vacinado
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed pt-1">
                      {animal.descricao || 'Gatinho muito carinhoso e dócil procurando por um lar amoroso em Uberlândia.'}
                    </p>

                    <div className="pt-3 flex items-center gap-3">
                      <button
                        onClick={() => setSelectedAnimal(animal)}
                        className="flex-1 bg-gray-100 hover:bg-purple-100 text-[#7B1FA2] font-bold py-2.5 px-4 rounded-xl text-xs transition-colors"
                      >
                        Ver Perfil
                      </button>

                      {animal.status === 'disponivel' && (
                        <Link
                          to="/doacoes"
                          className="bg-[#7B1FA2] hover:bg-[#6A0DAD] text-white font-bold py-2.5 px-5 rounded-xl text-xs transition-colors shadow-2xs"
                        >
                          Quero Adotar 💕
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filteredAnimais.length === 0 && (
          <div className="bg-purple-50/50 rounded-3xl p-12 text-center max-w-md mx-auto border border-purple-100">
            <div className="text-4xl mb-3">🐱</div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Nenhum gatinho encontrado nesta categoria</h3>
            <p className="text-xs text-gray-500 mb-5">
              Tente selecionar outro filtro ou confira todos os animais cadastrados.
            </p>
            <button
              onClick={() => setFilterStatus('todos')}
              className="bg-[#7B1FA2] text-white px-6 py-2.5 rounded-full text-xs font-bold"
            >
              Ver Todos os Gatinhos
            </button>
          </div>
        )}

        {/* Modal de Detalhes do Animal */}
        {selectedAnimal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xs">
            <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative">
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
                    {selectedAnimal.descricao || 'Sem descrição cadastrada.'}
                  </p>
                </div>

                <div className="pt-3 border-t border-purple-100 flex gap-3">
                  <Link
                    to="/doacoes"
                    onClick={() => setSelectedAnimal(null)}
                    className="flex-1 text-center bg-[#7B1FA2] hover:bg-[#6A0DAD] text-white py-3.5 rounded-xl font-bold transition-colors shadow-md"
                  >
                    Manifestar Interesse em Adoção 💕
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
