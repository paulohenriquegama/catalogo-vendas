// Configurações fixas do site.
// Enquanto a planilha não for publicada, usa cópias locais em site/data/.
// Depois de publicar (docs/planilha-modelo/COMO-PUBLICAR.md), troque pelos links CSV do Google.
export const SHEET_CSV = {
  livros: 'data/livros.csv',
  produtos: 'data/produtos.csv',
  config: 'data/config.csv',
};
export const SELLER_CODE = 'paulo2026'; // código do modo vendedor (#/?vendedor=<codigo>)
export const DEFAULT_WHATSAPP = ''; // somente dígitos com DDI; usado se a aba config não trouxer "whatsapp"
export const WHATSAPP_GREETING = 'Olá, Paulo! Vim pelo catálogo.';
