export function initSEOAnalyzer(panel) {
  const container = document.createElement('div');
  container.style.cssText = 'height: 100%; overflow-y: auto; padding: 16px;';

  const results = analyzeSEO();

  const scoreCard = createSEOScoreCard(results.score);
  const metaSection = createMetaSection(results.meta);
  const headingSection = createHeadingSection(results.headings);
  const imageSection = createImageSection(results.images);
  const linkSection = createLinkSection(results.links);
  const schemaSection = createSchemaSection(results.schema);

  container.appendChild(scoreCard);
  container.appendChild(metaSection);
  container.appendChild(headingSection);
  container.appendChild(imageSection);
  container.appendChild(linkSection);
  container.appendChild(schemaSection);

  const exportBtn = document.createElement('button');
  exportBtn.textContent = 'Export SEO Report';
  exportBtn.style.cssText = `
    padding: 8px 16px;
    margin-top: 16px;
    border: 1px solid var(--analyzer-border, rgba(0, 0, 0, 0.1));
    border-radius: 4px;
    background: var(--analyzer-primary, #0066cc);
    color: white;
    cursor: pointer;
    font-size: 14px;
  `;
  exportBtn.addEventListener('click', () => exportSEOReport(results));

  container.appendChild(exportBtn);
  panel.appendChild(container);
}

function analyzeSEO() {
  let score = 100;
  const issues = [];

  const meta = {
    title: document.querySelector('title')?.textContent || '',
    description: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
    keywords: document.querySelector('meta[name="keywords"]')?.getAttribute('content') || '',
    ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute('content') || '',
    ogDescription: document.querySelector('meta[property="og:description"]')?.getAttribute('content') || '',
    ogImage: document.querySelector('meta[property="og:image"]')?.getAttribute('content') || '',
    twitterCard: document.querySelector('meta[name="twitter:card"]')?.getAttribute('content') || ''
  };

  if (!meta.title) {
    issues.push({ type: 'error', message: 'Missing page title', fix: 'Add a <title> tag' });
    score -= 10;
  } else if (meta.title.length < 30) {
    issues.push({ type: 'warning', message: 'Title too short (recommended: 30-60 characters)', fix: 'Expand title to 30-60 characters' });
    score -= 3;
  } else if (meta.title.length > 60) {
    issues.push({ type: 'warning', message: 'Title too long (recommended: 30-60 characters)', fix: 'Shorten title to 30-60 characters' });
    score -= 3;
  }

  if (!meta.description) {
    issues.push({ type: 'error', message: 'Missing meta description', fix: 'Add meta description tag' });
    score -= 10;
  } else if (meta.description.length < 120) {
    issues.push({ type: 'warning', message: 'Description too short (recommended: 120-160 characters)', fix: 'Expand description to 120-160 characters' });
    score -= 3;
  } else if (meta.description.length > 160) {
    issues.push({ type: 'warning', message: 'Description too long (recommended: 120-160 characters)', fix: 'Shorten description to 120-160 characters' });
    score -= 3;
  }

  const headings = {
    h1: document.querySelectorAll('h1').length,
    h2: document.querySelectorAll('h2').length,
    h3: document.querySelectorAll('h3').length,
    h4: document.querySelectorAll('h4').length,
    h5: document.querySelectorAll('h5').length,
    h6: document.querySelectorAll('h6').length
  };

  if (headings.h1 === 0) {
    issues.push({ type: 'error', message: 'No H1 heading found', fix: 'Add an H1 heading' });
    score -= 10;
  } else if (headings.h1 > 1) {
    issues.push({ type: 'warning', message: 'Multiple H1 headings found', fix: 'Use only one H1 per page' });
    score -= 5;
  }

  const images = Array.from(document.querySelectorAll('img')).map(img => ({
    src: img.src,
    alt: img.alt || img.getAttribute('aria-label') || '',
    hasAlt: !!(img.alt || img.getAttribute('aria-label'))
  }));

  const imagesWithoutAlt = images.filter(img => !img.hasAlt).length;
  if (imagesWithoutAlt > 0) {
    issues.push({ type: 'warning', message: `${imagesWithoutAlt} image(s) missing alt text`, fix: 'Add alt attributes to all images' });
    score -= imagesWithoutAlt * 2;
  }

  const links = {
    internal: 0,
    external: 0,
    noFollow: 0,
    noFollowExternal: 0
  };

  document.querySelectorAll('a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    if (href.startsWith('http') && !href.startsWith(window.location.origin)) {
      links.external++;
      if (link.rel && link.rel.includes('nofollow')) {
        links.noFollowExternal++;
      }
    } else {
      links.internal++;
    }

    if (link.rel && link.rel.includes('nofollow')) {
      links.noFollow++;
    }
  });

  const schema = [];
  document.querySelectorAll('script[type="application/ld+json"]').forEach(script => {
    try {
      const data = JSON.parse(script.textContent);
      schema.push(data);
    } catch (e) {
      issues.push({ type: 'warning', message: 'Invalid JSON-LD schema found', fix: 'Fix JSON-LD syntax' });
      score -= 2;
    }
  });

  if (schema.length === 0) {
    issues.push({ type: 'info', message: 'No structured data (JSON-LD) found', fix: 'Consider adding structured data' });
    score -= 5;
  }

  if (!meta.ogTitle && !meta.ogDescription) {
    issues.push({ type: 'info', message: 'Missing Open Graph tags', fix: 'Add og:title and og:description' });
    score -= 5;
  }

  if (score < 0) score = 0;

  return { score, meta, headings, images, links, schema, issues };
}

