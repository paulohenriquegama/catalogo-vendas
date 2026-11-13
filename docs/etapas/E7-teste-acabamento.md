# E7 · Teste real e acabamento

**Modelo:** Sonnet 5.5 · **Esforço:** baixo · **Sessão nova:** sim

## Ler
- `CLAUDE.md`
- `docs/ESPECIFICACAO.md`: §8
- `docs/STATUS.md`
- Apenas os arquivos ligados aos problemas relatados pelo Paulo

## Fazer
1. Passar com o Paulo pelo checklist da §8, item por item. Ele testa no celular e relata; você corrige.
2. Rodar Lighthouse mobile no endereço publicado (pelo navegador do app) e corrigir o que impedir Performance ≥ 85 e Acessibilidade ≥ 90.
3. Revisar textos visíveis do site (ortografia, tom, nenhum travessão no corpo do texto).
4. Rodar `/code-review low` no conjunto e corrigir o que for real.
5. Atualizar `CACHE_VERSION` do `sw.js` a cada publicação de correção.

## Critérios de aceite
- [ ] Checklist da §8 completo, marcado na própria especificação.
- [ ] Paulo aprovou o MVP.

## Prompt para colar
```
Execute a Etapa 7 do projeto, seguindo exatamente docs/etapas/E7-teste-acabamento.md.
Vamos passar o checklist juntos: me diga o primeiro teste a fazer no celular.
```
