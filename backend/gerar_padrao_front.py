"""Regenera frontend/src/content/padrao.ts a partir de conteudo/dados_iniciais.py.
Uso (na raiz do projeto): python backend/gerar_padrao_front.py
Só leitura de dados públicos do site; não toca em segredos."""
import json, os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__)))
from conteudo import dados_iniciais as d

J = lambda x: json.dumps(x, ensure_ascii=False, indent=2)
ts = f"""// GERADO a partir de backend/conteudo/dados_iniciais.py (python backend/gerar_padrao_front.py)
import type {{ ConteudoSite }} from '../services/conteudo';

export const TEXTOS_PADRAO: Record<string, string> = {J({c: v for c, _, _, v in d.TEXTOS})};

export const CONTEUDO_PADRAO: Omit<ConteudoSite, 'textos'> = {{
  pontos_sobre: {J([{"titulo": t, "descricao": x} for t, x in d.PONTOS_SOBRE])},
  frentes: {J([{"titulo": a, "descricao": b, "link_texto": c, "link_url": u} for a, b, c, u in d.FRENTES])},
  formas_de_ajudar: {J([{"titulo": a, "descricao": b, "link_texto": c, "link_url": u} for a, b, c, u in d.FORMAS_DE_AJUDAR])},
  faq: {J([{"pergunta": p, "resposta": r} for p, r in d.FAQ])},
  estatisticas: {J([{"numero": n, "prefixo": p, "sufixo": s, "titulo": t} for n, p, s, t in d.ESTATISTICAS])},
  contatos: {J([{"funcao": f, "pergunta": q, "pessoas": [{"nome": n, "telefone": t, "whatsapp": "".join(c for c in t if c.isdigit()), "foto": None} for n, t in ps]} for f, q, ps in d.CONTATOS])},
}};
"""
out = os.path.join(os.path.dirname(__file__), "..", "frontend", "src", "content", "padrao.ts")
open(out, "w", encoding="utf-8").write(ts)
print("ok:", out)
