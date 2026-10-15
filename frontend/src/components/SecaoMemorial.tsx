import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getMemorial, type GatoMemorial } from '../services/api';

export default function SecaoMemorial() {
    const [gatos, setGatos] = useState<GatoMemorial[]>([]);

    useEffect(() => {
        let ativo = true;
        getMemorial()
            .then((dados) => {
                if (ativo) setGatos(dados);
            })
            .catch(() => {
                /* sem memorial, a seção simplesmente não aparece */
            });
        return () => {
            ativo = false;
        };
    }, []);

    if (gatos.length === 0) return null;

    return (
        <section className="py-16 sm:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-2xl mx-auto mb-10"
                >
                    <div className="selo-secao mb-3">EM MEMÓRIA</div>
                    <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight">
                        Para sempre no nosso coração
                    </h2>
                    <p className="mt-3 text-sm sm:text-base text-gray-600">
                        Gatinhos que passaram pelo UFU MIA e deixaram saudade. 🕊️💜
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gatos.map((g, idx) => (
                        <motion.article
                            key={g.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 0.5, delay: (idx % 3) * 0.08 }}
                            className="bg-white/80 border border-purple-100 rounded-3xl p-4 shadow-2xs"
                        >
                            <div className="relative aspect-square rounded-2xl overflow-hidden bg-purple-50">
                                <img
                                    src={g.foto}
                                    alt=""
                                    aria-hidden="true"
                                    className="absolute inset-0 w-full h-full object-cover blur-2xl scale-125 opacity-60"
                                />
                                <img
                                    src={g.foto}
                                    alt={`Foto de ${g.nome}`}
                                    loading="lazy"
                                    className="relative w-full h-full object-contain"
                                />
                            </div>

                            <div className="px-1 pt-4 space-y-3">
                                <div>
                                    <h3 className="text-2xl font-black text-gray-900">{g.nome}</h3>
                                    {g.periodo && (
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mt-0.5">
                                            {g.periodo}
                                        </p>
                                    )}
                                </div>

                                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                                    {g.descricao}
                                </p>

                                {g.texto_ex_donos && (
                                    <blockquote className="bg-[#FAF7FD] border-l-4 border-[#7B1FA2] rounded-xl p-3">
                                        <p className="text-sm text-gray-700 italic leading-relaxed whitespace-pre-line">
                                            “{g.texto_ex_donos}”
                                        </p>
                                        {g.autor_texto && (
                                            <footer className="mt-2 text-xs font-bold text-[#7B1FA2]">
                                                — {g.autor_texto}
                                            </footer>
                                        )}
                                    </blockquote>
                                )}
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}