# E4 · Arte, compartilhamento e modo vendedor

**Modelo:** Opus 5.5 · **Esforço:** médio · **Sessão nova:** sim

Esta é a etapa central do projeto e a mais delicada. Por isso usa o Opus.

## Ler
- `CLAUDE.md`
- `docs/ESPECIFICACAO.md`: §5.3 (com o resultado do teste do Drive), §5.6, §5.7, §6, §7.3, §7.4
- `site/js/data.js` e `site/js/views/detail.js` (só as partes que se ligam)

## Fazer
1. `share/caption.js`: legendas da §6, com `formatPrice` e corte de descrição em palavra inteira.
2. `share/art.js`: `renderArt(item, area, format) → Promise<Blob>` com `format` = `status` (1080×1920) ou `group` (1080×1350), seguindo §7.3.
   - Aguardar `document.fonts.load` das fontes da marca antes de desenhar.
   - Carregar imagem com `crossOrigin="anonymous"`; se falhar, usar capa genérica da marca.
   - Quebra de texto em até 2 linhas com "…".
   - Foto em modo contain, sem distorcer.
3. `share/share.js`: `shareItem(item, area, format)` com o fluxo completo da §5.6 (pré-visualização em modal, copiar legenda, `navigator.share` com arquivo, alternativas de desktop e de navegador sem suporte, aviso "Legenda copiada").
   - O nome do arquivo deve ser legível: `conselheiros-capazes-status.png`.
   - Tratar `AbortError` (usuário cancelou) sem mostrar erro.
4. `seller.js`: modo vendedor da §5.7 (ativação por `?vendedor=<codigo>`, selo, desativação).
5. Ligar os botões "Postar no Status" e "Enviar para grupo" no `#seller-actions` do detalhe e o ícone rápido nos cards da listagem (só em modo vendedor).
6. Para o cliente: botão "Indicar a um amigo" (só texto + link).
7. Criar `site/dev/art-preview.html` que renderiza a arte dos 3 primeiros itens de cada área nos dois formatos, para revisão visual rápida.

## Armadilhas conhecidas
- iOS Safari exige que `navigator.share` seja chamado dentro do gesto do usuário. Gere a arte **ao abrir o modal de pré-visualização** e chame `share` no clique do botão "Compartilhar" (já com o blob pronto).
- `navigator.clipboard.writeText` também precisa de gesto; faça no mesmo clique, antes do `share`.
- Alguns Androids ignoram `text` quando há `files`; por isso a legenda é copiada antes.
- Canvas "tainted" (CORS) faz `toBlob` falhar silenciosamente ou lançar `SecurityError`; trate e caia para a capa genérica.

## Critérios de aceite
- [ ] `dev/art-preview.html` mostra artes corretas e bonitas nas duas marcas e nos dois formatos. Aprovação do Paulo.
- [ ] No Android (Chrome): "Postar no Status" abre o compartilhamento com a imagem; WhatsApp aceita postar no Status.
- [ ] No iPhone (Safari): idem.
- [ ] No desktop: baixa a imagem e abre o WhatsApp Web com a legenda.
- [ ] Sem modo vendedor, os botões de arte não aparecem.
- [ ] Rodar `/code-review low` e corrigir o que for real.

Observação: o teste no celular exige o site publicado ou acessível pela rede local. Use `python3 -m http.server -d site 8080 --bind 0.0.0.0` e abra `http://<ip-do-mac>:8080` no celular. A Web Share API com arquivos exige contexto seguro (HTTPS) em alguns aparelhos; se falhar pela rede local, deixe esse teste para depois da E5 e registre no STATUS.

## Prompt para colar
```
Execute a Etapa 4 do projeto, seguindo exatamente docs/etapas/E4-compartilhar-whatsapp.md.
Leia apenas o que a ficha indica e respeite a seção "Armadilhas conhecidas".
Ao final, me mostre dev/art-preview.html, me diga como testar no celular
e registre em docs/STATUS.md.
```
