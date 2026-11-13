// Monta a legenda para o WhatsApp (§6).
import { brl, estadoLabel, norm } from '../util.js';
import { itemUrl } from '../whatsapp.js';

/** "R$ 59,90" ou, com promoção, "de R$ 69,90 por R$ 59,90". */
export function formatPrice(item) {
  return item.preco_promo ? `de ${brl(item.preco)} por ${brl(item.preco_promo)}` : brl(item.preco);
}

/** Corta em palavra inteira e termina com "…" quando passa do limite. */
export function shortText(text, max = 140) {
  const t = String(text || '').replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const space = cut.lastIndexOf(' ');
  return (space > max * 0.5 ? cut.slice(0, space) : cut).replace(/[\s.,;:!?-]+$/, '') + '…';
}

/** Junta blocos; linhas sem valor somem e não sobram linhas vazias duplicadas. */
const compose = blocks => blocks
  .map(lines => lines.filter(Boolean).join('\n'))
  .filter(Boolean)
  .join('\n\n');

export function buildCaption(item, area, config) {
  const link = itemUrl(item, config);
  const desc = shortText(item.descricao);
  const estado = item.estado ? `📦 Estado: ${estadoLabel(item.estado)}` : '';
  if (area === 'livros') {
    return compose([
      [`📖 ${item.nome}`, item.autor && `✍️ ${item.autor}`, estado, `💰 ${formatPrice(item)}`],
      [desc],
      ['Veja este e outros livros no catálogo:', link],
      ['Interessou? Me chama no privado. 🙏'],
    ]);
  }
  return compose([
    [`🛍️ ${item.nome}`, estado, `💰 ${formatPrice(item)}`],
    [desc],
    ['Veja mais produtos:', link],
    ['Interessou? Me chama no privado.'],
  ]);
}

/** Texto curto do "Indicar a um amigo" (cliente). */
export function buildReferral(item, area, config) {
  const emoji = area === 'livros' ? '📖' : '🛍️';
  return `Olha o que achei no catálogo: ${emoji} ${item.nome} (${formatPrice(item)})\n${itemUrl(item, config)}`;
}

/** Nome de arquivo legível: "conselheiros-capazes-status.png". */
export function fileName(item, format) {
  let slug = norm(item.nome).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  if (slug.length > 50) slug = slug.slice(0, 50).replace(/-[^-]*$/, '');
  return `${slug || item.id}-${format}.png`;
}
