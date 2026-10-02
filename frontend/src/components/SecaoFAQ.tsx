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
          As fêmeas são castradas a partir de <strong>6 meses</strong> e os machos adultos também passam pela cirurgia. Os benefícios são o controle populacional e a redução do risco de câncer.
        </p>
      ),
    },
    {
      pergunta: 'Como posso oferecer Lar Temporário (LT) ou ser voluntário?',
      resposta: (
        <div className="space-y-2 text-xs sm:text-sm text-gray-700 leading-relaxed">
          <p>
            Após o resgate, os gatinhos precisam de um local seguro para se recuperar e esperar pelo lar definitivo. O espaço precisa ser <strong>sem rotas de fuga</strong>, separado de outros bichinhos e com disponibilidade para oferecer carinho e atenção.
          </p>
          <p>
            Nós damos suporte completo: medicamentos, caixinha de areia e areia, e ração. Fale com a equipe pela aba <strong>Fale Conosco</strong>, pelo Instagram <strong>@ufu.mia</strong> ou pelo e-mail <strong>ufumiaufu@gmail.com</strong>.
          </p>
        </div>
      ),
    },
    {
      pergunta: 'O que significa a sigla CCD?',
      resposta: (
        <div className="space-y-2 text-xs sm:text-sm text-gray-700 leading-relaxed">
          <p><strong>Captura:</strong> resgatamos gatos mansos, ariscos e ferais, e todos são levados ao veterinário para avaliação e cuidados.</p>
          <p><strong>Castração:</strong> fêmeas (a partir de 6 meses) e machos adultos são castrados.</p>
          <p><strong>Devolução ou Adoção:</strong> gatos ariscos retornam ao campus, mas continuam monitorados e disponíveis para adoção. Gatos mansos e filhotes são divulgados para encontrar lares responsáveis.</p>
        </div>
      ),
    },
    {
      pergunta: 'Gatos com FeLV podem passar a doença para pessoas?',
      resposta: (
        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
          Não. Gatos FeLV+ não transmitem a doença para humanos nem para outros animais, como cães. A transmissão ocorre apenas entre gatos, principalmente por contato direto prolongado. Com os cuidados certos, eles podem viver felizes e saudáveis por muitos anos.
        </p>
      ),
    },
  ];

  return (
    <section id="faq" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block text-[#7B1FA2] font-black text-xs sm:text-sm tracking-widest uppercase mb-2">
            TIRE SUAS DÚVIDAS
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Perguntas Frequentes
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
