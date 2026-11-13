// Modo vendedor (§5.7): ativa com ?vendedor=<codigo> no hash ou na URL; selo para desativar.
// Não é segurança: só mantém a tela do cliente limpa.
import { SELLER_CODE } from './config.js';

const KEY = 'seller';

export function isSeller() {
  try { return localStorage.getItem(KEY) === '1'; } catch { return false; }
}

function setSeller(on) {
  try { on ? localStorage.setItem(KEY, '1') : localStorage.removeItem(KEY); } catch { /* armazenamento bloqueado */ }
}

/** Lê ?vendedor= do hash (#/?vendedor=...) ou da URL, grava e limpa o código da barra de endereço. */
export function checkSellerParam() {
  const [path, query = ''] = location.hash.split('?');
  const hp = new URLSearchParams(query), sp = new URLSearchParams(location.search);
  const code = hp.get('vendedor') ?? sp.get('vendedor');
  if (code === null) return;
  if (code === SELLER_CODE) setSeller(true);
  hp.delete('vendedor'); sp.delete('vendedor');
  const qs = sp.toString(), hq = hp.toString();
  history.replaceState(null, '', `${location.pathname}${qs ? '?' + qs : ''}${path || '#/'}${hq ? '?' + hq : ''}`);
}

/** Mostra ou esconde o selo "Modo vendedor". */
export function renderSellerBadge() {
  let b = document.getElementById('seller-badge');
  if (!isSeller()) { b?.remove(); return; }
  if (b) return;
  b = document.createElement('button');
  b.id = 'seller-badge';
  b.type = 'button';
  b.className = 'seller-badge';
  b.title = 'Toque para sair do modo vendedor';
  b.textContent = 'Modo vendedor ✕';
  b.addEventListener('click', () => {
    if (!confirm('Sair do modo vendedor? Os botões de arte vão sumir.')) return;
    setSeller(false);
    b.remove();
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  });
  document.body.appendChild(b);
}
