// Gera a arte do item em <canvas> (§7.3): Status 1080×1920 ou grupo 1080×1350.
import { AREAS } from '../layout.js';
import { brl, estadoLabel } from '../util.js';

const W = 1080;
const LAYOUT = {
  status: { h: 1920, band: 160, logoH: 100, top: 56, photoH: 1000, title: 72, sub: 42, badge: 32, price: 110, old: 50, footer: 140, foot: 50 },
  group:  { h: 1350, band: 128, logoH: 80,  top: 36, photoH: 600,  title: 58, sub: 34, badge: 28, price: 86,  old: 42, footer: 110, foot: 42 },
};

/** Lê as variáveis da marca em tokens.css (nenhuma cor fixa aqui). */
function brandTokens(brand) {
  const el = document.createElement('div');
  el.dataset.brand = brand;
  el.hidden = true;
  document.body.appendChild(el);
  const cs = getComputedStyle(el);
  const v = n => cs.getPropertyValue(n).trim();
  const t = {
    bg: v('--bg'), surface: v('--surface'), text: v('--text'), muted: v('--muted'),
    primary: v('--primary'), onPrimary: v('--on-primary'), accent: v('--accent'), onAccent: v('--on-accent'),
    line: v('--line'), shadow: v('--shadow'), heroBg: v('--hero-bg'), heroText: v('--hero-text'), heroAccent: v('--hero-accent'),
    head: v('--font-head'), body: v('--font-body'), headWeight: v('--head-weight') || '700',
  };
  el.remove();
  return t;
}

