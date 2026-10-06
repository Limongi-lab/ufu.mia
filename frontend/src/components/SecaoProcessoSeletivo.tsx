import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConteudo } from '../context/ConteudoContext';
import { editalSeguro, formularioSeguro } from '../services/conteudo';

export default function SecaoProcessoSeletivo() {
  const { t } = useConteudo();
  const [activeTab, setActiveTab] = useState<'todos' | 'edital' | 'inscricao'>('todos');
  const [showDriveModal, setShowDriveModal] = useState(false);

  const edital = editalSeguro(t('ps.edital_url'));
  const editalDriveViewUrl = edital.ver;
  const editalDrivePreviewUrl = edital.previa;
  const formInscricaoUrl = formularioSeguro(t('ps.formulario_url'));

  const areasAtuacao = [
    { titulo: 'Eventos', desc: 'Organização de bazares, rifas, feirinhas, etc.' },
    { titulo: 'Marketing', desc: 'Divulgação nas redes sociais e campanhas.' },
    { titulo: 'Artes', desc: 'Criação de materiais visuais e design para divulgação.' },
    { titulo: 'Resgates', desc: 'Equipe dedicada ao mapeamento e captura dos gatos.' },
    { titulo: 'Coordenação Interna', desc: 'Gestão das equipes e organização do trabalho.' },
    { titulo: 'Gente e Gestão', desc: 'Apoio e logística para os voluntários e participantes.' },
  ];

  return (
    <section id="processo-seletivo" className="py-16 sm:py-24 relative overflow-hidden">
      {/* Elementos visuais decorativos suaves */}
      <div className="absolute -top-24 right-0 w-96 h-96 bg-[#7B1FA2]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-0 w-96 h-96 bg-[#F2C744]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho da Seção */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <div className="inline-block text-[#7B1FA2] font-black text-xs sm:text-sm tracking-widest uppercase mb-2">{t('ps.selo')}</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
            {t('ps.titulo_inicio')} <span className="text-[#7B1FA2]">{t('ps.titulo_destaque')}</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">{t('ps.texto')}</p>

          {/* Abas de Navegação Rápida */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-8 pt-4 border-t border-purple-200/60 font-semibold text-sm">
            <button
              onClick={() => setActiveTab('todos')}
              className={`px-5 py-2 rounded-full transition-all text-xs sm:text-sm font-bold ${
                activeTab === 'todos'
                  ? 'bg-[#7B1FA2] text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:text-[#7B1FA2] border border-purple-100'
              }`}
            >
              Visão Geral
            </button>
            <button
              onClick={() => setActiveTab('edital')}
              className={`px-5 py-2 rounded-full transition-all text-xs sm:text-sm font-bold flex items-center gap-1.5 ${
                activeTab === 'edital'
                  ? 'bg-[#7B1FA2] text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:text-[#7B1FA2] border border-purple-100'
              }`}
            >
              <span>Edital do Processo</span>
            </button>
            <button
              onClick={() => setActiveTab('inscricao')}
              className={`px-5 py-2 rounded-full transition-all text-xs sm:text-sm font-bold flex items-center gap-1.5 ${
                activeTab === 'inscricao'
                  ? 'bg-[#7B1FA2] text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:text-[#7B1FA2] border border-purple-100'
              }`}
            >
              <span>Formulário de Inscrição</span>
            </button>
          </div>
        </motion.div>

        {/* Grade das Duas Grandes Seções: EDITAL & FORMULÁRIO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          {/* Seção 1: EDITAL DO PROCESSO SELETIVO */}
          {(activeTab === 'todos' || activeTab === 'edital') && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5 }}
              className={`bg-[#FDFCFF] rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-sm flex flex-col justify-between ${
                activeTab === 'edital' ? 'lg:col-span-12' : 'lg:col-span-6'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#F5F0FC] text-[#7B1FA2] flex items-center justify-center shadow-2xs">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                    </div>
                    <div>
                      <span className="text-[11px] lg:text-[12px] font-black text-[#7B1FA2] uppercase tracking-wider block">
                        Documento Oficial
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-gray-900">
                        Edital de Processo Seletivo
                      </h3>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold shrink-0">
                    Disponível no Drive
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6 font-medium">{t('ps.edital_texto')}</p>

                {/* Prévia interativa do Edital (Google Drive Embed) */}
                <div className="relative rounded-2xl overflow-hidden border border-purple-200 bg-purple-50/50 mb-6 group">
                  <div className="h-64 sm:h-72 w-full relative bg-gray-100">
                    <iframe
                      src={editalDrivePreviewUrl}
                      title="Prévia do Edital UFU MIA"
                      className="w-full h-full border-0"
                      loading="lazy"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                    <button
                      onClick={() => setShowDriveModal(true)}
                      className="bg-white/95 hover:bg-white text-[#7B1FA2] px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-transform hover:scale-105"
                    >
                      Expandir Prévia do Edital
                    </button>
                  </div>
                </div>

                {/* Destaques do Edital */}
                
              </div>

              {/* Botões de Ação do Edital */}
              <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
                <a
                  href={editalDriveViewUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-[#7B1FA2] hover:bg-[#6A0DAD] text-white py-3 px-5 rounded-xl font-bold text-xs sm:text-sm text-center shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Abrir Edital Completo no Drive</span>
                  <span>↗</span>
                </a>

                <button
                  onClick={() => setShowDriveModal(true)}
                  className="bg-[#F5F0FC] hover:bg-purple-100 text-[#7B1FA2] py-3 px-4 rounded-xl font-bold text-xs transition-colors text-center"
                >
                  Visualizar aqui
                </button>
              </div>
            </motion.div>
          )}

          {/* Seção 2: INSCRIÇÃO / FORMULÁRIO DO PROCESSO SELETIVO */}
          {(activeTab === 'todos' || activeTab === 'inscricao') && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-sm flex flex-col justify-between ${
                activeTab === 'inscricao' ? 'lg:col-span-12' : 'lg:col-span-6'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#FEF8ED] text-[#B45309] flex items-center justify-center text-sm font-black shadow-2xs">
                      PS
                    </div>
                    <div>
                      <span className="text-[11px] lg:text-[12px] font-black text-[#B45309] uppercase tracking-wider block">
                        Candidatura Online
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-gray-900">
                        Formulário de Inscrição
                      </h3>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold shrink-0">
                    Google Forms
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6 font-medium">{t('ps.formulario_texto')}</p>

                {/* Passo a Passo da Inscrição */}
                <div className="bg-[#FAF7FD] rounded-2xl p-5 border border-purple-100/80 mb-6 space-y-3.5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#7B1FA2]">
                    Como funciona a seleção:
                  </h4>
                  
                  <div className="space-y-3 text-xs sm:text-sm text-gray-700">
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#7B1FA2] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        1
                      </span>
                      <p className="leading-snug">
                        <strong>Leitura do Edital:</strong> Leia o edital oficial e fique atento(a) aos prazos.
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#7B1FA2] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        2
                      </span>
                      <p className="leading-snug">
                        <strong>Envio da Inscrição:</strong> Preencha o formulário oficial do Google Forms com seus dados.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Aviso informativo */}
                <div className="bg-purple-50/70 border border-purple-200 rounded-xl p-3.5 text-xs text-[#5B107D] leading-relaxed mb-6 flex items-start gap-2.5">
                  <span className="text-base shrink-0">📌</span>
                  <span>{t('ps.aviso')}</span>
                </div>
              </div>

              {/* Botão de Ação para Inscrição */}
              <div className="pt-4 border-t border-gray-100">
                <a
                  href={formInscricaoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-[#F2C744] hover:bg-[#E0B634] text-[#18141D] py-3.5 px-6 rounded-xl font-extrabold text-sm text-center shadow-xs hover:shadow-md transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <span>Acessar Formulário do Processo Seletivo</span>
                  <span>📝 ↗</span>
                </a>
              </div>
            </motion.div>
          )}

        </div>

        {/* Áreas de Atuação dos Voluntários */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-6 sm:p-10 border border-purple-100 shadow-2xs"
        >
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold text-[#7B1FA2] uppercase tracking-wider block mb-1">
              Frentes de Atuação
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-gray-900">
              Onde você pode atuar no UFU MIA
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {areasAtuacao.map((area) => (
              <div
                key={area.titulo}
                className="bg-[#FAF7FD] rounded-2xl p-5 border border-purple-100/60 hover:border-purple-300 transition-colors"
              >
                <h4 className="text-base font-bold text-gray-900 mb-1.5">{area.titulo}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{area.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Modal de visualização expandida do Edital Drive */}
      <AnimatePresence>
        {showDriveModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-2xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-4xl w-full h-[85vh] overflow-hidden shadow-2xl flex flex-col relative"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-purple-50/50">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">📄</span>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                      Edital de Processo Seletivo UFU MIA
                    </h3>
                    <p className="text-[11px] lg:text-[12px] text-gray-500">Visualização direta do Google Drive</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={editalDriveViewUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-[#7B1FA2] hover:underline px-3 py-1.5 rounded-lg bg-white border border-purple-200"
                  >
                    Abrir no Drive ↗
                  </a>
                  <button
                    onClick={() => setShowDriveModal(false)}
                    className="w-11 h-11 md:w-8 md:h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 flex items-center justify-center text-xs font-bold"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Iframe Drive Viewer */}
              <div className="flex-1 bg-gray-100 relative">
                <iframe
                  src={editalDrivePreviewUrl}
                  title="Visualização Completa do Edital"
                  className="w-full h-full border-0"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
