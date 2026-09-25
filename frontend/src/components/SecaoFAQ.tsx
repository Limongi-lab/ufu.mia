import { useState } from 'react';
import { motion } from 'framer-motion';

export default function SecaoFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      pergunta: 'Como funciona o processo de adoção responsável?',
      resposta: (
        <div className="space-y-2 text-xs sm:text-sm text-gray-700 leading-relaxed">
          <p>O processo de adoção inclui:</p>
          <ol className="list-decimal list-inside space-y-1.5 bg-[#FAF7FD] p-3.5 rounded-xl border border-purple-100">
            <li>Manifestação de interesse pelo perfil do gatinho ou pelo Instagram @ufu.mia;</li>
            <li>Entrevista sobre segurança da residência (obrigatoriedade de telas de proteção);</li>
            <li>Assinatura do Termo Oficial de Adoção Responsável;</li>
            <li>Acompanhamento carinhoso e suporte na adaptação do gatinho.</li>
          </ol>
        </div>
      ),
    },
    {
      pergunta: 'Como funciona o Processo Seletivo do UFU MIA?',
      resposta: (
        <div className="space-y-2 text-xs sm:text-sm text-gray-700 leading-relaxed">
          <p>
            O Processo Seletivo é voltado para estudantes e voluntários interessados em integrar as frentes de manejo felino, resgate ético, mídias sociais e eventos de adoção.
          </p>
          <p>
            Basta acessar a aba <strong>Processo Seletivo</strong>, ler o edital oficial no Google Drive e preencher o formulário de inscrição online dentro do prazo estabelecido.
          </p>
        </div>
      ),
    },
    {
      pergunta: 'Vocês fazem resgate fora da UFU?',
      resposta: (
        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
          Nossa atuação prioritária ocorre nos espaços da <strong>Universidade Federal de Uberlândia (UFU)</strong>. Para ocorrências fora da universidade, orientamos os cidadãos e articulamos apoio com a rede de protetores independentes de Uberlândia conforme disponibilidade.
        </p>
      ),
    },
    {
      pergunta: 'Com qual idade o gatinho já pode ser castrado?',
      resposta: (
        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
          A partir dos <strong>4 a 6 meses de idade</strong>, após criteriosa avaliação clínica veterinária de peso, desenvolvimento e condições gerais de saúde.
        </p>
      ),
    },
    {
      pergunta: 'Como posso oferecer Lar Temporário (LT) ou ser voluntário?',
      resposta: (
        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
          O Lar Temporário (LT) é fundamental para abrigar filhotinhos ou animais pós-cirúrgicos até que encontrem lares definitivos. Entre em contato diretamente pelo Instagram <strong>@ufu.mia</strong> ou envie uma mensagem para <strong>ufumiaufu@gmail.com</strong>.
        </p>
      ),
    },
  ];

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#F8F6FC] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block text-[#F2C744] font-black text-xs sm:text-sm tracking-widest uppercase mb-2">
            — TIRE SUAS DÚVIDAS —
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Perguntas Frequentes<span className="text-[#7B1FA2]">.</span>
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Respostas sobre adoção responsável, processo seletivo e atuação do projeto UFU MIA.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={faq.pergunta}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
                  isOpen ? 'border-[#7B1FA2] bg-white shadow-sm' : 'border-gray-200/80 bg-white hover:border-purple-200'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left px-6 py-5 flex justify-between items-center gap-4 focus:outline-none"
                >
                  <span className={`font-bold text-sm sm:text-base transition-colors ${isOpen ? 'text-[#7B1FA2]' : 'text-gray-900'}`}>
                    {faq.pergunta}
                  </span>
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-transform duration-200 shrink-0 ${
                      isOpen ? 'bg-[#7B1FA2] text-white rotate-180' : 'bg-[#FAF7FD] text-gray-600'
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 border-t border-purple-50 text-gray-600">
                    {faq.resposta}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
