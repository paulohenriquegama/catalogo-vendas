# E6 · Cadastro inicial dos itens

**Modelo:** Haiku 5.5 · **Esforço:** baixo · **Sessão nova:** sim (uma por lote de itens)

Pode ser feita a qualquer momento depois da E2, inclusive em paralelo com E3 a E5.

## Ler
- `CLAUDE.md`
- `docs/ESPECIFICACAO.md`: §4.1, §4.2, §5.3
- Os arquivos que o Paulo indicar (lista em texto, planilha, fotos)

## Fazer
1. Receber do Paulo a lista de itens (texto solto, áudio transcrito, foto de lista ou planilha) e a pasta de fotos.
2. Gerar `docs/planilha-modelo/livros-carga.csv` e/ou `produtos-carga.csv` com as colunas exatas da §4, IDs sequenciais (`L001`, `L002`…; `P001`…) continuando de onde a planilha parou.
   - Categoria: usar as que o Paulo já usa; se não houver, propor no máximo 8 por área e confirmar.
   - Descrição: se o Paulo não der, escrever uma de até 300 caracteres, factual, sem inventar dados do livro. Marcar com `(revisar)` no fim para o Paulo conferir.
3. Fotos (opção A da §5.3): redimensionar para no máximo 1200 px no maior lado, converter para JPG qualidade 82, renomear para `<id>.jpg` e salvar em `site/img/items/`. Usar `sips` (já existe no macOS), sem instalar nada.
4. Listar ao final itens com dados faltando (sem preço, sem foto, estado indefinido).

## Critérios de aceite
- [ ] CSV abre no Google Planilhas sem colunas deslocadas (testar acentos e vírgulas).
- [ ] Cada linha tem foto correspondente ou está na lista de faltantes.
- [ ] Paulo colou as linhas na planilha e os itens apareceram no site.

## Prompt para colar
```
Execute a Etapa 6 do projeto, seguindo exatamente docs/etapas/E6-cadastro-itens.md.
A lista de itens está em <caminho ou colada abaixo> e as fotos em <pasta>.
```
