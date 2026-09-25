export interface Animal {
  id: number;
  nome: string;
  especie: string;
  idade: string;
  foto: string;
  status: string;
  status_display: string;
  descricao: string;
  criado_em?: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export async function getAnimais(): Promise<Animal[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const response = await fetch(`${API_URL}/animais/`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      return [];
    }
    const data = await response.json();
    if (Array.isArray(data)) {
      return data;
    }
    return [];
  } catch {
    return [];
  }
}

