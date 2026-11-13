// Foto ampliada: clicar (ou tocar) na foto do item abre a imagem grande na tela inteira.
// Fecha com novo clique/toque, Esc ou S.
export function attachZoom(box) {
  const img = box?.querySelector('img');
  if (!img) return;
  box.classList.add('zoomable');
  box.tabIndex = 0;
  box.setAttribute('role', 'button');
  box.setAttribute('aria-label', 'Ampliar foto');

  function open() {
    const ov = document.createElement('div');
    ov.className = 'lightbox';
    ov.setAttribute('role', 'dialog');
    ov.setAttribute('aria-modal', 'true');
    ov.setAttribute('aria-label', 'Foto ampliada. Clique ou aperte Esc para fechar.');
    ov.innerHTML = `<img src="${img.currentSrc || img.src}" alt="${img.alt.replace(/"/g, '&quot;')}">
      <button type="button" class="lightbox-close" aria-label="Fechar">✕</button>`;
    const close = () => { ov.remove(); document.removeEventListener('keydown', onKey, true); document.body.classList.remove('lightbox-open'); box.focus({ preventScroll: true }); };
    const onKey = e => { if (e.key === 'Escape' || e.key.toLowerCase() === 's') { e.preventDefault(); close(); } };
    ov.addEventListener('click', close);
    document.addEventListener('keydown', onKey, true);
    document.body.classList.add('lightbox-open');
    document.body.appendChild(ov);
    ov.querySelector('button').focus();
  }
  box.addEventListener('click', open);
  box.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
}
