export function initPerformanceAnalyzer(panel) {
  const container = document.createElement('div');
  container.style.cssText = 'height: 100%; overflow-y: auto; padding: 16px;';

  const metrics = calculatePerformanceMetrics();

  const metricsGrid = document.createElement('div');
  metricsGrid.style.cssText = `
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-bottom: 24px;
  `;

  Object.entries(metrics).forEach(([key, value]) => {
    const card = document.createElement('div');
    card.style.cssText = `
      padding: 16px;
      background: var(--analyzer-bg-secondary, rgba(0, 0, 0, 0.02));
      border-radius: 8px;
    `;

    const label = document.createElement('div');
    label.textContent = formatMetricLabel(key);
    label.style.cssText = 'font-size: 12px; color: var(--analyzer-text-secondary, #666); margin-bottom: 8px;';

    const valueEl = document.createElement('div');
    valueEl.textContent = formatMetricValue(key, value);
    valueEl.style.cssText = 'font-size: 24px; font-weight: 600; color: var(--analyzer-text, #333);';

    card.appendChild(label);
    card.appendChild(valueEl);
    metricsGrid.appendChild(card);
  });

  const resourceTiming = getResourceTiming();
  const resourceTable = createResourceTable(resourceTiming);

  const paintTiming = getPaintTiming();
  const paintSection = createPaintSection(paintTiming);

  const exportBtn = document.createElement('button');
  exportBtn.textContent = 'Export Performance Data';
  exportBtn.style.cssText = `
    padding: 8px 16px;
    margin-bottom: 16px;
    border: 1px solid var(--analyzer-border, rgba(0, 0, 0, 0.1));
    border-radius: 4px;
    background: var(--analyzer-primary, #0066cc);
    color: white;
    cursor: pointer;
    font-size: 14px;
  `;
  exportBtn.addEventListener('click', () => exportPerformanceData(metrics, resourceTiming, paintTiming));

  container.appendChild(exportBtn);
  container.appendChild(metricsGrid);
  container.appendChild(paintSection);
  container.appendChild(resourceTable);
  panel.appendChild(container);
}

function calculatePerformanceMetrics() {
  const timing = performance.timing;
  const navigation = performance.navigation;

  return {
    dns: timing.domainLookupEnd - timing.domainLookupStart,
    tcp: timing.connectEnd - timing.connectStart,
    ssl: timing.secureConnectionStart > 0 ? timing.connectEnd - timing.secureConnectionStart : 0,
    ttfb: timing.responseStart - timing.requestStart,
    download: timing.responseEnd - timing.responseStart,
    domProcessing: timing.domComplete - timing.domLoading,
    domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
    loadComplete: timing.loadEventEnd - timing.navigationStart,
    redirects: timing.redirectEnd - timing.redirectStart,
    cacheHit: navigation.type === navigation.TYPE_BACK_FORWARD ? 'Yes' : 'No',
    memory: performance.memory ? {
      used: performance.memory.usedJSHeapSize,
      total: performance.memory.totalJSHeapSize,
      limit: performance.memory.jsHeapSizeLimit
    } : null
  };
}

function formatMetricLabel(key) {
  const labels = {
    dns: 'DNS Lookup',
    tcp: 'TCP Connection',
    ssl: 'SSL Handshake',
    ttfb: 'Time to First Byte',
    download: 'Download Time',
    domProcessing: 'DOM Processing',
    domContentLoaded: 'DOM Content Loaded',
    loadComplete: 'Load Complete',
    redirects: 'Redirects',
    cacheHit: 'Cache Hit',
    memory: 'Memory Usage'
  };
  return labels[key] || key;
}

function formatMetricValue(key, value) {
  if (key === 'memory' && value) {
    return `${formatSize(value.used)} / ${formatSize(value.total)}`;
  }
  if (typeof value === 'number') {
    return value > 1000 ? `${(value / 1000).toFixed(2)}s` : `${value.toFixed(2)}ms`;
  }
  return String(value);
}

function formatSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function getResourceTiming() {
  return performance.getEntriesByType('resource').map(entry => ({
    name: entry.name,
    type: getResourceType(entry.name),
    duration: entry.duration,
    size: entry.transferSize,
    startTime: entry.startTime
  }));
}

function getResourceType(url) {
  if (url.match(/\.(js|mjs)$/i)) return 'Script';
  if (url.match(/\.css$/i)) return 'Stylesheet';
  if (url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) return 'Image';
  if (url.match(/\.(woff|woff2|ttf|otf)$/i)) return 'Font';
  if (url.match(/\.(mp4|webm|ogg)$/i)) return 'Media';
  return 'Other';
}

function createResourceTable(resources) {
  const section = document.createElement('div');
  section.style.cssText = 'margin-top: 24px;';

  const title = document.createElement('h3');
  title.textContent = 'Resource Timing';
  title.style.cssText = 'font-size: 16px; font-weight: 600; margin-bottom: 12px;';

  const table = document.createElement('div');
  table.style.cssText = 'overflow-x: auto;';

  const header = document.createElement('div');
  header.style.cssText = `
    display: grid;
    grid-template-columns: 1fr 100px 100px 100px;
    gap: 8px;
    padding: 8px 12px;
    font-weight: 600;
    font-size: 12px;
    border-bottom: 1px solid var(--analyzer-border, rgba(0, 0, 0, 0.1));
    background: var(--analyzer-bg-secondary, rgba(0, 0, 0, 0.02));
  `;
  header.innerHTML = '<div>Resource</div><div>Type</div><div>Duration</div><div>Size</div>';

  table.appendChild(header);

  resources.forEach(resource => {
    const row = document.createElement('div');
    row.style.cssText = `
      display: grid;
      grid-template-columns: 1fr 100px 100px 100px;
      gap: 8px;
      padding: 8px 12px;
      font-size: 12px;
      border-bottom: 1px solid var(--analyzer-border, rgba(0, 0, 0, 0.05));
    `;
    row.innerHTML = `
      <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${resource.name}</div>
      <div>${resource.type}</div>
      <div>${resource.duration.toFixed(2)}ms</div>
      <div>${formatSize(resource.size)}</div>
    `;
    table.appendChild(row);
  });

  section.appendChild(title);
  section.appendChild(table);
  return section;
}

function getPaintTiming() {
  const paintEntries = performance.getEntriesByType('paint');
  const result = {};
  paintEntries.forEach(entry => {
    result[entry.name] = entry.startTime;
  });
  return result;
}

function createPaintSection(paintTiming) {
  const section = document.createElement('div');
  section.style.cssText = 'margin-top: 24px;';

  const title = document.createElement('h3');
  title.textContent = 'Paint Timing';
  title.style.cssText = 'font-size: 16px; font-weight: 600; margin-bottom: 12px;';

  const grid = document.createElement('div');
  grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;';

  Object.entries(paintTiming).forEach(([key, value]) => {
    const card = document.createElement('div');
    card.style.cssText = 'padding: 12px; background: var(--analyzer-bg-secondary, rgba(0, 0, 0, 0.02)); border-radius: 4px;';

    const label = document.createElement('div');
    label.textContent = key === 'first-paint' ? 'First Paint' : 'First Contentful Paint';
    label.style.cssText = 'font-size: 12px; color: var(--analyzer-text-secondary, #666); margin-bottom: 4px;';

    const valueEl = document.createElement('div');
    valueEl.textContent = `${value.toFixed(2)}ms`;
    valueEl.style.cssText = 'font-size: 18px; font-weight: 600; color: var(--analyzer-text, #333);';

    card.appendChild(label);
    card.appendChild(valueEl);
    grid.appendChild(card);
  });

  section.appendChild(title);
  section.appendChild(grid);
  return section;
}

function exportPerformanceData(metrics, resources, paint) {
  const data = {
    metrics,
    resources,
    paint,
    timestamp: new Date().toISOString(),
    url: window.location.href
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `performance-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

