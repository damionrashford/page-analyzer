import { DOMRemoteReceiver } from '@remote-dom/core/receivers';
import { defineHostElements } from './elements.js';

class PageAnalyzer {
  constructor() {
    this.iframe = null;
    this.receiver = null;
    this.initialized = false;
  }

  init() {
    if (this.initialized) {
      return;
    }

    try {
      this.createIframe();
      this.setupReceiver();
      defineHostElements();
      this.setupMessageListener();
      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize Page Analyzer:', error);
    }
  }

  createIframe() {
    const iframe = document.createElement('iframe');
    iframe.id = 'page-analyzer-iframe';
    iframe.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;border:none;z-index:2147483647;pointer-events:none;';
    iframe.src = 'https://gist.githubusercontent.com/damionrashford/GIST_ID/raw/remote.html';
    document.body.appendChild(iframe);
    this.iframe = iframe;
  }

  setupReceiver() {
    const root = document.createElement('div');
    root.id = 'page-analyzer-root';
    root.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:2147483646;pointer-events:auto;';
    document.body.appendChild(root);

    this.receiver = new DOMRemoteReceiver({
      elements: [
        'analyzer-panel',
        'analyzer-tab',
        'analyzer-button',
        'analyzer-input',
        'analyzer-select',
        'analyzer-table',
        'analyzer-tree',
        'analyzer-code',
        'analyzer-command-palette'
      ]
    });

    this.receiver.connect(root);
  }

  setupMessageListener() {
    window.addEventListener('message', (event) => {
      if (event.source !== this.iframe?.contentWindow) {
        return;
      }

      if (event.data.type === 'remote-dom-mutation') {
        this.receiver.connection.mutate(event.data.mutations);
      }
    });
  }

  destroy() {
    if (this.iframe) {
      this.iframe.remove();
      this.iframe = null;
    }

    const root = document.getElementById('page-analyzer-root');
    if (root) {
      root.remove();
    }

    this.initialized = false;
  }
}

if (typeof window !== 'undefined') {
  window.PageAnalyzer = new PageAnalyzer();
}

