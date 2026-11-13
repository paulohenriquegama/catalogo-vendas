# Identidade visual das marcas

Valores definidos pela Etapa 1 a partir dos logos em `assets/marcas/` (cores amostradas dos pixels). O Paulo pode ajustar qualquer valor aqui; o `site/css/tokens.css` é o único lugar que os usa.

## Cristão Integral (área de Livros) · `data-brand="ci"`

| Item | Valor |
|---|---|
| Logo principal (fundo claro) | `site/img/brand/ci-logo-claro.webp` (fundo transparente, gerado do PNG branco) |
| Logo para fundo escuro | `site/img/brand/ci-logo-escuro.webp` (sobre o verde `#1A3C34`) |
| Ícone/símbolo | coração dourado com cruz; favicon em `site/img/` (`icon-192.png`, `apple-touch-icon.png`, `brand/favicon-32.png`) |
| Cor primária | `#1A3C34` (verde floresta do logo) |
| Cor secundária | `#B08840` (ouro, palavra "INTEGRAL") |
| Cor de fundo | `#FBF8F1` (creme claro); superfície `#FFFFFF` |
| Cor de texto | `#1D2A26`; texto suave `#5B6B65` |
| Cor de destaque (selos, preço) | `#8A6A2C` (ouro escurecido para contraste AA em texto); ouro de arte `#C99F5E` |
| Fonte dos títulos | Cormorant Garamond (500 a 700): serifa clássica, parente do traço do logo |
| Fonte do texto | Source Sans 3 (400 a 700): legível em listas e legendas |
| Frase da metade na página inicial | Livros para uma fé que pensa e vive. |
| Referência visual | logo do canal (verde, ouro e creme; sóbrio e editorial) |

## Tech The (área de Produtos) · `data-brand="techthe"`

| Item | Valor |
|---|---|
| Grafia oficial do nome | Tech The |
| Logo principal (fundo claro) | `site/img/brand/tt-letras.webp` ("loja tech the", só as letras, fundo transparente, ampliado) |
| Logo para fundo escuro | o mesmo (letras brancas, amarelo e laranja claro, feito para fundo escuro) |
| Ícone/símbolo | `tt-simbolo.webp` |
| Cor primária | `#CC3608` (laranja queimado; branco sobre ele passa AA). O laranja vivo do logo (`#FF5023`) fica só na arte |
| Cor secundária | `#FF8A4C` (laranja claro, usado sobre fundo escuro) |
| Cor de fundo | `#FFF8F2` (creme quente); superfície `#FFFFFF` |
| Cor de texto | `#1C1410`; texto suave `#6B5A50` |
| Cor de destaque | `#FFC72F` (amarelo do "t" do logo; texto escuro sobre ele) |
| Fonte dos títulos | Archivo (500 a 900): grotesca pesada, próxima das letras do logo |
| Fonte do texto | Inter (400 a 700) |
| Frase da metade na página inicial | Produtos selecionados, preço justo. |
| Referência visual | logo laranja com ponteado (halftone), preto, branco e amarelo |

## Decisões de logo

- Tech The (revisado a pedido do Paulo): o fundo laranja foi removido. As letras do logo foram extraídas para `tt-letras.webp` (branco, amarelo `#FFC72F`; o preto original virou laranja claro `#FF8A4C` para aparecer no fundo escuro `#1C1410`) e exibidas em tamanho maior. Os selos quadrados originais (`tt-nome.webp`, `tt-simbolo.webp`) ficam em `site/img/brand/` sem uso por ora.
- O logo do Cristão Integral tem versão verde de fundo chapado: na home usa-se o fundo `#1A3C34`, que emenda sem borda. Na área de Livros (fundo claro) usa-se a versão com fundo transparente.
- Favicon: o coração do Cristão Integral sobre verde, como combinado na ficha.

## Trocas de fonte (preenchido pela Etapa 1)

| Marca | Fonte original | Fonte usada no site | Motivo |
|---|---|---|---|
| Cristão Integral | Serifa clássica de alto contraste (logo, provavelmente Trajan/Cinzel-like) | Cormorant Garamond | Equivalente livre do Google Fonts, sóbria e editorial |
| Tech The | Grotesca pesada do logo (provavelmente Archivo Black/Anton-like) | Archivo | Equivalente livre próxima, com pesos variáveis |

Fontes baixadas em `site/fonts/` (WOFF2, subconjunto latin, fonte variável).
