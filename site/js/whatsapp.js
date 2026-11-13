// Monta o link "Quero este" (wa.me) com a mensagem da §5.5.
import { brl, estadoLabel } from './util.js';

export function itemUrl(item, config) {
  const base = (config.url_site || (location.origin + location.pathname)).replace(/#.*$/, '');
  return `${base}#/${item.area}/${encodeURIComponent(item.id)}`;
}

export function buildWhatsAppOrderUrl(item, area, config) {
  const emoji = area === 'livros' ? '📖' : '🛍️';
  const autor = area === 'livros' && item.autor ? ` (${item.autor})` : '';
  const preco = brl(item.preco_promo || item.preco);
  const texto = [
    'Olá, Paulo! Vi no catálogo e tenho interesse:',
    `${emoji} ${item.nome}${autor}`,
    `Estado: ${estadoLabel(item.estado)} | ${preco}`,
    itemUrl(item, config),
  ].join('\n');
  return `https://wa.me/${config.whatsapp || ''}?text=${encodeURIComponent(texto)}`;
}
