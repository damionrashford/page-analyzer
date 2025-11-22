export function initPageInfo(panel) {
  const container = document.createElement('div');
  container.style.cssText = 'height: 100%; overflow-y: auto; padding: 16px;';

  const sections = [
    createBasicInfoSection(),
    createMetaTagsSection(),
    createViewportSection(),
    createSecuritySection()
  ];

  sections.forEach(section => container.appendChild(section));
  panel.appendChild(container);
}

function createBasicInfoSection() {
  const section = document.createElement('div');
  section.style.cssText = 'margin-bottom: 24px;';

  const title = document.createElement('h3');
  title.textContent = 'Basic Information';
  title.style.cssText = 'font-size: 16px; font-weight: 600; margin-bottom: 12px;';

  const grid = document.createElement('div');
  grid.style.cssText = 'display: grid; gap: 12px;';

  const getPlatform = () => {
    if (navigator.userAgentData?.platform) {
      return navigator.userAgentData.platform;
    }
    return 'Unknown';
  };

  const info = [
    { label: 'URL', value: window.location.href },
    { label: 'Title', value: document.title },
    { label: 'Protocol', value: window.location.protocol },
    { label: 'Host', value: window.location.host },
    { label: 'Path', value: window.location.pathname },
    { label: 'User Agent', value: navigator.userAgent },
    { label: 'Language', value: navigator.language },
    { label: 'Platform', value: getPlatform() },
    { label: 'Cookies Enabled', value: navigator.cookieEnabled ? 'Yes' : 'No' },
    { label: 'Online Status', value: navigator.onLine ? 'Online' : 'Offline' },
    { label: 'Secure Context', value: window.isSecureContext ? 'Yes' : 'No' }
  ];

  info.forEach(item => {
    const row = document.createElement('div');
    row.style.cssText = `
      display: grid;
      grid-template-columns: 150px 1fr;
      gap: 12px;
      padding: 8px 0;
      border-bottom: 1px solid var(--analyzer-border, rgba(0, 0, 0, 0.05));
    `;

    const label = document.createElement('div');
    label.textContent = item.label;
    label.style.cssText = 'font-weight: 600; color: var(--analyzer-text-secondary, #666); font-size: 13px;';

    const value = document.createElement('div');
    value.textContent = item.value;
    value.style.cssText = 'color: var(--analyzer-text, #333); font-size: 13px; word-break: break-word;';

    row.appendChild(label);
    row.appendChild(value);
    grid.appendChild(row);
  });

  section.appendChild(title);
  section.appendChild(grid);
  return section;
}

function createMetaTagsSection() {
  const section = document.createElement('div');
  section.style.cssText = 'margin-bottom: 24px;';

  const title = document.createElement('h3');
  title.textContent = 'Meta Tags';
  title.style.cssText = 'font-size: 16px; font-weight: 600; margin-bottom: 12px;';

  const table = document.createElement('div');
  table.style.cssText = 'overflow-x: auto;';

  const header = document.createElement('div');
  header.style.cssText = `
    display: grid;
    grid-template-columns: 150px 1fr;
    gap: 8px;
    padding: 8px 12px;
    font-weight: 600;
    font-size: 12px;
    border-bottom: 1px solid var(--analyzer-border, rgba(0, 0, 0, 0.1));
    background: var(--analyzer-bg-secondary, rgba(0, 0, 0, 0.02));
  `;
  header.innerHTML = '<div>Name</div><div>Content</div>';
  table.appendChild(header);

  const metaTags = Array.from(document.querySelectorAll('meta')).map(meta => ({
    name: meta.getAttribute('name') || meta.getAttribute('property') || meta.getAttribute('http-equiv') || 'unknown',
    content: meta.getAttribute('content') || ''
  }));

  metaTags.forEach(meta => {
    const row = document.createElement('div');
    row.style.cssText = `
      display: grid;
      grid-template-columns: 150px 1fr;
      gap: 8px;
      padding: 8px 12px;
      font-size: 12px;
      border-bottom: 1px solid var(--analyzer-border, rgba(0, 0, 0, 0.05));
    `;

    const name = document.createElement('div');
    name.textContent = meta.name;
    name.style.cssText = 'font-weight: 600; color: var(--analyzer-text, #333);';

    const content = document.createElement('div');
    content.textContent = meta.content;
    content.style.cssText = 'color: var(--analyzer-text, #333); word-break: break-word;';

    row.appendChild(name);
    row.appendChild(content);
    table.appendChild(row);
  });

  if (metaTags.length === 0) {
    const empty = document.createElement('div');
    empty.textContent = 'No meta tags found';
    empty.style.cssText = 'padding: 16px; text-align: center; color: var(--analyzer-text-secondary, #999);';
    table.appendChild(empty);
  }

  section.appendChild(title);
  section.appendChild(table);
  return section;
}

