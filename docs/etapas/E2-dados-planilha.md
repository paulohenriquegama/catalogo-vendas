# E2 · Planilha e camada de dados

**Modelo:** Sonnet 5.5 · **Esforço:** baixo · **Sessão nova:** sim

## Ler
- `CLAUDE.md`
- `docs/ESPECIFICACAO.md`: §4, §5.3
- `site/js/app.js` (só para saber como importar)

## Fazer
1. Criar `docs/planilha-modelo/` com três CSVs (`livros.csv`, `produtos.csv`, `config.csv`) já com cabeçalhos da §4 e 3 itens fictícios cada, para o Paulo importar no Google Planilhas.
2. Escrever em `docs/planilha-modelo/COMO-PUBLICAR.md` um passo a passo curto (com linguagem simples) para: criar a planilha, importar as abas, publicar cada aba como CSV e copiar os links.
3. `site/js/config.js`: constantes `SHEET_CSV = { livros, produtos, config }`, `SELLER_CODE`, `DEFAULT_WHATSAPP`. Enquanto o Paulo não publicar a planilha, apontar para cópias locais em `site/data/*.csv` (copiar os CSVs de exemplo para lá).
4. `site/js/data.js`:
   - parser de CSV (aspas, vírgulas e quebras de linha dentro de célula);
   - normalização e validação da §4.4;
   - resolução de imagem da §5.3;
   - cache stale-while-revalidate em `localStorage`;
   - API exportada: `loadCatalog() → { livros, produtos, config, categorias: { livros, produtos }, fromCache }`, e `getItem(area, id)`.
5. Ligar a contagem de itens na home (E1 deixou "—").
6. **Teste técnico de imagens do Drive** (§5.3 opção B): criar `site/dev/cors-test.html` que carrega uma imagem `https://lh3.googleusercontent.com/d/<ID>` com `crossOrigin="anonymous"`, desenha num canvas e tenta `toBlob`. Pedir ao Paulo um ID de imagem pública do Drive para testar. Registrar o resultado (funciona / não funciona) no topo da §5.3 da especificação, numa linha.

## Não fazer
- Nada de listagem, detalhe ou compartilhamento.

## Critérios de aceite
- [ ] `loadCatalog()` devolve os itens de exemplo, descartando linha inativa e linha sem preço (incluir um caso de cada nos CSVs de exemplo).
- [ ] Segunda abertura da página mostra os dados mesmo com a rede desligada (DevTools offline).
- [ ] Resultado do teste do Drive registrado.

## Prompt para colar
```
Execute a Etapa 2 do projeto, seguindo exatamente docs/etapas/E2-dados-planilha.md.
Leia apenas o que a ficha indica. Quando chegar no teste de imagem do Drive,
me peça o ID de uma imagem. Ao final, registre em docs/STATUS.md.
```
