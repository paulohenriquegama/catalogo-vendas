# Regras do projeto Catálogo de Vendas

Leia isto antes de qualquer etapa. Este arquivo é curto de propósito.

## Idioma e estilo
- Conversa, comentários de commit e textos visíveis no site em português do Brasil.
- Código, nomes de arquivos e identificadores em inglês.
- Textos do site e documentos: não usar travessão (—) no corpo do texto; prefira vírgula, ponto, dois-pontos ou parênteses.

## Economia de tokens (obrigatório)
- Trabalhe **somente na etapa pedida**. Leia apenas: este arquivo, a ficha da etapa em `docs/etapas/` e as seções da `docs/ESPECIFICACAO.md` que a ficha indicar. Não leia o resto da pasta "por garantia".
- Não releia arquivos que você acabou de escrever. Não gere resumos longos no chat.
- Nada de frameworks, bundlers ou `npm install` sem que a ficha peça. O projeto é HTML + CSS + JavaScript puro (ES modules), sem etapa de build.
- Se algo na ficha estiver ambíguo, pergunte uma vez, de forma objetiva, em vez de explorar o projeto inteiro.

## Arquitetura (resumo; detalhes em `docs/ESPECIFICACAO.md`)
- Site estático em `site/`, publicado pelo GitHub Pages.
- Dados vêm de uma Planilha Google publicada como CSV; o site guarda cópia em cache local.
- Duas marcas, um só código: o tema é trocado por `data-brand="ci"` (Cristão Integral) ou `data-brand="techthe"` (Tech The) no `<body>`, usando variáveis CSS definidas em `site/css/tokens.css`.
- Rotas por hash: `#/`, `#/livros`, `#/produtos`, `#/livros/<id>`, `#/produtos/<id>`.

## Ao terminar uma etapa
1. Conferir os critérios de aceite da ficha.
2. Acrescentar **no máximo 5 linhas** em `docs/STATUS.md`: data, etapa, o que ficou pronto, o que ficou pendente.
3. Se houver git, fazer um commit com a mensagem `E0X: <resumo>`.
