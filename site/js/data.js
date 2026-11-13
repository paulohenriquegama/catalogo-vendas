// Leitura do CSV da planilha, normalização, validação e cache (stale-while-revalidate).
import { SHEET_CSV, DEFAULT_WHATSAPP } from './config.js';

const CACHE_KEY = 'catalog:v1';
let current = null;

/** Parser de CSV: aspas, vírgulas e quebras de linha dentro de células. */
export function parseCSV(text) {
  const rows = [];
  let row = [], cell = '', q = false;
  text = text.replace(/^﻿/, '');
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else q = false; }
      else cell += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(cell); cell = '';
      if (row.some(v => v.trim() !== '')) rows.push(row);
      row = [];
    } else cell += c;
  }
  row.push(cell);
  if (row.some(v => v.trim() !== '')) rows.push(row);
  return rows;
}

function toObjects(rows) {
  if (!rows.length) return [];
  const head = rows[0].map(h => h.trim().toLowerCase());
  return rows.slice(1).map(r => Object.fromEntries(head.map((h, i) => [h, (r[i] ?? '').trim()])));
}

export function parsePrice(v) {
  if (!v) return null;
  const n = parseFloat(String(v).replace(/[^\d,.-]/g, '').replace(/\./g, '').replace(',', '.'));
  return Number.isFinite(n) && n > 0 ? n : null;
}

function resolveImage(v) {
  if (!v) return '';
  return /^https?:/i.test(v) ? v : `img/items/${v}`;
}

function normalizeItems(area, rows) {
  const nameKey = area === 'livros' ? 'titulo' : 'nome';
  const out = [];
  for (const r of rows) {
    if ((r.ativo || '').toLowerCase() !== 'sim') continue;
    const preco = parsePrice(r.preco);
    if (!r.id || !r[nameKey] || preco === null) {
      console.warn(`[catálogo] linha descartada em "${area}" (faltam id, ${nameKey} ou preço):`, r.id || r[nameKey] || r);
      continue;
    }
    const promo = parsePrice(r.preco_promo);
    out.push({
      ...r,
      area,
      nome: r[nameKey],
      preco,
      preco_promo: promo !== null && promo < preco ? promo : null,
      imagem: resolveImage(r.imagem),
      destaque: (r.destaque || '').toLowerCase() === 'sim',
      ordem: r.ordem !== '' && !isNaN(+r.ordem) ? +r.ordem : Infinity,
    });
  }
  return out.sort((a, b) => (b.destaque - a.destaque) || (a.ordem - b.ordem) || a.nome.localeCompare(b.nome, 'pt-BR'));
}

const categoriasDe = items => [...new Set(items.map(i => i.categoria).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'pt-BR'));

function buildCatalog(csv) {
  const livros = normalizeItems('livros', toObjects(parseCSV(csv.livros)));
  const produtos = normalizeItems('produtos', toObjects(parseCSV(csv.produtos)));
  const config = Object.fromEntries(toObjects(parseCSV(csv.config)).map(r => [r.chave, r.valor]));
  config.whatsapp = (config.whatsapp || DEFAULT_WHATSAPP || '').replace(/\D/g, '');
  return { livros, produtos, config, categorias: { livros: categoriasDe(livros), produtos: categoriasDe(produtos) } };
}

async function fetchCatalog() {
  const [livros, produtos, config] = await Promise.all(
    ['livros', 'produtos', 'config'].map(async k => {
      const res = await fetch(SHEET_CSV[k], { cache: 'no-cache' });
      if (!res.ok) throw new Error(`${k}: HTTP ${res.status}`);
      return res.text();
    }));
  return buildCatalog({ livros, produtos, config });
}

function readCache() {
  try { const c = JSON.parse(localStorage.getItem(CACHE_KEY)); return c && c.data ? c : null; } catch { return null; }
}
function writeCache(data) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), data })); } catch { /* cache cheio ou bloqueado */ }
}
const emptyCatalog = () => ({ livros: [], produtos: [], config: { whatsapp: DEFAULT_WHATSAPP }, categorias: { livros: [], produtos: [] } });

/**
 * Devolve o catálogo. Com cache, responde na hora (fromCache: true) e atualiza em segundo plano;
 * quem quiser receber a versão nova passa onUpdate(catalogo). Sem cache, espera a rede.
 * Se a rede falhar e não houver cache, devolve catálogo vazio com error.
 */
export async function loadCatalog({ onUpdate } = {}) {
  const cached = readCache();
  const refresh = fetchCatalog().then(fresh => {
    writeCache(fresh);
    current = { ...fresh, fromCache: false };
    if (cached && onUpdate) onUpdate(current);
    return current;
  });
  if (cached) {
    current = { ...cached.data, fromCache: true };
    refresh.catch(err => console.warn('[catálogo] falha ao atualizar, usando cache:', err.message));
    return current;
  }
  try { return await refresh; }
  catch (err) { console.warn('[catálogo] falha ao carregar:', err.message); current = { ...emptyCatalog(), fromCache: false, error: err.message }; return current; }
}

export function getItem(area, id) {
  return current?.[area]?.find(i => i.id === id) || null;
}
