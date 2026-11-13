# Especificação do Catálogo

Fonte da verdade do projeto. As fichas de etapa citam as seções por número (ex.: "leia §4 e §6").

---

## §1 Público e uso

| Quem | Uso principal |
|---|---|
| Paulo (vendedor) | Abrir o catálogo no celular, achar um item e, com um clique, gerar a arte e abrir o WhatsApp para postar no Status ou num grupo. |
| Cliente | Recebe um link (do Status, de um grupo ou direto), vê o item, navega pelos demais e toca em "Quero este" para falar com o Paulo. |

Uso esperado: 90% no celular (Android e iPhone). O desktop precisa funcionar, mas é secundário.

---

## §2 Estrutura de pastas

```
Vendas/
├── CLAUDE.md
├── README.md
├── docs/                    # planejamento (não vai para o site)
├── assets/marcas/           # originais de marca (logos em alta, manual)
│   ├── cristao-integral/
│   └── tech-the/
└── site/                    # ÚNICA pasta publicada no GitHub Pages
    ├── index.html
    ├── manifest.webmanifest
    ├── sw.js                # service worker (cache offline simples)
    ├── css/
    │   ├── tokens.css       # variáveis de cor/fonte por marca
    │   ├── base.css         # reset, tipografia, utilitários
    │   └── components.css   # cards, botões, cabeçalho, modal
    ├── js/
    │   ├── app.js           # inicialização e roteador por hash
    │   ├── config.js        # URLs da planilha, número do WhatsApp, textos fixos
    │   ├── data.js          # leitura do CSV, normalização, cache
    │   ├── views/
    │   │   ├── home.js      # página dividida
    │   │   ├── list.js      # listagem com busca e filtro
    │   │   └── detail.js    # detalhe do item
    │   ├── share/
    │   │   ├── art.js       # gera a arte em <canvas>
    │   │   ├── caption.js   # monta a legenda
    │   │   └── share.js     # Web Share API + alternativas
    │   └── seller.js        # "modo vendedor"
    ├── img/
    │   ├── brand/           # logos otimizados para web (SVG/PNG/WebP)
    │   └── items/           # fotos dos itens (se não usar o Drive; ver §5.3)
    └── fonts/               # fontes locais (necessário para o canvas, ver §7.4)
```

Regra: tudo que o site usa fica dentro de `site/`. Nenhum arquivo de `docs/` é carregado pelo site.

---

## §3 Stack técnica

- HTML + CSS + JavaScript puro com ES modules. **Sem build, sem npm, sem framework.** Motivo: publicação direta no GitHub Pages, manutenção barata por qualquer modelo e menos tokens.
- Biblioteca externa permitida: nenhuma no MVP. O CSV é simples o suficiente para um parser próprio de ~40 linhas (com suporte a aspas e quebras de linha dentro de células).
- Compatibilidade mínima: Chrome Android dos últimos 2 anos, Safari iOS 16+, Chrome/Edge/Safari desktop.
- Desempenho: primeira tela útil em menos de 2 s no 4G; imagens com `loading="lazy"` e largura máxima de 800 px na listagem.

---

## §4 Dados: Planilha Google

Uma planilha com três abas. A primeira linha de cada aba é o cabeçalho, exatamente com estes nomes (minúsculos, sem acento).

### §4.1 Aba `livros`

| coluna | obrigatória | exemplo | observação |
|---|---|---|---|
| id | sim | L001 | Único, nunca reaproveitar. Vai no link. |
| ativo | sim | sim | `sim`/`nao`. Itens `nao` somem do site. |
| titulo | sim | Conselheiros Capazes | |
| autor | sim | Jay E. Adams | |
| editora | não | Fiel | |
| categoria | sim | Aconselhamento | Gera o filtro automaticamente. |
| estado | sim | novo | `novo`, `seminovo` ou `usado`. |
| preco | sim | 59,90 | Formato brasileiro, sem "R$". |
| preco_promo | não | 49,90 | Se preenchido, mostra "de/por". |
| descricao | não | Texto curto | Até ~400 caracteres. |
| imagem | sim | L001.jpg ou URL | Ver §5.3. |
| destaque | não | sim | Aparece primeiro na listagem. |
| ordem | não | 10 | Desempate de ordenação (menor primeiro). |

