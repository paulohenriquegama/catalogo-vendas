// Listagem de uma área com busca, chips de categoria e grade de cards (§5.2).
import { AREAS, areaHeader } from '../layout.js';
import { esc, norm, priceHTML, estadoLabel, ART_ICON } from '../util.js';
import { isSeller } from '../seller.js';
import { shareItem } from '../share/share.js';

function coverHTML(item) {
  return `<img src="${esc(item.imagem)}" alt="${esc(item.nome)}" loading="lazy">`;
}

export function attachCoverFallback(root, area) {
  root.querySelectorAll('img[data-cover]').forEach(img => {
    img.addEventListener('error', () => {
      const d = document.createElement('div');
      d.className = 'cover-fallback';
      d.textContent = AREAS[area].title;
      img.replaceWith(d);
    }, { once: true });
  });
}

export function cardHTML(item) {
  const sub = item.autor ? `<p class="card-sub">${esc(item.autor)}</p>` : (item.marca_produto ? `<p class="card-sub">${esc(item.marca_produto)}</p>` : '');
  return `<a class="card" href="#/${item.area}/${encodeURIComponent(item.id)}">
    <div class="card-cover ratio-${item.area}">${item.imagem ? coverHTML(item).replace('<img ', '<img data-cover ') : '<div class="cover-fallback">' + AREAS[item.area].title + '</div>'}</div>
    <div class="card-body">
      <h3 class="card-title">${esc(item.nome)}</h3>${sub}
      <div class="card-meta"><span class="badge">${esc(estadoLabel(item.estado))}</span>${item.destaque ? '<span class="badge badge-star">Destaque</span>' : ''}</div>
      ${priceHTML(item)}
    </div></a>`;
}

export function renderList(root, { area, params, catalog }) {
  const a = AREAS[area];
  const items = catalog[area];
  const cats = catalog.categorias[area];
  const state = { q: params.get('q') || '', cat: params.get('cat') || '' };

  root.innerHTML = `${areaHeader(area)}
    <div class="container list-page">
      <h1 class="area-title">${esc(a.title)}</h1>
      <div class="search"><label class="sr-only" for="q">Buscar</label>
        <input id="q" type="search" placeholder="${area === 'livros' ? 'Buscar por título, autor ou categoria' : 'Buscar por nome, marca ou categoria'}" value="${esc(state.q)}" autocomplete="off"></div>
      <div class="chips" id="chips" role="group" aria-label="Categorias"></div>
      <p class="result-count" id="count" aria-live="polite"></p>
      <div class="grid" id="grid"></div>
      <div class="empty" id="empty" hidden>
        <p>Nada encontrado para essa busca.</p>
        <button class="btn btn-secondary" id="clear" type="button">Limpar busca e filtros</button>
      </div>
      ${catalog.error ? '<p class="notice">Não foi possível carregar o catálogo agora. Tente de novo em instantes.</p>' : ''}
    </div>`;

  const $ = s => root.querySelector(s);
  const grid = $('#grid'), chips = $('#chips');
  const seller = isSeller();
  grid.addEventListener('click', e => {
    const b = e.target.closest('[data-share-id]'); if (!b) return;
    const item = items.find(i => i.id === b.dataset.shareId);
    if (item) shareItem(item, area, 'status', catalog.config);
  });

  function syncURL(push) {
    const p = new URLSearchParams();
    if (state.q) p.set('q', state.q);
    if (state.cat) p.set('cat', state.cat);
    const qs = p.toString();
    const url = `#/${area}${qs ? '?' + qs : ''}`;
    if (url !== location.hash) history[push ? 'pushState' : 'replaceState'](null, '', url);
    window.dispatchEvent(new Event('urlsync'));
  }

  function draw() {
    chips.innerHTML = ['', ...cats].map(c =>
      `<button type="button" class="chip" data-cat="${esc(c)}" aria-pressed="${c === state.cat}">${c ? esc(c) : 'Todas'}</button>`).join('');
    const q = norm(state.q);
    const list = items.filter(i =>
      (!state.cat || i.categoria === state.cat) &&
      (!q || norm([i.nome, i.autor, i.marca_produto, i.categoria].join(' ')).includes(q)));
    grid.innerHTML = seller
      ? list.map(i => `<div class="card-wrap">${cardHTML(i)}<button type="button" class="card-share" data-share-id="${esc(i.id)}" aria-label="Gerar arte de ${esc(i.nome)}" title="Gerar arte para o WhatsApp">${ART_ICON}</button></div>`).join('')
      : list.map(cardHTML).join('');
    attachCoverFallback(grid, area);
    $('#count').textContent = `${list.length} ${list.length === 1 ? 'item' : 'itens'}`;
    $('#empty').hidden = list.length > 0;
  }

  $('#q').addEventListener('input', e => { state.q = e.target.value; syncURL(false); draw(); });
  chips.addEventListener('click', e => {
    const b = e.target.closest('.chip'); if (!b) return;
    state.cat = b.dataset.cat; syncURL(true); draw();
  });
  $('#clear').addEventListener('click', () => { state.q = ''; state.cat = ''; $('#q').value = ''; syncURL(true); draw(); });
  draw();
}