function createSEOScoreCard(score) {
  const card = document.createElement('div');
  card.style.cssText = `
    padding: 24px;
    background: ${score >= 80 ? 'rgba(76, 175, 80, 0.1)' : score >= 60 ? 'rgba(255, 152, 0, 0.1)' : 'rgba(244, 67, 54, 0.1)'};
    border-radius: 8px;
    text-align: center;
    margin-bottom: 24px;
  `;

  const scoreValue = document.createElement('div');
  scoreValue.textContent = score;
  scoreValue.style.cssText = `
    font-size: 48px;
    font-weight: 700;
    color: ${score >= 80 ? '#4caf50' : score >= 60 ? '#ff9800' : '#f44336'};
    margin-bottom: 8px;
  `;

  const label = document.createElement('div');
  label.textContent = 'SEO Score';
  label.style.cssText = 'font-size: 14px; color: var(--analyzer-text-secondary, #666);';

  card.appendChild(scoreValue);
  card.appendChild(label);
  return card;
}

function createMetaSection(meta) {
  const section = document.createElement('div');
  section.style.cssText = 'margin-bottom: 24px;';

  const title = document.createElement('h3');
  title.textContent = 'Meta Tags';
  title.style.cssText = 'font-size: 16px; font-weight: 600; margin-bottom: 12px;';

  const grid = document.createElement('div');
  grid.style.cssText = 'display: grid; gap: 12px;';

  Object.entries(meta).forEach(([key, value]) => {
    if (!value) return;

    const row = document.createElement('div');
    row.style.cssText = `
      display: grid;
      grid-template-columns: 150px 1fr;
      gap: 12px;
      padding: 8px 0;
      border-bottom: 1px solid var(--analyzer-border, rgba(0, 0, 0, 0.05));
    `;

    const label = document.createElement('div');
    label.textContent = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    label.style.cssText = 'font-weight: 600; color: var(--analyzer-text-secondary, #666); font-size: 13px;';

    const valueEl = document.createElement('div');
    valueEl.textContent = value;
    valueEl.style.cssText = 'color: var(--analyzer-text, #333); font-size: 13px; word-break: break-word;';

    row.appendChild(label);
    row.appendChild(valueEl);
    grid.appendChild(row);
  });

  section.appendChild(title);
  section.appendChild(grid);
  return section;
}

