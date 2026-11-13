// Dados e peças de layout compartilhados pelas views.
import { esc } from './util.js';

export const AREAS = {
  livros: { brand: 'ci', title: 'Livros', logo: 'img/brand/ci-logo-escuro.webp', alt: 'Cristão Integral', other: 'produtos' },
  produtos: { brand: 'techthe', title: 'Produtos', logo: 'img/brand/tt-letras.webp', alt: 'Loja Tech The', other: 'livros' },
};

export function areaHeader(area) {
  const a = AREAS[area], o = AREAS[a.other];
  return `<header class="area-header" data-brand="${a.brand}">
    <div class="container">
      <a class="back" href="#/">← Início</a>
      <a class="header-logo" href="#/${area}"><img src="${a.logo}" alt="${esc(a.alt)}"></a>
      <a class="back" href="#/${a.other}">${esc(o.title)} →</a>
    </div></header>`;
}
