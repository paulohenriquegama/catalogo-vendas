import { WHATSAPP_GREETING } from '../config.js';
import { WA_ICON } from '../util.js';

export function renderHome(root, catalog) {
  root.innerHTML = `
  <div class="home">
    <div class="split">
      <a class="half" data-brand="ci" href="#/livros">
        <img class="logo-ci" src="img/brand/ci-logo-escuro.webp" alt="Cristão Integral">
        <h2 class="label">Livros</h2>
        <p class="tagline">Livros para uma fé que pensa e vive.</p>
        <p class="count" data-count="livros">— itens</p>
      </a>
      <a class="half" data-brand="techthe" href="#/produtos">
        <img class="logo-tt" src="img/brand/tt-letras.webp" alt="Loja Tech The">
        <h2 class="label">Produtos</h2>
        <p class="tagline">Produtos selecionados, preço justo.</p>
        <p class="count" data-count="produtos">— itens</p>
      </a>
    </div>
    <footer class="home-footer">
      <span>Catálogo Paulo Gama</span>
      <a class="btn btn-secondary" id="wa-geral" href="#/">${WA_ICON} WhatsApp</a>
    </footer>
  </div>`;

  const fill = cat => {
    for (const k of ['livros', 'produtos']) {
      const el = root.querySelector(`[data-count="${k}"]`);
      if (el) el.textContent = `${cat[k].length} ${cat[k].length === 1 ? 'item' : 'itens'}`;
    }
    const a = root.querySelector('#wa-geral');
    if (a && cat.config.whatsapp) {
      a.href = `https://wa.me/${cat.config.whatsapp}?text=${encodeURIComponent(WHATSAPP_GREETING)}`;
      a.target = '_blank'; a.rel = 'noopener';
    }
  };
  fill(catalog);
}
