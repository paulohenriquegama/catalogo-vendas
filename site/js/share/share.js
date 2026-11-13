// Web Share API e alternativas (§5.6).
// A arte é gerada ao abrir o modal; o navigator.share roda direto no clique de "Compartilhar"
// (exigência do iOS), com a legenda copiada no mesmo clique, antes.
import { esc } from '../util.js';
import { renderArt } from './art.js';
import { buildCaption, buildReferral, fileName } from './caption.js';

const FORMATS = { status: 'Status', group: 'Grupo' };
const COPIED = 'Legenda copiada. Se não aparecer, é só colar.';

export function toast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.className = 'toast';
    t.setAttribute('role', 'status');
    t.setAttribute('aria-live', 'polite');
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._h);
  t._h = setTimeout(() => t.classList.remove('show'), 3500);
}

/** Copia sem esperar (para não gastar o gesto do usuário). Devolve a promessa do resultado. */
function copyText(text, field) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text).then(() => true, () => legacyCopy(field));
  return Promise.resolve(legacyCopy(field));
}
function legacyCopy(field) {
  if (!field) return false;
  field.select();
  try { return document.execCommand('copy'); } catch { return false; } finally { field.setSelectionRange(0, 0); }
}

function download(url, name) {
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

const isDesktop = () => !matchMedia('(pointer: coarse)').matches;
const isAbort = err => err && (err.name === 'AbortError');

/**
 * Abre a pré-visualização da arte e o compartilhamento.
 * format: "status" ou "group" (dá para trocar no próprio modal).
 */
export function shareItem(item, area, format = 'status', config = {}) {
  const caption = buildCaption(item, area, config);
  const dlg = document.createElement('dialog');
  dlg.className = 'share-modal';
  dlg.setAttribute('aria-label', 'Compartilhar no WhatsApp');
  dlg.innerHTML = `
    <div class="share-head">
      <div class="seg" role="group" aria-label="Formato">${Object.entries(FORMATS).map(([k, v]) =>
        `<button type="button" class="chip" data-format="${k}">${v}</button>`).join('')}</div>
      <button type="button" class="share-close" data-close aria-label="Fechar">✕</button>
    </div>
    <div class="share-preview" aria-live="polite"><p class="muted">Gerando arte…</p></div>
    <div class="share-actions">
      <button type="button" class="btn btn-primary btn-block" data-share disabled>Compartilhar</button>
      <button type="button" class="btn btn-secondary btn-block" data-download disabled>Baixar imagem</button>
    </div>
    <label class="share-caption"><span>Legenda</span>
      <textarea readonly rows="6">${esc(caption)}</textarea></label>
    <button type="button" class="btn btn-secondary btn-block" data-copy>Copiar legenda</button>`;
  document.body.appendChild(dlg);

  const $ = s => dlg.querySelector(s);
  const field = $('textarea');
  const state = { format, file: null, url: '', token: 0 };

  async function generate(fmt) {
    state.format = fmt;
    const token = ++state.token;
    dlg.querySelectorAll('[data-format]').forEach(b => b.setAttribute('aria-pressed', b.dataset.format === fmt));
    $('[data-share]').disabled = $('[data-download]').disabled = true;
    $('.share-preview').innerHTML = '<p class="muted">Gerando arte…</p>';
    try {
      const blob = await renderArt(item, area, fmt);
      if (token !== state.token || !dlg.isConnected) return;
      if (state.url) URL.revokeObjectURL(state.url);
      state.url = URL.createObjectURL(blob);
      state.file = new File([blob], fileName(item, fmt), { type: 'image/png' });
      $('.share-preview').innerHTML = `<img src="${state.url}" alt="Arte de ${esc(item.nome)} para ${FORMATS[fmt]}" class="ratio-${fmt}">`;
      $('[data-share]').disabled = $('[data-download]').disabled = false;
    } catch (err) {
      if (token !== state.token) return;
      console.error('[compartilhar] falha ao gerar arte:', err);
      $('.share-preview').innerHTML = '<p class="notice">Não foi possível gerar a arte. Copie a legenda e envie o link.</p>';
    }
  }

  function close() {
    state.token++;
    if (state.url) URL.revokeObjectURL(state.url);
    dlg.close();
    dlg.remove();
  }

  function fallback(desktop) {
    download(state.url, state.file.name);
    if (desktop) window.open(`https://wa.me/?text=${encodeURIComponent(caption)}`, '_blank', 'noopener');
    else { toast('Imagem baixada. Copie a legenda abaixo.'); field.focus(); }
  }

  dlg.addEventListener('click', e => {
    const b = e.target.closest('button');
    if (e.target === dlg || b?.hasAttribute('data-close')) return close();
    if (!b) return;
    if (b.dataset.format && b.dataset.format !== state.format) return generate(b.dataset.format);

    if (b.hasAttribute('data-copy')) {
      copyText(caption, field).then(ok => toast(ok ? 'Legenda copiada.' : 'Selecione o texto e copie.'));
    } else if (b.hasAttribute('data-download') && state.file) {
      download(state.url, state.file.name);
    } else if (b.hasAttribute('data-share') && state.file) {
      // 1) legenda para a área de transferência (alguns Androids ignoram o texto quando há arquivo)
      copyText(caption, field).then(ok => ok && toast(COPIED));
      // 2) share ainda dentro do gesto, com o arquivo já pronto
      const data = { files: [state.file], text: caption };
      if (!isDesktop() && navigator.canShare?.({ files: data.files })) {
        navigator.share(data).catch(err => { if (!isAbort(err)) { console.warn('[compartilhar]', err); fallback(false); } });
      } else {
        fallback(isDesktop() || !!navigator.share);
      }
    }
  });
  dlg.addEventListener('cancel', e => { e.preventDefault(); close(); });

  dlg.showModal();
  generate(FORMATS[format] ? format : 'status');
}

/** "Indicar a um amigo": só texto e link. */
export function shareReferral(item, area, config = {}) {
  const text = buildReferral(item, area, config);
  if (!isDesktop() && navigator.share) {
    navigator.share({ text }).catch(err => { if (!isAbort(err)) window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener'); });
  } else {
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  }
}
