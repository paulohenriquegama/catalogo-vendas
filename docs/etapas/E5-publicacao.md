# E5 · Publicação, PWA e prévia do link

**Modelo:** Haiku 5.5 · **Esforço:** baixo · **Sessão nova:** sim

## Ler
- `CLAUDE.md`
- `docs/ESPECIFICACAO.md`: §5.8, §5.9
- `site/index.html`

## Fazer
1. `site/manifest.webmanifest` (nome "Catálogo Pr. Paulo", `start_url: "./"`, `display: standalone`, ícones 192 e 512 a partir do favicon) e ligar no `index.html`, com `apple-touch-icon`.
2. `site/sw.js`: cache dos arquivos estáticos (versão em constante `CACHE_VERSION`), rede primeiro para os CSVs. Registrar em `app.js`.
3. Meta tags Open Graph da §5.9 e uma `site/img/og.jpg` 1200×630 combinando as duas marcas (gerar com canvas num HTML temporário ou com Python/Pillow; apagar o temporário depois).
4. Git e GitHub Pages:
   - `git init` na pasta `Vendas` (se ainda não houver), `.gitignore` com `.DS_Store`.
   - Criar repositório público com o nome escolhido pelo Paulo (`gh repo create`), confirmando com ele antes.
   - Publicar só a pasta `site/` via GitHub Actions (workflow oficial `actions/deploy-pages` com `path: site`).
5. Atualizar `url_site` em `docs/planilha-modelo/config.csv` e avisar o Paulo para colocar o mesmo valor na aba `config` da planilha.
6. Escrever `docs/COMO-USAR.md` curto para o Paulo: instalar na tela inicial (Android e iPhone), ativar o modo vendedor, postar no Status, enviar ao grupo, atualizar preços na planilha (e o atraso de até 5 min).

## Critérios de aceite
- [ ] Site acessível pelo endereço do GitHub Pages, em HTTPS.
- [ ] Link colado numa conversa do WhatsApp mostra a prévia com a imagem.
- [ ] No celular, "Adicionar à tela inicial" cria o ícone e abre sem a barra do navegador.

## Prompt para colar
```
Execute a Etapa 5 do projeto, seguindo exatamente docs/etapas/E5-publicacao.md.
Leia apenas o que a ficha indica. Confirme comigo o nome do repositório antes
de criá-lo. Ao final, me passe o endereço e registre em docs/STATUS.md.
```