function loadImage(src) {
  return new Promise(resolve => {
    if (!src) return resolve(null);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img.naturalWidth ? img : null);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

async function loadFonts(t, L) {
  if (!document.fonts?.load) return;
  const wanted = [
    `${t.headWeight} ${L.title}px ${t.head}`, `400 ${L.sub}px ${t.body}`,
    `600 ${L.badge}px ${t.body}`, `700 ${L.price}px ${t.body}`,
  ];
  try { await Promise.all(wanted.map(f => document.fonts.load(f))); } catch { /* segue com a fonte de reserva */ }
}

/** Quebra em até maxLines linhas; a última termina com "…" se sobrar texto. */
function wrapLines(ctx, text, maxW, maxLines) {
  const words = String(text || '').split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';
  let i = 0;
  for (; i < words.length; i++) {
    const test = line ? `${line} ${words[i]}` : words[i];
    if (ctx.measureText(test).width <= maxW || !line) { line = test; continue; }
    lines.push(line);
    line = words[i];
    if (lines.length === maxLines) break;
  }
  if (lines.length < maxLines) { lines.push(line); line = ''; i = words.length; }
  if (i < words.length || ctx.measureText(lines[lines.length - 1]).width > maxW) {
    let last = lines[lines.length - 1];
    while (last && ctx.measureText(last + '…').width > maxW) last = last.slice(0, -1);
    lines[lines.length - 1] = last.replace(/[\s,.;:-]+$/, '') + '…';
  }
  return lines;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(x, y, w, h, r);
  else ctx.rect(x, y, w, h);
}

/** Capa genérica da marca (imagem ausente ou bloqueada por CORS). */
function drawGenericCover(ctx, t, area, x, y, w, h) {
  ctx.fillStyle = t.heroBg;
  roundRect(ctx, x, y, w, h, 18);
  ctx.fill();
  ctx.strokeStyle = t.heroAccent;
  ctx.lineWidth = 4;
  roundRect(ctx, x + 28, y + 28, w - 56, h - 56, 10);
  ctx.stroke();
  ctx.fillStyle = t.heroText;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `${t.headWeight} ${Math.round(w / 6.5)}px ${t.head}`;
  ctx.fillText(AREAS[area].title, x + w / 2, y + h / 2);
}

function draw(ctx, { item, area, format, t, photo, logo }) {
  const L = LAYOUT[format];
  const H = L.h;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';

  // Fundo e faixa superior com o logo
  ctx.fillStyle = t.bg;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = t.heroBg;
  ctx.fillRect(0, 0, W, L.band);
  if (logo) {
    // O logo da Tech The (letras) tem muita margem interna; ganha mais altura na faixa.
    const logoH = L.logoH * (area === 'produtos' ? 1.55 : 1);
    const lw = Math.min(W * 0.62, logoH * logo.naturalWidth / logo.naturalHeight);
    const lh = lw * logo.naturalHeight / logo.naturalWidth;
    ctx.drawImage(logo, (W - lw) / 2, (L.band - lh) / 2, lw, lh);
  } else {
    ctx.fillStyle = t.heroText;
    ctx.font = `${t.headWeight} ${Math.round(L.logoH * 0.55)}px ${t.head}`;
    ctx.textBaseline = 'middle';
    ctx.fillText(AREAS[area].alt, W / 2, L.band / 2);
    ctx.textBaseline = 'alphabetic';
  }

  // Foto em modo contain, com sombra
  const boxTop = L.band + L.top;
  const boxW = W - 200, boxH = L.photoH;
  const ratio = photo ? photo.naturalWidth / photo.naturalHeight : (area === 'livros' ? 2 / 3 : 1);
  let pw = boxW, ph = boxW / ratio;
  if (ph > boxH) { ph = boxH; pw = boxH * ratio; }
  const px = (W - pw) / 2, py = boxTop + (boxH - ph) / 2;
  ctx.save();
  ctx.shadowColor = t.shadow;
  ctx.shadowBlur = 50;
  ctx.shadowOffsetY = 22;
  ctx.fillStyle = t.surface;
  roundRect(ctx, px, py, pw, ph, 18);
  ctx.fill();
  ctx.restore();
  if (photo) {
    ctx.save();
    roundRect(ctx, px, py, pw, ph, 18);
    ctx.clip();
    ctx.drawImage(photo, px, py, pw, ph);
    ctx.restore();
  } else {
    drawGenericCover(ctx, t, area, px, py, pw, ph);
  }

  // Bloco de texto, centralizado entre a foto e o rodapé
  ctx.font = `${t.headWeight} ${L.title}px ${t.head}`;
  const titleLines = wrapLines(ctx, item.nome, W - 140, 2);
  const sub = item.autor || item.marca_produto || '';
  const estado = item.estado ? estadoLabel(item.estado).toUpperCase() : '';
  const gap = Math.round(L.sub * 0.6);
  const titleLH = L.title * 1.12;
  const blockH = titleLines.length * titleLH
    + (sub ? gap + L.sub : 0)
    + (estado ? gap * 1.6 + L.badge * 2 : 0)
    + gap * 1.6 + L.price;
  const areaTop = boxTop + boxH + 24, areaBottom = H - L.footer - 24;
  let y = areaTop + Math.max(0, (areaBottom - areaTop - blockH) / 2);

  ctx.fillStyle = t.text;
  for (const line of titleLines) { y += titleLH; ctx.fillText(line, W / 2, y - titleLH * 0.2); }

  if (sub) {
    y += gap + L.sub;
    ctx.fillStyle = t.muted;
    ctx.font = `400 ${L.sub}px ${t.body}`;
    const [s] = wrapLines(ctx, sub, W - 160, 1);
    ctx.fillText(s, W / 2, y - L.sub * 0.15);
  }

  if (estado) {
    y += gap * 1.6;
    ctx.font = `600 ${L.badge}px ${t.body}`;
    const bw = ctx.measureText(estado).width + L.badge * 1.6, bh = L.badge * 2;
    ctx.strokeStyle = t.primary;
    ctx.lineWidth = 3;
    roundRect(ctx, (W - bw) / 2, y, bw, bh, bh / 2);
    ctx.stroke();
    ctx.fillStyle = t.primary;
    ctx.textBaseline = 'middle';
    ctx.fillText(estado, W / 2, y + bh / 2 + 2);
    ctx.textBaseline = 'alphabetic';
    y += bh;
  }

  // Preço grande; com promoção, o antigo riscado ao lado
  y += gap * 1.6 + L.price;
  const now = brl(item.preco_promo || item.preco);
  ctx.font = `700 ${L.price}px ${t.body}`;
  const nowW = ctx.measureText(now).width;
  if (item.preco_promo) {
    const old = brl(item.preco);
    ctx.font = `400 ${L.old}px ${t.body}`;
    const oldW = ctx.measureText(old).width;
    const space = 36, total = nowW + space + oldW;
    const x0 = (W - total) / 2;
    ctx.textAlign = 'left';
    ctx.fillStyle = t.primary;
    ctx.font = `700 ${L.price}px ${t.body}`;
    ctx.fillText(now, x0, y - L.price * 0.18);
    ctx.fillStyle = t.muted;
    ctx.font = `400 ${L.old}px ${t.body}`;
    const ox = x0 + nowW + space, oy = y - L.price * 0.18;
    ctx.fillText(old, ox, oy);
    ctx.fillRect(ox - 4, oy - L.old * 0.32, oldW + 8, 4);
    ctx.textAlign = 'center';
  } else {
    ctx.fillStyle = t.primary;
    ctx.fillText(now, W / 2, y - L.price * 0.18);
  }

  // Rodapé na cor primária
  ctx.fillStyle = t.primary;
  ctx.fillRect(0, H - L.footer, W, L.footer);
  ctx.fillStyle = t.onPrimary;
  ctx.font = `600 ${L.foot}px ${t.body}`;
  ctx.textBaseline = 'middle';
  ctx.fillText('Chame no privado 💬', W / 2, H - L.footer / 2 + 2);
  ctx.textBaseline = 'alphabetic';
}

function toBlob(canvas) {
  return new Promise((resolve, reject) => {
    try { canvas.toBlob(b => (b ? resolve(b) : reject(new Error('toBlob vazio'))), 'image/png'); }
    catch (err) { reject(err); }
  });
}

/**
 * Gera a arte do item e devolve um PNG.
 * format: "status" (1080×1920) ou "group" (1080×1350).
 * Se a foto quebrar ou "sujar" o canvas por CORS, refaz com a capa genérica da marca.
 */
export async function renderArt(item, area, format = 'status') {
  const L = LAYOUT[format] || LAYOUT.status;
  const fmt = LAYOUT[format] ? format : 'status';
  const t = brandTokens(AREAS[area].brand);
  const [photo, logo] = await Promise.all([loadImage(item.imagem), loadImage(AREAS[area].logo), loadFonts(t, L)]);
  // Um canvas "sujo" por CORS não fica limpo de novo: a reserva usa um canvas novo.
  const paint = (p, l) => {
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = L.h;
    draw(canvas.getContext('2d'), { item, area, format: fmt, t, photo: p, logo: l });
    return toBlob(canvas);
  };
  try {
    return await paint(photo, logo);
  } catch (err) {
    console.warn('[arte] exportação falhou, usando capa genérica:', err.message);
    return paint(null, null);
  }
}
