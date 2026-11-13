# E8 · Fase 2: compartilhar em lote

**Modelo:** Sonnet 5.5 · **Esforço:** médio · **Sessão nova:** sim · **Só depois do MVP aprovado (E7)**

## Ler
- `CLAUDE.md`
- `docs/ESPECIFICACAO.md`: §5.6, §5.10, §6, §7.3
- `site/js/share/*.js`, `site/js/views/list.js`

## Fazer
1. Em modo vendedor, a listagem ganha "Selecionar" (caixas nos cards, limite de 5, só da mesma área).
2. Barra inferior com "Compartilhar N itens" e escolha entre:
   - **Sequência:** uma arte por item, todas enviadas num único `navigator.share({ files: [...] })` (o WhatsApp posta como vários Status seguidos).
   - **Vitrine:** uma arte única com as capas lado a lado (2 a 5) e preços, título configurável (padrão "Livros da semana" / "Ofertas da semana").
3. Legenda única com a lista numerada, preços e o link da área.
4. Reaproveitar `renderArt` e `caption.js`; não duplicar código.

## Critérios de aceite
- [ ] Sequência de 3 itens postada no Status pelo Android e pelo iPhone.
- [ ] Vitrine legível com 5 itens no formato Status.

## Prompt para colar
```
Execute a Etapa 8 do projeto, seguindo exatamente docs/etapas/E8-fase2-lotes.md.
Leia apenas o que a ficha indica e registre em docs/STATUS.md ao final.
```
