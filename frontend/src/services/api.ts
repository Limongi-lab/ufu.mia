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
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3500);

  try {
    const response = await fetch(`${API_URL}/animais/`, {
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error(`Erro ${response.status} ao buscar os animais`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } finally {
    clearTimeout(timeoutId);
  }
}
