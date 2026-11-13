# E1 · Fundação visual e página inicial

**Modelo:** Sonnet 5.5 · **Esforço:** médio · **Sessão nova:** sim

## Ler
- `CLAUDE.md`
- `docs/ESPECIFICACAO.md`: §2, §3, §5.1, §7
- `docs/IDENTIDADE.md`
- Logos em `assets/marcas/`

## Fazer
1. Criar a estrutura de `site/` da §2 (arquivos JS podem ficar como módulos vazios com um comentário de propósito, exceto os desta etapa).
2. Otimizar os logos para web e copiar para `site/img/brand/` (SVG se houver; senão PNG/WebP até 600 px de largura). Gerar favicon a partir do símbolo do Cristão Integral (ou neutro, se o Paulo preferir).
3. Baixar as fontes indicadas (Google Fonts, WOFF2, só os pesos usados) para `site/fonts/` e declarar em `base.css` com `@font-face` e `font-display: swap`. Se alguma fonte não estiver disponível, escolher a equivalente mais próxima e registrar na tabela "Trocas de fonte" de `IDENTIDADE.md`.
4. Escrever `tokens.css` com as três variações (`ci`, `techthe`, `home`) conforme §7.1, usando os valores de `IDENTIDADE.md`. Conferir contraste AA de texto e botões.
5. Escrever `base.css` e o início de `components.css` (botão primário, botão secundário, cabeçalho de área).
6. `index.html` + `app.js` com roteador por hash (`#/`, `#/livros`, `#/produtos`, `#/livros/<id>`, `#/produtos/<id>`). Nas rotas de área, por enquanto, mostrar só o cabeçalho da marca e "em construção".
7. `views/home.js`: página dividida da §5.1 (vertical no celular, horizontal no desktop, crescimento suave no hover, `prefers-reduced-motion`). Contagem de itens fica como "—" até a E2.

## Não fazer
- Nada de dados, planilha, listagem ou compartilhamento.
- Não usar frameworks nem CDN de fontes (fontes locais por causa do canvas na E4).

## Critérios de aceite
- [ ] Abrindo `site/index.html` por um servidor local (`python3 -m http.server -d site 8080`), a home aparece dividida, com as duas identidades corretas.
- [ ] Em largura 375 px as metades ficam uma em cima da outra, sem rolagem horizontal.
- [ ] Clicar numa metade troca o tema (`data-brand`) e mostra o cabeçalho daquela marca; voltar retorna à home.
- [ ] Nenhuma cor fixa fora de `tokens.css`.
- [ ] Mostrar ao Paulo um print da home no celular e no desktop para aprovação.

## Prompt para colar
```
Execute a Etapa 1 do projeto, seguindo exatamente docs/etapas/E1-fundacao-visual.md.
Leia apenas o que a ficha indica. Ao final, me mostre a home no navegador do app
(celular e desktop) para eu aprovar e registre o andamento em docs/STATUS.md.
```