### §4.2 Aba `produtos`

Igual à de livros, trocando `titulo` por `nome` e sem `autor`/`editora`. Acrescenta:

| coluna | obrigatória | exemplo |
|---|---|---|
| marca_produto | não | Samsung |
| variacoes | não | Preto, Branco |

### §4.3 Aba `config`

Duas colunas: `chave` e `valor`.

| chave | exemplo |
|---|---|
| whatsapp | 5511999999999 |
| nome_vendedor | Pr. Paulo Gama |
| texto_entrega | Entrega somente em mãos. |
| texto_pagamento | Pix ou dinheiro. |
| url_site | https://usuario.github.io/catalogo/ |

### §4.4 Publicação e leitura

- Paulo publica a planilha em **Arquivo > Compartilhar > Publicar na Web**, cada aba como CSV.
- Os três links CSV ficam em `site/js/config.js`.
- `data.js` faz `fetch` dos três CSVs em paralelo, converte em objetos, valida e normaliza:
  - preço `"59,90"` vira número `59.9`;
  - `ativo != "sim"` é descartado;
  - linhas sem `id`, nome/título ou preço são descartadas com `console.warn`.
- **Cache:** o resultado vai para `localStorage` (chave `catalog:v1`, com data). Na abertura, mostra o cache na hora e atualiza em segundo plano (stale-while-revalidate). Se o fetch falhar, segue com o cache e mostra um aviso discreto.
- Atraso conhecido: o Google pode levar até 5 minutos para refletir mudanças no CSV publicado. Documentar isso para o Paulo.

---

## §5 Funcionalidades

### §5.1 Página inicial dividida

- Tela cheia dividida em duas metades.
  - Celular (retrato): metade de cima e metade de baixo.
  - Desktop: metade esquerda e metade direita.
- Cada metade usa a identidade da sua marca (fundo, logo, fonte, cor) e tem: logo, rótulo ("Livros" / "Produtos"), uma frase curta e o número de itens disponíveis.
- Toque/clique em qualquer ponto da metade leva à área correspondente.
- Desktop: ao passar o mouse, a metade cresce levemente (ex.: 50/50 para 58/42) com transição suave. Respeitar `prefers-reduced-motion`.
- Rodapé mínimo e neutro: "Catálogo do Pr. Paulo Gama" e botão de WhatsApp geral.

### §5.2 Listagem (por área)

- Cabeçalho com logo da marca, botão voltar para a home e atalho para a outra área.
- Campo de busca (título/nome, autor, categoria), sem acento e sem diferenciar maiúsculas.
- Filtros de categoria em "chips" roláveis horizontalmente.
- Grade de cards: 2 colunas no celular, 3 a 4 no desktop. Card: imagem, título, autor (livros), selo de estado, preço (ou de/por).
- Ordenação: destaque, depois `ordem`, depois título.
- Estado vazio amigável quando a busca não acha nada.

### §5.3 Imagens dos itens

A arte gerada no `<canvas>` exige que a imagem permita CORS (senão o navegador bloqueia a exportação). Por isso:

- **Opção A (padrão e mais segura):** fotos dentro do próprio site, em `site/img/items/`, com o nome igual ao `id` (`L001.jpg`). Na planilha, a coluna `imagem` recebe só o nome do arquivo. Paulo envia as fotos pelo app do GitHub ou pedindo a um modelo (Haiku) para otimizar e subir.
- **Opção B (mais prática, a validar):** URL de imagem do Google Drive no formato `https://lh3.googleusercontent.com/d/<ID_DO_ARQUIVO>`. A Etapa 2 faz um teste técnico: se o canvas exportar sem erro, a opção B fica liberada; se não, só a opção A vale.
- `data.js` decide: se `imagem` começa com `http`, usa como URL; senão, monta `img/items/<imagem>`.
- Imagem ausente ou quebrada: mostrar uma capa genérica da marca.

### §5.4 Detalhe do item

- Rota `#/livros/<id>` ou `#/produtos/<id>`. Funciona aberta direto pelo link (é o que o cliente recebe).
- Mostra: imagem grande, título, autor/editora (livros), estado, preço, descrição, texto de entrega e pagamento (da aba `config`).
- Botão principal: **"Quero este"** (ver §5.5).
- Abaixo: "Veja também" com 4 itens da mesma categoria e um botão para ver o catálogo inteiro (para estimular compra de outros itens).
- Para o Paulo (modo vendedor, §5.7): botões **"Postar no Status"** e **"Enviar para grupo"**.

