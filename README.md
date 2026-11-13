# Catálogo de Vendas (Cristão Integral + Tech The)

Catálogo web único, com duas áreas e duas identidades visuais:

- **Livros**, com a identidade do canal **Cristão Integral**.
- **Produtos diversos**, com a identidade da loja **Tech The**.

O objetivo principal é servir ao Paulo como ferramenta de venda: com um clique, gerar a arte de um item e abrir o compartilhamento do WhatsApp (Status ou grupos). Quem recebe o link também pode navegar pelo catálogo, mas a negociação e o pagamento acontecem sempre na conversa pelo WhatsApp. Não há carrinho nem pagamento no site.

## Decisões já tomadas

| Tema | Decisão |
|---|---|
| Entrada | Página inicial dividida ao meio: uma metade Cristão Integral (Livros), outra Tech The (Produtos). Cada metade já mostra o visual da sua marca. |
| Compartilhar | Arte pronta (imagem) + legenda com preço + link direto para o item no catálogo. |
| Compra | Botão "Quero este" abre conversa no WhatsApp do Paulo com mensagem pronta. |
| Cadastro | Planilha Google (abas Livros, Produtos, Config), editável pelo celular. |
| Hospedagem | GitHub Pages (gratuito). |
| Preços | Sempre visíveis, com opção de preço promocional (de/por). |
| Informação extra | Estado do item (novo, seminovo, usado). |
| Volume inicial | 20 a 60 itens, com busca e filtro por categoria. |
| Lotes ("livros da semana") | Fase 2. |
| Modelos de IA | Somente Claude (Opus, Sonnet, Haiku). |

## Mapa de arquivos

| Arquivo | Para quê |
|---|---|
| `CLAUDE.md` | Regras para qualquer modelo que for executar uma etapa. |
| `docs/ESPECIFICACAO.md` | O que o sistema faz e como é construído (fonte da verdade). |
| `docs/IDENTIDADE.md` | Cores, fontes e logos das duas marcas (Paulo preenche). |
| `docs/PLANO.md` | Visão geral das etapas, modelo de cada uma e ordem de execução. |
| `docs/etapas/E*.md` | Uma ficha por etapa, autossuficiente, com o prompt pronto para colar. |
| `docs/PENDENCIAS.md` | O que o Paulo precisa providenciar antes de cada etapa. |
| `docs/STATUS.md` | Diário curto do andamento (cada etapa registra ao terminar). |
| `assets/marcas/` | Logos e materiais de marca. |

## Como executar

1. Resolver as pendências da Etapa 0 (`docs/PENDENCIAS.md`).
2. Abrir uma sessão nova do Claude Code nesta pasta, no modelo indicado na ficha da etapa.
3. Colar o prompt que está no fim da ficha (`docs/etapas/E0X-...md`).
4. Ao terminar, conferir os critérios de aceite da ficha e seguir para a próxima.
