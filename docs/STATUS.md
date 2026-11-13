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
