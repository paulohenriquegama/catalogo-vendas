# Plano de execução

## Visão geral

| # | Etapa | Quem executa | Modelo | Esforço | Depende de | Entrega |
|---|---|---|---|---|---|---|
| E0 | Preparação | Paulo | (sem IA) | | | Logos, cores, número, conta GitHub, lista de itens |
| E1 | Fundação visual e página inicial | Claude | **Sonnet 5.5** | médio | E0 | Esqueleto do site, tokens das marcas, home dividida |
| E2 | Planilha e camada de dados | Claude | **Sonnet 5.5** | baixo | E1 | Modelo da planilha, `data.js`, teste de imagens do Drive |
| E3 | Listagem, detalhe e "Quero este" | Claude | **Sonnet 5.5** | médio | E2 | Catálogo navegável completo |
| E4 | Arte, compartilhamento e modo vendedor | Claude | **Opus 5.5** | médio | E3 | Botão de postar no Status e em grupos |
| E5 | Publicação, PWA e prévia do link | Claude | **Haiku 5.5** | baixo | E4 | Site no ar no GitHub Pages, instalável no celular |
| E6 | Cadastro inicial dos itens | Claude + Paulo | **Haiku 5.5** | baixo | E2 (pode correr junto de E3 a E5) | Planilha preenchida e fotos otimizadas |
| E7 | Teste real e acabamento | Claude + Paulo | **Sonnet 5.5** | baixo | E5, E6 | MVP aprovado (checklist §8) |
| E8 | Fase 2: compartilhar em lote | Claude | **Sonnet 5.5** | médio | E7 | Seleção múltipla e artes em sequência |

Caminho crítico: E0 → E1 → E2 → E3 → E4 → E5 → E7. A E6 é paralela: o Paulo pode ir preenchendo a planilha assim que a E2 entregar o modelo.

## Por que cada modelo

- **Opus 5.5** só na E4. É a etapa com mais armadilhas: canvas com CORS, fontes que precisam carregar antes do desenho, diferenças da Web Share API entre Android e iPhone, e o comportamento do WhatsApp com imagem + texto. Um erro aqui custa várias rodadas; o Opus acerta mais de primeira, o que no fim gasta menos.
- **Sonnet 5.5** nas etapas de construção e design (E1, E2, E3, E7, E8). Qualidade de interface muito boa com custo bem menor que o Opus.
- **Haiku 5.5** no que é mecânico (E5 publicação, E6 transformar lista em linhas de planilha e redimensionar fotos). Barato e rápido; a ficha já diz exatamente o que fazer.
- O planejamento (esta pasta `docs/`) foi feito no Opus para que as etapas seguintes não precisem pensar arquitetura de novo.

## Regras de economia de tokens

1. **Uma sessão nova por etapa.** Não continuar a E3 na mesma conversa da E2. Contexto acumulado é o maior gasto.
2. **Cole o prompt da ficha e nada mais.** A ficha já diz o que ler; o `CLAUDE.md` proíbe explorar a pasta inteira.
3. **Escolha o modelo antes de começar** (seletor de modelo no app) e o esforço indicado.
4. **Correções pequenas não precisam de sessão nova grande:** use Haiku ou Sonnet com esforço baixo e descreva o problema em uma frase, com o arquivo se souber.
5. **Prints só quando o problema for visual.** Para erro de lógica, descreva o comportamento em texto.
6. **Se a sessão ficar longa** (muitas idas e vindas), peça um resumo em 5 linhas para o `STATUS.md` e abra outra.
7. **Revisão de código** apenas ao fim da E4 e da E7, com `/code-review low`.

## Pontos de aprovação do Paulo

| Depois de | O que o Paulo aprova |
|---|---|
| E1 | Visual da página inicial e das cores de cada marca (pelo navegador do app ou abrindo `site/index.html`). |
| E3 | Navegação completa com itens de exemplo. |
| E4 | Uma postagem real de teste no próprio Status (pode apagar em seguida). |
| E7 | Checklist final da §8 da especificação. |

## Estimativa de esforço

| Etapa | Duração provável | Custo relativo de tokens |
|---|---|---|
| E1 | 1 sessão | médio |
| E2 | 1 sessão curta | baixo |
| E3 | 1 sessão | médio |
| E4 | 1 a 2 sessões | alto (Opus) |
| E5 | 1 sessão curta | muito baixo |
| E6 | 1 sessão por lote de itens | muito baixo |
| E7 | 1 a 2 sessões curtas | baixo |
| E8 | 1 sessão | médio |
