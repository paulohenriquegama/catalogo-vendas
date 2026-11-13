// Inicialização e roteador por hash:
// #/, #/livros, #/produtos, #/livros/<id>, #/produtos/<id>  (lista aceita ?q=...&cat=...)
import { loadCatalog } from './data.js';
import { renderHome } from './views/home.js';
import { renderList } from './views/list.js';
import { renderDetail } from './views/detail.js';
import { AREAS } from './layout.js';
import { checkSellerParam, renderSellerBadge } from './seller.js';

let catalog = null;
const scrolls = new Map(); // posição de rolagem por hash
let lastKey = null;

function parseHash() {
  const [path, query = ''] = location.hash.replace(/^#\/?/, '').split('?');
  const [area, id] = path.split('/');
  return { area, id: id ? decodeURIComponent(id) : '', params: new URLSearchParams(query) };
}

function route() {
  const root = document.getElementById('app');
  checkSellerParam();
  renderSellerBadge();
  if (lastKey !== null) scrolls.set(lastKey, window.scrollY);
  const { area, id, params } = parseHash();
  if (AREAS[area]) {
    document.body.dataset.brand = AREAS[area].brand;
    if (id) renderDetail(root, { area, id, catalog });
    else renderList(root, { area, params, catalog });
  } else {
    document.body.dataset.brand = 'home';
    renderHome(root, catalog);
  }
  lastKey = location.hash;
  window.scrollTo(0, scrolls.get(location.hash) || 0);
}

// A lista troca a URL sem navegar (busca/filtro): mantém a chave de rolagem em dia.
window.addEventListener('urlsync', () => { lastKey = location.hash; });

window.addEventListener('hashchange', route);
window.addEventListener('scroll', () => { if (lastKey !== null) scrolls.set(lastKey, window.scrollY); }, { passive: true });

loadCatalog({ onUpdate: c => { catalog = c; route(); } }).then(c => { catalog = c; route(); });

// Service worker: cache do site para abrir rápido (ver sw.js).
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js').catch(() => {}); });
}
