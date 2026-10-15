export interface Animal {
  id: number;
  nome: string;
  especie: string;
  idade: string;
  foto: string;
  fotos?: { id: number; imagem: string }[];
  status: string;
  status_display: string;
  descricao: string;
  criado_em?: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export async function getAnimais(): Promise<Animal[]> {
  const tentativas = 3;
  let ultimoErro: unknown;

  for (let i = 0; i < tentativas; i++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 40000);
    try {
      const response = await fetch(`${API_URL}/animais/`, {
        signal: controller.signal,
      });
      if (!response.ok) {
        throw new Error(`Erro ${response.status} ao buscar os animais`);
      }
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (e) {
      ultimoErro = e;
      await new Promise((r) => setTimeout(r, 2000));
    } finally {
      clearTimeout(timeoutId);
    }
  }
  throw ultimoErro;
}
export interface GatoMemorial {
  id: number;
  nome: string;
  foto: string;
  periodo: string;
  descricao: string;
  texto_ex_donos: string;
  autor_texto: string;
}

export async function getMemorial(): Promise<GatoMemorial[]> {
  const tentativas = 3;
  let ultimoErro: unknown;

  for (let i = 0; i < tentativas; i++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 40000);
    try {
      const response = await fetch(`${API_URL}/memorial/`, {
        signal: controller.signal,
      });
      if (!response.ok) {
        throw new Error(`Erro ${response.status} ao buscar o memorial`);
      }
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (e) {
      ultimoErro = e;
      await new Promise((r) => setTimeout(r, 2000));
    } finally {
      clearTimeout(timeoutId);
    }
  }
  throw ultimoErro;
}