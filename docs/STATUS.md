# Status do projeto

Cada etapa acrescenta no máximo 5 linhas ao terminar.

- 2026-11-12 · Planejamento (Opus 5.5): especificação, plano, fichas E1 a E8 e pendências criados. Aguardando aprovação do Paulo e Etapa 0.
- 2026-11-13 · E1 (Sonnet 5.5): pronto: estrutura de `site/`, logos e favicon, fontes locais, tokens, home dividida, roteador por hash; cores e fontes definidas por mim em `IDENTIDADE.md` a partir dos logos.
- E1 aprovada pelo Paulo em 2026-11-13 (logo Tech The só com letras; rodapé "Catálogo Paulo Gama"). Pendente: número do WhatsApp em `config.js`; contagem de itens ("—") até a E2; sem git, sem commit.
- 2026-11-13 · E2 (Sonnet 5.5): pronto: CSVs modelo e COMO-PUBLICAR.md, `config.js`, `data.js` (parser, validação, cache offline testado), contagem na home, `site/dev/cors-test.html`.
- E2 pendente: teste de imagem do Drive (aguarda ID do Paulo; resultado vai na §5.3); links reais da planilha em `config.js`; trocar `SELLER_CODE` se quiser.
- 2026-11-13 · E3 (Sonnet 5.5): pronto: listagem (busca sem acento, chips, grade, ?q=&cat= na URL), detalhe com "Veja também", "Quero este" (`js/whatsapp.js`), item inexistente, `#seller-actions` vazio para a E4. Testado em 375 e 1280 px, nas duas marcas.
- E3 pendente: aprovação do Paulo; `url_site` fictício na aba config (link do item no WhatsApp); teste do Drive (E2) ainda aguarda link.
- 2026-11-13 · E4 (Opus 5.5): pronto: `share/caption.js`, `share/art.js` (canvas Status 1080x1920 e grupo 1080x1350, capa genérica quando a imagem falha ou suja o canvas), `share/share.js` (modal com prévia e troca de formato, legenda copiada antes do `share`, desktop baixa PNG e abre wa.me), `seller.js` (selo e desativação), ícone rápido nos cards, "Indicar a um amigo", `dev/art-preview.html`. Revisão `/code-review low` sem achados.
- E4 pendente: aprovação visual do Paulo; teste real no Android e no iPhone (pela rede local ou após a E5 com HTTPS). Imagens só pela opção A; Drive (opção B) ainda não testado. Sem git, sem commit.
- E4: artes aprovadas pelo Paulo em 2026-11-13. Continua pendente o teste real no Android e no iPhone.
- 2026-11-13 · E5 (Haiku 5.5): publicado em https://paulohenriquegama.github.io/catalogo-vendas/ (repo público `catalogo-vendas`, deploy via Actions só de `site/`). Pronto: manifest + sw.js (CSVs fora do cache), meta Open Graph com `img/og.jpg` 1200×630, `url_site` atualizado nas duas planilhas, `docs/COMO-USAR.md`, `site/dev/` fora do git e do deploy (.gitignore).
- E5 pendente: conferir prévia no WhatsApp, instalação na tela inicial (Android e iPhone) e teste real de compartilhamento nos dois celulares (E4). Colar `url_site` na aba config da planilha do Google.
- 2026-11-13 · E6 (Haiku 5.5): cadastrados L014 (20 Verdades, R$ 80,00 por R$ 65,00) e L015 (Cria em Mim um Coração Puro, R$ 55,00); fotos em site/img/items/L014.jpg e L015.jpg. Preços de L001 (R$ 79,00) e L002 (R$ 85,00) atualizados. Produtos: mantido só P001, demais removidos.
E6 pendente: commit e push (aguardando aprovação do Paulo); faltam categorias, descrições e fotos de L001 a L013 conferidas pelo Paulo.
