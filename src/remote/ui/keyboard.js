export function setupKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      return;
    }

    if ((e.metaKey || e.ctrlKey) && e.shiftKey) {
      switch (e.key) {
        case 'D':
          e.preventDefault();
          switchTab('dom');
          break;
        case 'N':
          e.preventDefault();
          switchTab('network');
          break;
        case 'P':
          e.preventDefault();
          switchTab('performance');
          break;
        case 'C':
          e.preventDefault();
          switchTab('console');
          break;
        case 'S':
          e.preventDefault();
          switchTab('storage');
          break;
        case 'T':
          e.preventDefault();
          toggleTheme();
          break;
      }
    }

    if (e.key === 'Escape') {
      const palette = document.querySelector('analyzer-command-palette');
      if (palette) {
        palette.remove();
      }
    }
  });
}

function switchTab(tabId) {
  const tabsContainer = document.querySelector('[id^="panel-"]')?.parentElement;
  if (tabsContainer) {
    const event = new CustomEvent('tab-change', { detail: { tabId } });
    tabsContainer.dispatchEvent(event);
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('analyzer-theme', newTheme);
}

