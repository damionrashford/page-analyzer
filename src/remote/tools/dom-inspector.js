export function initDOMInspector(panel) {
  let selectedElement = null;
  let highlightOverlay = null;

  const tree = document.createElement('analyzer-tree');
  tree.style.cssText = 'width: 100%; height: 100%;';

  const properties = document.createElement('div');
  properties.id = 'dom-properties';
  properties.style.cssText = `
    margin-top: 16px;
    padding: 16px;
    background: var(--analyzer-bg-secondary, rgba(0, 0, 0, 0.02));
    border-radius: 4px;
  `;

  const splitContainer = document.createElement('div');
  splitContainer.style.cssText = `
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    height: calc(100% - 40px);
  `;

  splitContainer.appendChild(tree);
  splitContainer.appendChild(properties);

  panel.appendChild(splitContainer);

  function highlightElement(element) {
    if (!element || element === document.body || element === document.documentElement) {
      return;
    }

    removeHighlight();

    const rect = element.getBoundingClientRect();
    highlightOverlay = document.createElement('div');
    highlightOverlay.style.cssText = `
      position: fixed;
      top: ${rect.top}px;
      left: ${rect.left}px;
      width: ${rect.width}px;
      height: ${rect.height}px;
      border: 2px solid var(--analyzer-primary, #0066cc);
      background: rgba(0, 102, 204, 0.1);
      pointer-events: none;
      z-index: 2147483645;
      box-sizing: border-box;
    `;
    document.body.appendChild(highlightOverlay);
  }

  function removeHighlight() {
    if (highlightOverlay) {
      highlightOverlay.remove();
      highlightOverlay = null;
    }
  }

  function selectElement(element) {
    document.querySelectorAll('[data-analyzer-selected]').forEach(el => {
      el.removeAttribute('data-analyzer-selected');
    });
    
    selectedElement = element;
    element.setAttribute('data-analyzer-selected', 'true');
    removeHighlight();
    highlightElement(element);

    const propertiesPanel = document.getElementById('dom-properties');
    if (propertiesPanel) {
      const screenshotBtn = document.createElement('button');
      screenshotBtn.textContent = 'Screenshot Element';
      screenshotBtn.style.cssText = `
        padding: 8px 16px;
        margin-bottom: 12px;
        border: 1px solid var(--analyzer-border, rgba(0, 0, 0, 0.1));
        border-radius: 4px;
        background: var(--analyzer-primary, #0066cc);
        color: white;
        cursor: pointer;
        font-size: 13px;
      `;
      screenshotBtn.addEventListener('click', async () => {
        try {
          const { captureScreenshot, downloadScreenshot } = await import('../utils/screenshot.js');
          const dataUrl = await captureScreenshot(element);
          downloadScreenshot(dataUrl, `element-${element.tagName.toLowerCase()}-${Date.now()}.png`);
        } catch (error) {
          console.error('Screenshot failed:', error);
          alert('Screenshot capture failed. Please try again.');
        }
      });

      propertiesPanel.innerHTML = '';
      propertiesPanel.appendChild(screenshotBtn);
      
      const content = document.createElement('div');
      content.innerHTML = `
        <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600;">Element Properties</h3>
        <div style="display: grid; gap: 8px;">
          <div><strong>Tag:</strong> ${element.tagName.toLowerCase()}</div>
          ${element.id ? `<div><strong>ID:</strong> ${element.id}</div>` : ''}
          ${element.className ? `<div><strong>Classes:</strong> ${element.className}</div>` : ''}
          <div><strong>Dimensions:</strong> ${element.offsetWidth} × ${element.offsetHeight}px</div>
          <div><strong>Position:</strong> ${element.offsetLeft}, ${element.offsetTop}</div>
        </div>
        <h4 style="margin: 16px 0 8px 0; font-size: 13px; font-weight: 600;">Computed Styles</h4>
        <pre style="font-size: 11px; overflow-x: auto; background: var(--analyzer-bg, #fff); padding: 8px; border-radius: 4px;">${getComputedStyles(element)}</pre>
      `;
      propertiesPanel.appendChild(content);
    }
  }

  buildDOMTree(tree, document.documentElement, selectElement, highlightElement);

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('#page-analyzer-root')) return;
    highlightElement(e.target);
  });

  document.addEventListener('click', (e) => {
    if (e.target.closest('#page-analyzer-root')) return;
    e.preventDefault();
    e.stopPropagation();
    selectElement(e.target);
  });
}

function buildDOMTree(container, element, selectElement, highlightElement, level = 0) {
  const item = document.createElement('div');
  item.style.cssText = `
    padding: 4px 8px;
    padding-left: ${level * 16 + 8}px;
    cursor: pointer;
    font-family: monospace;
    font-size: 12px;
    border-left: 2px solid transparent;
  `;

  const tagName = element.tagName.toLowerCase();
  const id = element.id ? `#${element.id}` : '';
  const classes = element.className ? `.${String(element.className).split(' ').join('.')}` : '';
  item.textContent = `<${tagName}${id}${classes}>`;

  item.addEventListener('click', () => {
    selectElement(element);
    highlightElement(element);
  });

  item.addEventListener('mouseenter', () => {
    item.style.borderLeftColor = 'var(--analyzer-primary, #0066cc)';
    item.style.background = 'var(--analyzer-hover, rgba(0, 0, 0, 0.05))';
  });

  item.addEventListener('mouseleave', () => {
    item.style.borderLeftColor = 'transparent';
    item.style.background = 'transparent';
  });

  container.appendChild(item);

  if (element.children.length > 0 && level < 10) {
    Array.from(element.children).forEach(child => {
      buildDOMTree(container, child, selectElement, highlightElement, level + 1);
    });
  }
}

function getComputedStyles(element) {
  const styles = window.getComputedStyle(element);
  const important = [
    'display', 'position', 'width', 'height', 'margin', 'padding',
    'border', 'background', 'color', 'font-size', 'font-family'
  ];
  return important.map(prop => `${prop}: ${styles[prop]}`).join('\n');
}

