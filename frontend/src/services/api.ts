export interface Animal {
  id: number;
  nome: string;
  especie: string;
  idade: string;
  foto: string;
  status: string;
  status_display: string;
  descricao: string;
  criado_em: string;
}

const API_URL = import.meta.env.VITE_API_URL;

export async function getAnimais(): Promise<Animal[]> {
  const response = await fetch(`${API_URL}/animais/`);
  if (!response.ok) {
    throw new Error('Falha ao buscar animais');
  }
  return response.json();
}
