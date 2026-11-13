# E3 · Listagem, detalhe e "Quero este"

**Modelo:** Sonnet 5.5 · **Esforço:** médio · **Sessão nova:** sim

## Ler
- `CLAUDE.md`
- `docs/ESPECIFICACAO.md`: §5.2, §5.4, §5.5, §7.2
- `site/js/app.js`, `site/js/data.js` (só as assinaturas exportadas), `site/css/components.css`

## Fazer
1. `views/list.js`: listagem da §5.2 (busca sem acento, chips de categoria, grade responsiva, selos de estado, preço de/por, ordenação, estado vazio).
2. `views/detail.js`: detalhe da §5.4, incluindo textos de entrega e pagamento da aba `config` e o bloco "Veja também".
3. Função `buildWhatsAppOrderUrl(item, area, config)` em `views/detail.js` (ou num `js/whatsapp.js`), com a mensagem da §5.5.
4. Estilos novos em `components.css` usando só variáveis de `tokens.css`.
5. Busca e categoria refletidas na URL (`#/livros?q=adams&cat=Aconselhamento`) para que o voltar do navegador funcione.
6. Rolagem: ao voltar do detalhe para a lista, manter a posição.
7. Deixar no detalhe um contêiner vazio `#seller-actions` para a E4.

## Não fazer
- Arte, compartilhamento e modo vendedor (E4).

## Critérios de aceite
- [ ] Abrir direto `#/livros/L001` numa aba nova mostra o item certo.
- [ ] Busca "adams" acha "Jay E. Adams"; busca "aconselhamento" acha pela categoria.
- [ ] "Quero este" abre `wa.me` com a mensagem e o link do item corretos.
- [ ] Item inexistente mostra mensagem amigável com botão para o catálogo.
- [ ] Layout ok em 375 px e em 1280 px, nas duas marcas.
- [ ] Mostrar ao Paulo a navegação completa para aprovação.

## Prompt para colar
```
Execute a Etapa 3 do projeto, seguindo exatamente docs/etapas/E3-catalogo.md.
Leia apenas o que a ficha indica. Ao final, me mostre a listagem e o detalhe
no navegador do app e registre em docs/STATUS.md.
```
