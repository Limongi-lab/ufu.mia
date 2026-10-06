import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { CONTEUDO_PADRAO, TEXTOS_PADRAO } from '../content/padrao';
import { getConteudo, type ConteudoSite } from '../services/conteudo';
import { ConteudoContext, type ConteudoValor } from './ConteudoContext';

export default function ConteudoProvider({ children }: { children: ReactNode }) {
  const [dados, setDados] = useState<ConteudoSite | null>(null);

  useEffect(() => {
    let ativo = true;
    getConteudo().then((resultado) => {
      if (ativo) setDados(resultado);
    });
    return () => {
      ativo = false;
    };
  }, []);

  const valor = useMemo<ConteudoValor>(() => {
    const textos = dados?.textos ?? {};
    const { textos: _ignorado, ...listas } = dados ?? { ...CONTEUDO_PADRAO, textos: {} };
    void _ignorado;
    return {
      t: (chave) => (textos[chave]?.trim() ? textos[chave] : TEXTOS_PADRAO[chave] ?? ''),
      listas: dados ? listas : CONTEUDO_PADRAO,
    };
  }, [dados]);

  return <ConteudoContext.Provider value={valor}>{children}</ConteudoContext.Provider>;
}
