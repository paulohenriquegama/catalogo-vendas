// Utilitários de apresentação.
export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const norm = s => String(s ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
export const brl = n => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n);
export const WA_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.2-.7-2.700-1.100-4.400-3.800-4.600-4-.1-.2-1.100-1.400-1.100-2.700s.7-1.900.9-2.200c.2-.3.500-.3.700-.3h.5c.2 0 .4 0 .6.500l.8 2c.1.2.1.3 0 .5l-.4.600c-.1.1-.3.3-.1.600.2.300.8 1.300 1.700 2.100 1.200 1 2.200 1.300 2.500 1.500.3.100.5.100.7-.1l.9-1c.2-.3.4-.2.7-.1l1.900.9c.3.1.5.2.5.3.1.2.1.8-.1 1.400z"/></svg>';
export function priceHTML(item) {
  return item.preco_promo
    ? `<span class="price"><s class="price-old">${brl(item.preco)}</s> <strong class="price-now">${brl(item.preco_promo)}</strong></span>`
    : `<span class="price"><strong class="price-now">${brl(item.preco)}</strong></span>`;
}
export const ESTADOS = { novo: 'Novo', seminovo: 'Seminovo', usado: 'Usado' };
export const estadoLabel = e => ESTADOS[norm(e)] || e;
export const ART_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 2v10.6l3.5-3.5 3 3 4.5-4.5 3 3V5H5zm4 1.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/></svg>';
export const SHARE_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 16a3 3 0 0 0-2.4 1.2L8.9 13.7a3 3 0 0 0 0-1.4l6.7-3.5A3 3 0 1 0 15 7c0 .2 0 .5.1.7L8.4 11.2a3 3 0 1 0 0 3.6l6.7 3.5-.1.7a3 3 0 1 0 3-3z"/></svg>';