function createHeadingSection(headings) {
  const section = document.createElement('div');
  section.style.cssText = 'margin-bottom: 24px;';

  const title = document.createElement('h3');
  title.textContent = 'Heading Structure';
  title.style.cssText = 'font-size: 16px; font-weight: 600; margin-bottom: 12px;';

  const grid = document.createElement('div');
  grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 12px;';

  Object.entries(headings).forEach(([tag, count]) => {
    const card = document.createElement('div');
    card.style.cssText = 'padding: 12px; background: var(--analyzer-bg-secondary, rgba(0, 0, 0, 0.02)); border-radius: 4px; text-align: center;';

    const tagEl = document.createElement('div');
    tagEl.textContent = tag.toUpperCase();
    tagEl.style.cssText = 'font-size: 12px; color: var(--analyzer-text-secondary, #666); margin-bottom: 4px;';

    const countEl = document.createElement('div');
    countEl.textContent = count;
    countEl.style.cssText = 'font-size: 24px; font-weight: 600; color: var(--analyzer-text, #333);';

    card.appendChild(tagEl);
    card.appendChild(countEl);
    grid.appendChild(card);
  });

  section.appendChild(title);
  section.appendChild(grid);
  return section;
}

function createImageSection(images) {
  const section = document.createElement('div');
  section.style.cssText = 'margin-bottom: 24px;';

  const title = document.createElement('h3');
  title.textContent = `Images (${images.length})`;
  title.style.cssText = 'font-size: 16px; font-weight: 600; margin-bottom: 12px;';

  const withoutAlt = images.filter(img => !img.hasAlt).length;
  const stat = document.createElement('div');
  stat.textContent = `${withoutAlt} image(s) missing alt text`;
  stat.style.cssText = `color: ${withoutAlt > 0 ? '#ff9800' : '#4caf50'}; font-size: 13px; margin-bottom: 12px;`;

  section.appendChild(title);
  section.appendChild(stat);
  return section;
}

function createLinkSection(links) {
  const section = document.createElement('div');
  section.style.cssText = 'margin-bottom: 24px;';

  const title = document.createElement('h3');
  title.textContent = 'Links';
  title.style.cssText = 'font-size: 16px; font-weight: 600; margin-bottom: 12px;';

  const grid = document.createElement('div');
  grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px;';

  Object.entries(links).forEach(([key, value]) => {
    const card = document.createElement('div');
    card.style.cssText = 'padding: 12px; background: var(--analyzer-bg-secondary, rgba(0, 0, 0, 0.02)); border-radius: 4px;';

    const label = document.createElement('div');
    label.textContent = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    label.style.cssText = 'font-size: 12px; color: var(--analyzer-text-secondary, #666); margin-bottom: 4px;';

    const valueEl = document.createElement('div');
    valueEl.textContent = value;
    valueEl.style.cssText = 'font-size: 20px; font-weight: 600; color: var(--analyzer-text, #333);';

    card.appendChild(label);
    card.appendChild(valueEl);
    grid.appendChild(card);
  });

  section.appendChild(title);
  section.appendChild(grid);
  return section;
}

function createSchemaSection(schema) {
  const section = document.createElement('div');
  section.style.cssText = 'margin-bottom: 24px;';

  const title = document.createElement('h3');
  title.textContent = `Structured Data (${schema.length})`;
  title.style.cssText = 'font-size: 16px; font-weight: 600; margin-bottom: 12px;';

  if (schema.length === 0) {
    const empty = document.createElement('div');
    empty.textContent = 'No structured data found';
    empty.style.cssText = 'padding: 16px; text-align: center; color: var(--analyzer-text-secondary, #999);';
    section.appendChild(empty);
  } else {
    schema.forEach((data, index) => {
      const item = document.createElement('div');
      item.style.cssText = 'padding: 12px; background: var(--analyzer-bg-secondary, rgba(0, 0, 0, 0.02)); border-radius: 4px; margin-bottom: 8px;';

      const type = document.createElement('div');
      type.textContent = `Schema ${index + 1}: ${data['@type'] || 'Unknown'}`;
      type.style.cssText = 'font-weight: 600; color: var(--analyzer-text, #333); font-size: 13px;';

      item.appendChild(type);
      section.appendChild(item);
    });
  }

  section.appendChild(title);
  return section;
}

function exportSEOReport(results) {
  const report = {
    score: results.score,
    meta: results.meta,
    headings: results.headings,
    images: {
      total: results.images.length,
      withoutAlt: results.images.filter(img => !img.hasAlt).length
    },
    links: results.links,
    schema: results.schema.length,
    issues: results.issues,
    timestamp: new Date().toISOString(),
    url: window.location.href
  };

  const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `seo-report-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

