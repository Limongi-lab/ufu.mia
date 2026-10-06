import { createContext, useContext } from 'react';
import { CONTEUDO_PADRAO, TEXTOS_PADRAO } from '../content/padrao';
import type { ConteudoSite } from '../services/conteudo';

type Listas = Omit<ConteudoSite, 'textos'>;

export interface ConteudoValor {
  /** Texto pela chave: o do painel se existir, senão o padrão do site. */
  t: (chave: string) => string;
  /** Listas (FAQ, frentes, contatos...): as do painel se a API respondeu, senão as padrão. */
  listas: Listas;
}

export const ConteudoContext = createContext<ConteudoValor>({
  t: (chave) => TEXTOS_PADRAO[chave] ?? '',
  listas: CONTEUDO_PADRAO,
});

export const useConteudo = () => useContext(ConteudoContext);
