import { useState } from 'react';
import { motion } from 'framer-motion';

export default function SecaoFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      pergunta: 'Como posso adotar um gatinho?',
      resposta: (
        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
          Gatos mansos e filhotes são divulgados para encontrar lares responsáveis. Veja os gatinhos disponíveis na aba <strong>Animais</strong> e fale com a equipe pelo Instagram <strong>@ufu.mia</strong>, pelo e-mail <strong>ufumiaufu@gmail.com</strong> ou pela aba <strong>Fale Conosco</strong>.
        </p>
      ),
    },
    {
      pergunta: 'Como funciona o Processo Seletivo do UFU MIA?',
      resposta: (
        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
          É o caminho para ser Extensionista ou Voluntário e fazer parte da equipe. Acesse a aba <strong>Processo Seletivo</strong>, leia o edital oficial e preencha o formulário de inscrição.
        </p>
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
      pergunta: 'Com qual idade o gatinho já pode ser castrado?',
      resposta: (
        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
          As fêmeas são castradas a partir de <strong>6 meses</strong> e os machos adultos também passam pela cirurgia. Os benefícios são o controle populacional e a redução do risco de câncer.
        </p>
      ),
    },
    {
      pergunta: 'Como posso oferecer Lar Temporário (LT)?',
      resposta: (
        <div className="space-y-2 text-xs sm:text-sm text-gray-700 leading-relaxed">
          <p>
            Após o resgate, os gatinhos precisam de um local seguro para se recuperar e esperar pelo lar definitivo. O espaço precisa ser <strong>sem rotas de fuga</strong>, separado de outros bichinhos e com disponibilidade para oferecer carinho e atenção.
          </p>
          <p>
            Oferecemos suporte completo e acompanhamento constante: medicamentos, caixinha de areia e areia, e ração. Fale com a equipe pela aba <strong>Fale Conosco</strong>.
          </p>
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
    {
      pergunta: 'Por que o projeto existe?',
      resposta: (
        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
          Mais de 50 gatos foram encontrados abandonados no Campus Santa Mônica, muitos doentes, presos em telhados e sem cuidados adequados. O projeto cuida da saúde e alimenta os gatos, faz castrações para o controle populacional e promove a adoção responsável.
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
          viewport={{ once: true, amount: 0.1 }}
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
