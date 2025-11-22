import { RemoteMutationObserver } from '@remote-dom/core/elements';
import { defineRemoteElements } from './elements.js';
import { initApp } from './app.js';

const root = document.getElementById('remote-root');

if (!root) {
  throw new Error('Remote root element not found');
}

defineRemoteElements();

const observer = new RemoteMutationObserver({
  mutate(mutations) {
    window.parent.postMessage({
      type: 'remote-dom-mutation',
      mutations
    }, '*');
  }
});

observer.observe(root);

initApp(root);

