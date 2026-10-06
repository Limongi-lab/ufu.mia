import { Fragment } from 'react';

/**
 * Mostra texto do painel de forma segura (sem HTML):
 *  - **assim** vira negrito
 *  - Enter quebra a linha; linha em branco separa parágrafos (se `paragrafos`).
 */
function Linha({ texto }: { texto: string }) {
  const partes = texto.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {partes.map((p, i) =>
        p.startsWith('**') && p.endsWith('**') && p.length > 4 ? (
          <strong key={i}>{p.slice(2, -2)}</strong>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  );
}

export function Quebras({ texto }: { texto: string }) {
  const linhas = texto.split('\n');
  return (
    <>
      {linhas.map((l, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          <Linha texto={l} />
        </Fragment>
      ))}
    </>
  );
}

export function Paragrafos({ texto, className }: { texto: string; className?: string }) {
  return (
    <>
      {texto
        .split(/\n\s*\n/)
        .filter((p) => p.trim())
        .map((p, i) => (
          <p key={i} className={className}>
            <Quebras texto={p.trim()} />
          </p>
        ))}
    </>
  );
}

export default Quebras;
