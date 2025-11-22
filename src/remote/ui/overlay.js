import { createTabs } from './tabs.js';
import { createPanels } from './panels.js';

export function createOverlay() {
  const panel = document.createElement('analyzer-panel');
  panel.setAttribute('position', 'bottom-right');
  panel.setAttribute('width', '800px');
  panel.setAttribute('height', '600px');
  panel.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 800px;
    max-width: calc(100vw - 40px);
    height: 600px;
    max-height: calc(100vh - 40px);
    display: flex;
    flex-direction: column;
    background: var(--analyzer-bg, rgba(255, 255, 255, 0.95));
    backdrop-filter: blur(10px);
    border-radius: 8px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    z-index: 2147483647;
  `;

  const header = createHeader();
  const tabs = createTabs();
  const panels = createPanels();

  panel.appendChild(header);
  panel.appendChild(tabs);
  panel.appendChild(panels);

  makeDraggable(panel, header);
  makeResizable(panel);

  return panel;
}

function createHeader() {
  const header = document.createElement('div');
  header.style.cssText = `
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid var(--analyzer-border, rgba(0, 0, 0, 0.1));
    cursor: move;
    user-select: none;
  `;

  const title = document.createElement('div');
  title.textContent = 'Page Analyzer';
  title.style.cssText = 'font-weight: 600; font-size: 14px; color: var(--analyzer-text, #333);';

  const controls = document.createElement('div');
  controls.style.cssText = 'display: flex; gap: 8px;';

  const minimizeBtn = createControlButton('−', () => {
    const panel = minimizeBtn.closest('analyzer-panel');
    if (panel) {
      panel.style.height = '40px';
      panel.style.overflow = 'hidden';
    }
  });

  const maximizeBtn = createControlButton('□', () => {
    const panel = maximizeBtn.closest('analyzer-panel');
    if (panel) {
      const isMaximized = panel.style.width === '100vw';
      panel.style.width = isMaximized ? '800px' : '100vw';
      panel.style.height = isMaximized ? '600px' : '100vh';
      panel.style.top = isMaximized ? '20px' : '0';
      panel.style.right = isMaximized ? '20px' : '0';
      panel.style.bottom = isMaximized ? '20px' : '0';
      panel.style.left = isMaximized ? '20px' : '0';
    }
  });

  const closeBtn = createControlButton('×', () => {
    const panel = closeBtn.closest('analyzer-panel');
    if (panel) {
      panel.remove();
    }
  });

  controls.appendChild(minimizeBtn);
  controls.appendChild(maximizeBtn);
  controls.appendChild(closeBtn);

  header.appendChild(title);
  header.appendChild(controls);

  return header;
}

function createControlButton(text, onClick) {
  const btn = document.createElement('button');
  btn.textContent = text;
  btn.style.cssText = `
    width: 24px;
    height: 24px;
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--analyzer-text, #666);
    font-size: 16px;
    transition: background 0.2s;
  `;
  btn.addEventListener('mouseenter', () => {
    btn.style.background = 'var(--analyzer-hover, rgba(0, 0, 0, 0.05))';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.background = 'transparent';
  });
  btn.addEventListener('click', onClick);
  return btn;
}

function makeDraggable(element, handle) {
  let isDragging = false;
  let startX, startY, startLeft, startTop;

  handle.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    const rect = element.getBoundingClientRect();
    startLeft = rect.left;
    startTop = rect.top;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    e.preventDefault();
  });

  function onMouseMove(e) {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    element.style.left = `${startLeft + deltaX}px`;
    element.style.top = `${startTop + deltaY}px`;
    element.style.right = 'auto';
    element.style.bottom = 'auto';
  }

  function onMouseUp() {
    isDragging = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }
}

function makeResizable(element) {
  const resizeHandle = document.createElement('div');
  resizeHandle.style.cssText = `
    position: absolute;
    bottom: 0;
    right: 0;
    width: 20px;
    height: 20px;
    cursor: nwse-resize;
    background: transparent;
  `;

  let isResizing = false;
  let startX, startY, startWidth, startHeight;

  resizeHandle.addEventListener('mousedown', (e) => {
    isResizing = true;
    startX = e.clientX;
    startY = e.clientY;
    startWidth = element.offsetWidth;
    startHeight = element.offsetHeight;
    document.addEventListener('mousemove', onResizeMove);
    document.addEventListener('mouseup', onResizeUp);
    e.preventDefault();
  });

  function onResizeMove(e) {
    if (!isResizing) return;
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    element.style.width = `${Math.max(400, startWidth + deltaX)}px`;
    element.style.height = `${Math.max(300, startHeight + deltaY)}px`;
  }

  function onResizeUp() {
    isResizing = false;
    document.removeEventListener('mousemove', onResizeMove);
    document.removeEventListener('mouseup', onResizeUp);
    localStorage.setItem('analyzer-panel-width', element.style.width);
    localStorage.setItem('analyzer-panel-height', element.style.height);
  }

  element.style.position = 'relative';
  element.appendChild(resizeHandle);
}

