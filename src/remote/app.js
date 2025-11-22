import { createOverlay } from './ui/overlay.js';
import { initTools } from './tools/index.js';
import { setupCommandPalette } from './ui/command-palette.js';
import { setupKeyboardShortcuts } from './ui/keyboard.js';
import { captureScreenshot, downloadScreenshot } from './utils/screenshot.js';

export function initApp(root) {
  const overlay = createOverlay();
  root.appendChild(overlay);

  initTools(overlay);
  setupCommandPalette(overlay);
  setupKeyboardShortcuts();
  setupScreenshotHandlers();

  const theme = localStorage.getItem('analyzer-theme') || 'auto';
  applyTheme(theme);
}

function setupScreenshotHandlers() {
  document.addEventListener('take-screenshot', async () => {
    try {
      const dataUrl = await captureScreenshot();
      downloadScreenshot(dataUrl);
    } catch (error) {
      console.error('Screenshot failed:', error);
      alert('Screenshot capture failed. Please try again.');
    }
  });

  document.addEventListener('take-element-screenshot', async (e) => {
    try {
      const element = e.detail?.element;
      if (element) {
        const dataUrl = await captureScreenshot(element);
        downloadScreenshot(dataUrl, `element-${Date.now()}.png`);
      }
    } catch (error) {
      console.error('Element screenshot failed:', error);
      alert('Element screenshot capture failed. Please try again.');
    }
  });
}

function applyTheme(theme) {
  const isDark = theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
}

