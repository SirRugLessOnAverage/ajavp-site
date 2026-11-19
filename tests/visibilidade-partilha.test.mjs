import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('Páginas de Notícias: /noticias e /noticias/[slug] com SEO e OpenGraph dinâmico', () => {
  const indexContent = fs.readFileSync('app/noticias/page.tsx', 'utf-8');
  assert.ok(indexContent.includes('openGraph'), 'app/noticias/page.tsx deve ter openGraph');
  assert.ok(indexContent.includes('canonical:'), 'app/noticias/page.tsx deve ter canonical');

  const detailContent = fs.readFileSync('app/noticias/[slug]/page.tsx', 'utf-8');
  assert.ok(detailContent.includes('generateMetadata'), 'app/noticias/[slug]/page.tsx deve exportar generateMetadata');
  assert.ok(detailContent.includes('NewsArticleJsonLd'), 'Deve incluir NewsArticleJsonLd');
  assert.ok(detailContent.includes('ShareBar'), 'Deve incluir ShareBar na notícia');
  assert.ok(detailContent.includes('openGraph'), 'Deve definir openGraph dinâmico por notícia');

  const sitemapContent = fs.readFileSync('app/sitemap.ts', 'utf-8');
  assert.ok(sitemapContent.includes("'/noticias'") || sitemapContent.includes('"/noticias"'), 'sitemap.ts deve incluir /noticias');
  assert.ok(sitemapContent.includes('obterNoticiasPublicadas'), 'sitemap.ts deve listar dinamicamente as notícias publicadas');
});

test('OpenGraph Personalizado: Todas as páginas institucionais devem ter openGraph e twitter cards', () => {
  const paginas = [
    'app/modalidades/page.tsx',
    'app/socios/page.tsx',
    'app/associacao/page.tsx',
    'app/patrocinadores/page.tsx',
    'app/multimedia/page.tsx',
    'app/contactos/page.tsx',
  ];

  for (const file of paginas) {
    const content = fs.readFileSync(file, 'utf-8');
    assert.ok(content.includes('openGraph:'), `${file} deve definir openGraph`);
    assert.ok(content.includes('twitter:'), `${file} deve definir twitter card`);
  }
});

test('JSON-LD Rico: SportsEventJsonLd e FaqJsonLd presentes nas páginas estratégicas', () => {
  const home = fs.readFileSync('app/page.tsx', 'utf-8');
  assert.ok(home.includes('<SportsEventJsonLd'), 'app/page.tsx deve renderizar SportsEventJsonLd');
  assert.ok(home.includes('performers:'), 'app/page.tsx deve passar performers reais para SportsEventJsonLd');

  const jsonLd = fs.readFileSync('components/seo/JsonLd.tsx', 'utf-8');
  for (const field of ['endDate:', 'image:', 'performer:', 'offers:']) {
    assert.ok(jsonLd.includes(field), `SportsEventJsonLd deve incluir o campo ${field}`);
  }

  for (const faqPage of ['app/modalidades/page.tsx', 'app/socios/page.tsx', 'app/contactos/page.tsx']) {
    const content = fs.readFileSync(faqPage, 'utf-8');
    assert.ok(content.includes('<FaqJsonLd'), `${faqPage} deve renderizar FaqJsonLd`);
  }
});

test('Partilha Social Dinâmica: ShareBar deve suportar WhatsApp, Facebook e Instagram/Web Share API', () => {
  const shareBar = fs.readFileSync('components/shared/ShareBar.tsx', 'utf-8');
  assert.ok(shareBar.includes('wa.me/?text='), 'ShareBar deve gerar link WhatsApp dinâmico');
  assert.ok(shareBar.includes('facebook.com/sharer/sharer.php'), 'ShareBar deve gerar link Facebook Sharer');
  assert.ok(shareBar.includes('navigator.share'), 'ShareBar deve invocar Web Share API nativa para Instagram/apps móveis');
  assert.ok(shareBar.includes('Instagram'), 'ShareBar deve incluir botão dedicado Instagram / App');

  const agenda = fs.readFileSync('components/home/AgendaMatchCenter.tsx', 'utf-8');
  assert.ok(agenda.includes('<ShareBar'), 'AgendaMatchCenter deve integrar ShareBar');

  const futsal = fs.readFileSync('components/jif/futsal/FutsalJornadasView.tsx', 'utf-8');
  assert.ok(futsal.includes('<ShareBar'), 'FutsalJornadasView deve integrar ShareBar');
});
