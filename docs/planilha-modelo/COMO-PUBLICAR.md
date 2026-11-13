# Como publicar a planilha (passo a passo)

Você faz isso uma vez. Depois, para mudar o catálogo, é só editar a planilha.

## 1. Criar a planilha
1. Abra o Google Planilhas (sheets.google.com) e crie uma planilha em branco.
2. Dê o nome "Catálogo de Vendas".

## 2. Importar as três abas
Repita para cada arquivo desta pasta (`livros.csv`, `produtos.csv`, `config.csv`):
1. Arquivo > Importar > Upload e escolha o arquivo.
2. Em "Local de importação", escolha **Inserir nova(s) planilha(s)**. Tipo de separador: vírgula.
3. Renomeie a aba para exatamente: `livros`, `produtos` e `config` (minúsculas). Apague a aba "Página1" vazia.

## 3. Preencher
- Troque os itens de exemplo pelos seus. Apague as linhas de exemplo "inativo" e "sem preço" quando quiser.
- `ativo`: escreva `sim` para aparecer no site, `nao` para esconder.
- `preco`: no formato brasileiro, sem "R$" (ex.: 59,90).
- Imagem: nome do arquivo (ex.: `L001.jpg`, foto dentro do site em `img/items/`) ou o link de uma imagem do Drive. Veja a especificação §5.3.
- Na aba `config`, coloque seu número de WhatsApp só com números, com 55 e DDD (ex.: 5586981048912).

## 4. Publicar cada aba como CSV
Faça para cada uma das três abas:
1. Arquivo > Compartilhar > **Publicar na Web**.
2. Em "Link", escolha a aba (ex.: `livros`) e, no segundo menu, **Valores separados por vírgula (.csv)**.
3. Clique em **Publicar** e confirme.
4. Copie o link gerado e guarde, identificando de qual aba é.

## 5. Colar os links no site
Envie os três links para quem cuida do site (ou para o Claude), para colocar em `site/js/config.js` no campo `SHEET_CSV`.

## Atenção
- O Google pode levar **até 5 minutos** para mostrar no site uma mudança feita na planilha.
- Nunca reaproveite um `id`. Se um livro sair de linha, mude `ativo` para `nao`.
- O nome das colunas (primeira linha) não pode ser alterado.
