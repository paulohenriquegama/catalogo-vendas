// Detalhe do item (§5.4) e "Quero este" (§5.5).
import { AREAS, areaHeader } from '../layout.js';
import { esc, priceHTML, estadoLabel, WA_ICON } from '../util.js';
import { buildWhatsAppOrderUrl } from '../whatsapp.js';
import { cardHTML, attachCoverFallback } from './list.js';
import { isSeller } from '../seller.js';
import { attachZoom } from '../zoom.js';
import { shareItem, shareReferral } from '../share/share.js';
import { ART_ICON, SHARE_ICON } from '../util.js';

export { buildWhatsAppOrderUrl };

export function renderDetail(root, { area, id, catalog }) {
  const a = AREAS[area];
  const item = catalog[area].find(i => i.id === id);
  if (!item) {
    root.innerHTML = `${areaHeader(area)}
      <div class="container not-found">
        <h1 class="area-title">Item não encontrado</h1>
        <p class="muted">Esse item pode ter saído do catálogo ou o link está incompleto.</p>
        <a class="btn btn-primary" href="#/${area}">Ver o catálogo de ${esc(a.title)}</a>
      </div>`;
    return;
  }
  const cfg = catalog.config;
  const mesmos = catalog[area].filter(i => i.id !== id && i.categoria === item.categoria);
  const outros = catalog[area].filter(i => i.id !== id && i.categoria !== item.categoria);
  const veja = [...mesmos, ...outros].slice(0, 4);
  const linhas = [
    item.autor && `<p class="detail-sub">${esc(item.autor)}${item.editora ? ' · ' + esc(item.editora) : ''}</p>`,
    item.marca_produto && `<p class="detail-sub">${esc(item.marca_produto)}</p>`,
  ].filter(Boolean).join('');

  root.innerHTML = `${areaHeader(area)}
    <div class="container detail">
      <a class="crumb" href="#/${area}">← ${esc(a.title)}</a>
      <div class="detail-grid">
        <div class="detail-cover ratio-${area}">${item.imagem ? `<img data-cover src="${esc(item.imagem)}" alt="${esc(item.nome)}">` : `<div class="cover-fallback">${esc(a.title)}</div>`}</div>
        <div class="detail-info">
          <h1>${esc(item.nome)}</h1>${linhas}
          <p><span class="badge">${esc(estadoLabel(item.estado))}</span> ${item.categoria ? `<span class="badge">${esc(item.categoria)}</span>` : ''}</p>
          <p class="detail-price">${priceHTML(item)}</p>
          ${item.descricao ? `<p class="detail-desc">${esc(item.descricao)}</p>` : ''}
          ${item.variacoes ? `<p class="muted"><strong>Opções:</strong> ${esc(item.variacoes)}</p>` : ''}
          <a class="btn btn-primary btn-block" id="want" href="${buildWhatsAppOrderUrl(item, area, cfg)}" target="_blank" rel="noopener">${WA_ICON} Quero este</a>
          <div id="seller-actions" class="seller-actions">${isSeller() ? `<button type="button" class="btn btn-primary" data-art="status">${ART_ICON} Postar no Status</button><button type="button" class="btn btn-secondary" data-art="group">${ART_ICON} Enviar para grupo</button>` : ''}<button type="button" class="btn btn-secondary btn-block" data-referral>${SHARE_ICON} Indicar a um amigo</button></div>
          ${cfg.texto_entrega || cfg.texto_pagamento || cfg.endereco_retirada ? `<ul class="info-list">
            ${cfg.texto_entrega ? `<li><strong>Entrega:</strong> ${esc(cfg.texto_entrega)}</li>` : ''}
            ${cfg.endereco_retirada ? `<li><strong>Retirada:</strong> ${esc(cfg.endereco_retirada)}${/^https:\/\//.test(cfg.url_mapa || '') ? ` · <a href="${esc(cfg.url_mapa)}" target="_blank" rel="noopener">Ver no mapa</a>` : ''}</li>` : ''}
            ${cfg.texto_pagamento ? `<li><strong>Pagamento:</strong> ${esc(cfg.texto_pagamento)}</li>` : ''}</ul>` : ''}
        </div>
      </div>
      ${veja.length ? `<section class="related"><h2>Veja também</h2><div class="grid" id="rel">${veja.map(cardHTML).join('')}</div>
        <p><a class="btn btn-secondary" href="#/${area}">Ver o catálogo inteiro</a></p></section>` : `<p><a class="btn btn-secondary" href="#/${area}">Ver o catálogo inteiro</a></p>`}
    </div>`;
  attachCoverFallback(root, area);
  attachZoom(root.querySelector('.detail-cover'));
  root.querySelector('#seller-actions').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.art) shareItem(item, area, b.dataset.art, cfg);
    else if (b.hasAttribute('data-referral')) shareReferral(item, area, cfg);
  });
}