### §5.5 "Quero este" (cliente)

Abre `https://wa.me/<whatsapp>?text=<mensagem>` com a mensagem codificada:

```
Olá, Pr. Paulo! Vi no catálogo e tenho interesse:
📖 Conselheiros Capazes (Jay E. Adams)
Estado: novo | R$ 49,90
https://usuario.github.io/catalogo/#/livros/L001
```

(Para produtos, o emoji é 🛍️ e não há autor.)

### §5.6 Compartilhar no WhatsApp (o coração do projeto)

Fluxo ao tocar em "Postar no Status" ou "Enviar para grupo":

1. `art.js` gera a arte do item em `<canvas>` (layout em §7.3) e exporta como PNG (`canvas.toBlob`).
   - Status: 1080 × 1920 (9:16).
   - Grupo: 1080 × 1350 (4:5), que aparece maior no feed da conversa.
2. `caption.js` monta a legenda (modelos em §6).
3. A legenda é **copiada para a área de transferência** antes de abrir o compartilhamento, porque o WhatsApp às vezes descarta o texto quando recebe imagem. Aparece um aviso: "Legenda copiada. Se não aparecer, é só colar."
4. `share.js` chama `navigator.share({ files: [png], text: legenda })` quando `navigator.canShare({ files })` for verdadeiro. A folha de compartilhamento do sistema abre; o Paulo escolhe WhatsApp e depois "Meu status" ou o grupo.
5. Alternativas automáticas:
   - Sem suporte a arquivos (alguns desktops): baixa o PNG e abre `https://wa.me/?text=<legenda>`.
   - Sem suporte a `navigator.share`: baixa o PNG e mostra a legenda num campo com botão "Copiar".
6. Antes de compartilhar, uma pré-visualização da arte aparece num modal, com os botões "Compartilhar" e "Baixar imagem". Isso evita postar arte errada.

Limitação a explicar ao Paulo: nenhum site consegue postar sozinho no Status. O "um clique" leva até a tela do WhatsApp com a imagem e a legenda prontas; o último toque (escolher Status ou grupo e enviar) é sempre dele.

### §5.7 Modo vendedor

- Os botões de compartilhamento com arte aparecem só para o Paulo.
- Ativação: abrir uma vez `.../#/?vendedor=<codigo>` (o código fica em `config.js`). O site grava `seller=1` no `localStorage` e mostra um selo discreto "Modo vendedor". Desativação pelo próprio selo.
- Não é segurança de verdade (o código fica visível no fonte); serve apenas para manter a tela do cliente limpa. Não há nada sensível a proteger.
- Na listagem, em modo vendedor, cada card ganha um botão rápido de compartilhar (ícone), sem precisar abrir o detalhe.
- Cliente comum vê apenas "Quero este" e um "Indicar a um amigo" simples (link do item via `navigator.share` só com texto).

### §5.8 App no celular (PWA)

- `manifest.webmanifest` com nome "Catálogo Pr. Paulo", ícones e `display: standalone`, para o Paulo adicionar à tela inicial e abrir como aplicativo.
- `sw.js` guarda em cache os arquivos do site (não os CSVs) para abrir rápido mesmo com sinal fraco.

### §5.9 Pré-visualização do link (Open Graph)

- `index.html` com `og:title`, `og:description` e `og:image` (uma imagem 1200 × 630 mostrando as duas marcas). Como o site é estático e as rotas são por hash, todo link mostra essa mesma prévia geral. Isso é aceitável porque o item já vai na arte.
- (Fase 2, opcional: páginas estáticas por item geradas por GitHub Action, para prévias individuais.)

### §5.10 Fase 2 (fora do MVP)

- Compartilhar em lote: selecionar de 2 a 5 itens e gerar uma sequência de artes (uma por item) ou uma arte "vitrine" com as capas lado a lado, mais uma legenda única com a lista e os preços.
- Prévias individuais por item (§5.9).
- Contador simples de cliques em "Quero este" (sem dados pessoais).

---