function createViewportSection() {
  const section = document.createElement('div');
  section.style.cssText = 'margin-bottom: 24px;';

  const title = document.createElement('h3');
  title.textContent = 'Viewport Information';
  title.style.cssText = 'font-size: 16px; font-weight: 600; margin-bottom: 12px;';

  const grid = document.createElement('div');
  grid.style.cssText = 'display: grid; gap: 12px;';

  const viewportInfo = [
    { label: 'Window Width', value: `${window.innerWidth}px` },
    { label: 'Window Height', value: `${window.innerHeight}px` },
    { label: 'Screen Width', value: `${screen.width}px` },
    { label: 'Screen Height', value: `${screen.height}px` },
    { label: 'Device Pixel Ratio', value: window.devicePixelRatio || '1' },
    { label: 'Color Depth', value: `${screen.colorDepth} bits` },
    { label: 'Orientation', value: screen.orientation ? screen.orientation.type : 'Unknown' }
  ];

  viewportInfo.forEach(item => {
    const row = document.createElement('div');
    row.style.cssText = `
      display: grid;
      grid-template-columns: 150px 1fr;
      gap: 12px;
      padding: 8px 0;
      border-bottom: 1px solid var(--analyzer-border, rgba(0, 0, 0, 0.05));
    `;

    const label = document.createElement('div');
    label.textContent = item.label;
    label.style.cssText = 'font-weight: 600; color: var(--analyzer-text-secondary, #666); font-size: 13px;';

    const value = document.createElement('div');
    value.textContent = item.value;
    value.style.cssText = 'color: var(--analyzer-text, #333); font-size: 13px;';

    row.appendChild(label);
    row.appendChild(value);
    grid.appendChild(row);
  });

  section.appendChild(title);
  section.appendChild(grid);
  return section;
}

function createSecuritySection() {
  const section = document.createElement('div');
  section.style.cssText = 'margin-bottom: 24px;';

  const title = document.createElement('h3');
  title.textContent = 'Security Information';
  title.style.cssText = 'font-size: 16px; font-weight: 600; margin-bottom: 12px;';

  const grid = document.createElement('div');
  grid.style.cssText = 'display: grid; gap: 12px;';

  const securityInfo = [
    { label: 'Is Secure Context', value: window.isSecureContext ? 'Yes' : 'No' },
    { label: 'Protocol', value: window.location.protocol },
    { label: 'Mixed Content', value: document.querySelector('img[src^="http://"], script[src^="http://"]') ? 'Detected' : 'None' }
  ];

  securityInfo.forEach(item => {
    const row = document.createElement('div');
    row.style.cssText = `
      display: grid;
      grid-template-columns: 150px 1fr;
      gap: 12px;
      padding: 8px 0;
      border-bottom: 1px solid var(--analyzer-border, rgba(0, 0, 0, 0.05));
    `;

    const label = document.createElement('div');
    label.textContent = item.label;
    label.style.cssText = 'font-weight: 600; color: var(--analyzer-text-secondary, #666); font-size: 13px;';

    const value = document.createElement('div');
    value.textContent = item.value;
    value.style.cssText = 'color: var(--analyzer-text, #333); font-size: 13px;';

    row.appendChild(label);
    row.appendChild(value);
    grid.appendChild(row);
  });

  section.appendChild(title);
  section.appendChild(grid);
  return section;
}

