import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-[#5B107D] via-[#7B1FA2] to-[#8C1BA8] text-white relative overflow-hidden">
      {/* Detalhes de iluminação e formas orgânicas de fundo */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-10 w-96 h-96 bg-[#F2C744]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Lado Esquerdo: Textos do Hero no estilo do novo modelo */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-block text-[#F2C744] font-black text-xs sm:text-sm tracking-widest uppercase">
              — RESGATE E ADOÇÃO UFU —
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              Dê uma patinha, <br className="hidden sm:inline" />
              Salve uma vida!
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-purple-100 font-normal max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Cuidando com carinho, saúde e afeto para garantir um futuro protegido para os gatinhos da Universidade Federal de Uberlândia.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/animais"
                className="bg-white hover:bg-purple-50 text-[#6A0DAD] font-extrabold text-sm sm:text-base px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
              >
                Adote Agora
              </Link>

              <Link
                to="/doacoes"
                className="bg-transparent hover:bg-white/10 text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-full border-2 border-white transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <span>Doe agora</span>
                <span className="text-[#F2C744]">❤️</span>
              </Link>
            </div>

          </div>

          {/* Lado Direito: Foto em Destaque do Gatinho */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-full max-w-md lg:max-w-none">
              
              {/* Moldura circular suave de fundo */}
              <div className="absolute inset-0 bg-[#F2C744]/20 rounded-full transform scale-95 blur-xl pointer-events-none" />

              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 bg-purple-900/30">
                <img
                  src="https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=900&auto=format&fit=crop"
                  alt="Gatinho fofo resgatado UFU MIA"
                  className="w-full h-80 sm:h-96 lg:h-[420px] object-cover object-center transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 text-white">
                  <span className="text-xs uppercase tracking-wider text-[#F2C744] font-bold block">UFU MIA • Uberlândia</span>
                  <span className="text-sm font-semibold">Transformando abandono em novas histórias de amor 💕</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