## §6 Modelos de legenda

`caption.js` usa estes modelos. Linhas vazias são removidas quando o campo não existe.

**Livro**
```
📖 {titulo}
✍️ {autor}
📦 Estado: {estado}
💰 {preco_formatado}

{descricao_curta}

Veja este e outros livros no catálogo:
{link_do_item}

Interessou? Me chama no privado. 🙏
```

**Produto**
```
🛍️ {nome}
📦 Estado: {estado}
💰 {preco_formatado}

{descricao_curta}

Veja mais produtos:
{link_do_item}

Interessou? Me chama no privado.
```

- `preco_formatado`: `R$ 59,90` ou, com promoção, `de R$ 69,90 por R$ 59,90`.
- `descricao_curta`: até 140 caracteres, cortando em palavra inteira e terminando com "…".
- `link_do_item`: `url_site` da aba `config` + `#/livros/<id>`.

---

## §7 Design

### §7.1 Tokens por marca

Valores reais em `docs/IDENTIDADE.md` (Paulo preenche). Em `site/css/tokens.css`:

```css
body[data-brand="ci"]   { --bg: ; --surface: ; --text: ; --muted: ; --primary: ; --on-primary: ; --accent: ; --font-head: ; --font-body: ; --radius: ; }
body[data-brand="techthe"] { /* mesmas variáveis com os valores da Tech The */ }
body[data-brand="home"] { /* neutro, só para rodapé da home */ }
```

Todos os componentes usam só as variáveis. Nenhuma cor fixa fora de `tokens.css`.

### §7.2 Princípios visuais

- Cristão Integral: sóbrio, editorial, confiável (livro, estudo, pastoral). Muito espaço em branco, tipografia com serifa nos títulos se a marca permitir.
- Tech The: moderno, comercial, objetivo (vitrine de produto). Fundos limpos, foco na foto, preço em destaque.
- Comum às duas: botões grandes (mínimo 44 px de altura), contraste AA, ícones em SVG inline, sem imagens decorativas pesadas.
- Botão "Quero este" sempre na cor primária da marca, com ícone do WhatsApp.

### §7.3 Layout da arte para o WhatsApp

Status (1080 × 1920):

```
┌──────────────────────────┐
│ [logo da marca]          │  faixa superior, 160 px
│                          │
│     ┌──────────────┐     │
│     │              │     │
│     │  FOTO/CAPA   │     │  ~60% da altura, com sombra
│     │              │     │
│     └──────────────┘     │
│                          │
│  TÍTULO (até 2 linhas)   │
│  Autor                   │
│  [ NOVO ]                │  selo de estado
│                          │
│  R$ 49,90  (de R$ 69,90) │  preço grande
│                          │
│  Chame no privado 💬      │  rodapé com cor primária
└──────────────────────────┘
```

Grupo (1080 × 1350): mesma ordem, foto menor (~50%).

- Fundo e cores da marca do item.
- Texto longo quebra em até 2 linhas e termina com "…".
- A foto mantém proporção (contain), sem cortar capa de livro.

### §7.4 Fontes

- O canvas só desenha com uma fonte depois que ela está carregada. Usar fontes **locais** em `site/fonts/` (WOFF2) e aguardar `document.fonts.load(...)` antes de desenhar.
- Se a marca usar fonte paga sem licença web, escolher uma equivalente do Google Fonts (baixada para `site/fonts/`) e registrar a troca em `docs/IDENTIDADE.md`.

---

## §8 Qualidade e testes

Sem framework de testes no MVP. Cada etapa traz um checklist manual. Pontos obrigatórios antes de considerar o MVP pronto:

- [ ] Arte gerada e compartilhada no Status pelo Android.
- [ ] Arte gerada e compartilhada no Status pelo iPhone.
- [ ] Arte enviada a um grupo, com legenda (colada se preciso).
- [ ] Link do item aberto em outro celular leva direto ao item certo.
- [ ] "Quero este" abre a conversa com a mensagem certa.
- [ ] Alteração de preço na planilha aparece no site (respeitando o atraso do Google).
- [ ] Item com `ativo = nao` some.
- [ ] Site abre com internet fraca usando o cache.
- [ ] Lighthouse mobile: Performance ≥ 85, Acessibilidade ≥ 90.
