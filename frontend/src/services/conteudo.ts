export interface Link {
  titulo: string;
  descricao: string;
  link_texto: string;
  link_url: string;
}

export interface PessoaEquipe {
  nome: string;
  telefone: string;
  whatsapp: string;
  foto: string | null;
}

export interface AreaContato {
  funcao: string;
  pergunta: string;
  pessoas: PessoaEquipe[];
}

export interface ConteudoSite {
  textos: Record<string, string>;
  pontos_sobre: { titulo: string; descricao: string }[];
  frentes: Link[];
  formas_de_ajudar: Link[];
  faq: { pergunta: string; resposta: string }[];
  estatisticas: { numero: number; prefixo: string; sufixo: string; titulo: string }[];
  contatos: AreaContato[];
}

import { TEXTOS_PADRAO } from '../content/padrao';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

/** Busca todo o conteúdo editável. Falha em silêncio: o site usa os textos padrão. */
export async function getConteudo(): Promise<ConteudoSite | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000);
  try {
    const response = await fetch(`${API_URL}/conteudo/`, { signal: controller.signal });
    if (!response.ok) return null;
    const data = await response.json();
    if (!data || typeof data.textos !== 'object') return null;
    return data as ConteudoSite;
  } catch {
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Só aceita endereços seguros vindos do painel: caminhos do próprio site (/animais)
 * ou links https://. Qualquer outra coisa (javascript:, data:...) vira "#".
 */
export function linkSeguro(url: string | undefined | null): string {
  if (!url) return '#';
  if (url.startsWith('/') && !url.startsWith('//')) return url;
  if (url.toLowerCase().startsWith('https://')) return url;
  return '#';
}

export const ehLinkInterno = (url: string) => url.startsWith('/') && !url.startsWith('//');

const RE_EDITAL = /^https:\/\/drive\.google\.com\/file\/d\/[\w-]+\/(view|preview)(\?[\w=&%.-]*)?$/;
const RE_FORM = /^https:\/\/(docs\.google\.com\/forms\/[\w\-/.?=&%]+|forms\.gle\/[\w-]+)$/;

/** Edital: só aceita link de arquivo do Google Drive (também usado no iframe). */
export function editalSeguro(url: string): { ver: string; previa: string } {
  const ok = RE_EDITAL.test(url) ? url : TEXTOS_PADRAO['ps.edital_url'];
  const ver = ok.replace(/\/preview(\?.*)?$/, '/view');
  return { ver, previa: ver.replace(/\/view(\?.*)?$/, '/preview') };
}

/** Formulário de inscrição: só Google Forms. */
export function formularioSeguro(url: string): string {
  return RE_FORM.test(url) ? url : TEXTOS_PADRAO['ps.formulario_url'];
}

/**
 * Endereço do painel da equipe (VITE_ADMIN_URL). Se não estiver configurado, o
 * botão escondido do rodapé nem aparece. Só aceita https:// (ou localhost em desenvolvimento).
 */
export const URL_ADMIN: string = (() => {
  const bruto = (import.meta.env.VITE_ADMIN_URL as string | undefined)?.trim() ?? '';
  if (bruto.toLowerCase().startsWith('https://')) return bruto;
  if (import.meta.env.DEV && /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?\//.test(bruto)) return bruto;
  return '';
})();
