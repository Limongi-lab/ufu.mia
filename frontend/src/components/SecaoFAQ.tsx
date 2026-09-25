import { useState } from 'react';

export default function SecaoFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      pergunta: 'Onde denunciar maus-tratos em Uberlândia?',
      resposta: (
        <div className="space-y-2 text-xs sm:text-sm text-gray-700 leading-relaxed">
          <p>Em Uberlândia, MG, é possível denunciar maus-tratos a animais diretamente para:</p>
          <ul className="list-disc list-inside space-y-1 bg-gray-50 p-3 rounded-lg border border-gray-200">
            <li><strong>Polícia Militar:</strong> 190</li>
            <li><strong>Disque Denúncia:</strong> 181</li>
            <li><strong>Serviço de Informação Municipal (SIM):</strong> (34) 3239-2800</li>
            <li><strong>Fiscalização Ambiental:</strong> 0800 940 1133 ou 3235-3117</li>
            <li><strong>Patrulha Ambiental:</strong> 0800 940 1133 ou 3235-3117</li>
          </ul>
          <p className="text-xs text-gray-500">É possível denunciar anonimamente. Registre fotos e vídeos como provas quando for seguro.</p>
        </div>
      ),
    },
    {
      pergunta: 'Como funciona o processo de adoção responsável?',
      resposta: (
        <div className="space-y-2 text-xs sm:text-sm text-gray-700 leading-relaxed">
          <p>O processo de adoção inclui:</p>
          <ol className="list-decimal list-inside space-y-1 bg-gray-50 p-3 rounded-lg border border-gray-200">
            <li>Manifestação de interesse pelo site ou nas feiras de adoção;</li>
            <li>Entrevista sobre segurança da casa (ex: telas de proteção);</li>
            <li>Assinatura do Termo de Adoção Responsável;</li>
            <li>Acompanhamento carinhoso da adaptação do gatinho.</li>
          </ol>
        </div>
      ),
    },
    {
      pergunta: 'Vocês fazem resgate fora da UFU?',
      resposta: (
        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
          Nossa atuação prioritária ocorre nos <strong>campi da UFU</strong> (Santa Mônica, Umuarama, Glória). Para animais fora dos campi, orientamos e articulamos com a rede de protetores de Uberlândia de acordo com a disponibilidade de lares temporários.
        </p>
      ),
    },
    {
      pergunta: 'Com qual idade o gatinho já pode ser castrado?',
      resposta: (
        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
          A partir dos <strong>4 a 6 meses de idade</strong>, após a avaliação clínica veterinária de peso e condições gerais de saúde.
        </p>
      ),
    },
    {
      pergunta: 'Como posso oferecer Lar Temporário (LT) ou ser voluntário?',
      resposta: (
        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
          O Lar Temporário é indispensável para acolher filhotes ou animais pós-cirúrgicos até a adoção definitiva. O projeto UFU MIA fornece ração e remédios! Entre em contato pelo Instagram <strong>@ufu.mia</strong> ou e-mail <strong>ufumiaufu@gmail.com</strong>.
        </p>
      ),
    },
  ];

  return (
    <section id="faq" className="py-14 sm:py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#7B1FA2] tracking-tight">
            Perguntas Frequentes
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            Tire suas dúvidas sobre adoção, resgates e atuação do UFU MIA.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.pergunta}
                className={`border rounded-xl overflow-hidden transition-colors ${
                  isOpen ? 'border-[#E9537A] bg-white shadow-2xs' : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left px-5 py-4 flex justify-between items-center gap-4 focus:outline-none"
                >
                  <span className={`font-bold text-sm sm:text-base ${isOpen ? 'text-[#7B1FA2]' : 'text-gray-800'}`}>
                    {faq.pergunta}
                  </span>
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-transform duration-200 shrink-0 ${
                      isOpen ? 'bg-[#E9537A] text-white rotate-180' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 border-t border-gray-100">
                    {faq.resposta}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
