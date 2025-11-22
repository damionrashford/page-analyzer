export function setupCommandPalette(overlay) {
  let palette = null;
  let isOpen = false;

  const openPalette = () => {
    if (isOpen) return;
    isOpen = true;

    palette = document.createElement('analyzer-command-palette');
    palette.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 600px;
      max-width: 90vw;
      background: var(--analyzer-bg, rgba(255, 255, 255, 0.98));
      backdrop-filter: blur(20px);
      border-radius: 8px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
      z-index: 2147483648;
      display: flex;
      flex-direction: column;
      max-height: 70vh;
    `;

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Type a command or search...';
    input.style.cssText = `
      padding: 16px;
      border: none;
      border-bottom: 1px solid var(--analyzer-border, rgba(0, 0, 0, 0.1));
      font-size: 16px;
      background: transparent;
      outline: none;
      color: var(--analyzer-text, #333);
    `;

    const results = document.createElement('div');
    results.id = 'command-results';
    results.style.cssText = `
      max-height: 400px;
      overflow-y: auto;
      padding: 8px 0;
    `;

    const commands = getCommands();
    let selectedIndex = 0;

    const updateResults = (query) => {
      results.innerHTML = '';
      const filtered = commands.filter(cmd => 
        cmd.label.toLowerCase().includes(query.toLowerCase()) ||
        cmd.keywords.some(kw => kw.toLowerCase().includes(query.toLowerCase()))
      );

      filtered.forEach((cmd, index) => {
        const item = document.createElement('div');
        item.style.cssText = `
          padding: 12px 16px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: ${index === selectedIndex ? 'var(--analyzer-hover, rgba(0, 0, 0, 0.05))' : 'transparent'};
        `;

        const label = document.createElement('span');
        label.textContent = cmd.label;
        label.style.cssText = 'color: var(--analyzer-text, #333);';

        const shortcut = document.createElement('span');
        shortcut.textContent = cmd.shortcut || '';
        shortcut.style.cssText = 'color: var(--analyzer-text-secondary, #999); font-size: 12px;';

        item.appendChild(label);
        item.appendChild(shortcut);

        item.addEventListener('click', () => {
          cmd.action();
          closePalette();
        });

        item.addEventListener('mouseenter', () => {
          selectedIndex = index;
          updateResults(query);
        });

        results.appendChild(item);
      });

      if (filtered.length === 0) {
        const noResults = document.createElement('div');
        noResults.textContent = 'No commands found';
        noResults.style.cssText = 'padding: 16px; text-align: center; color: var(--analyzer-text-secondary, #999);';
        results.appendChild(noResults);
      }
    };

    input.addEventListener('input', (e) => {
      updateResults(e.target.value);
      selectedIndex = 0;
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIndex = Math.min(selectedIndex + 1, results.children.length - 1);
        updateResults(input.value);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIndex = Math.max(selectedIndex - 1, 0);
        updateResults(input.value);
      } else if (e.key === 'Enter' && results.children[selectedIndex]) {
        e.preventDefault();
        results.children[selectedIndex].click();
      } else if (e.key === 'Escape') {
        closePalette();
      }
    });

    palette.appendChild(input);
    palette.appendChild(results);
    document.body.appendChild(palette);
    input.focus();

    updateResults('');
  };

  const closePalette = () => {
    if (palette) {
      palette.remove();
      palette = null;
      isOpen = false;
    }
  };

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (isOpen) {
        closePalette();
      } else {
        openPalette();
      }
    } else if (e.key === 'Escape' && isOpen) {
      closePalette();
    }
  });

  palette?.addEventListener('click', (e) => {
    if (e.target === palette) {
      closePalette();
    }
  });
}

function getCommands() {
  return [
    {
      label: 'Open DOM Inspector',
      keywords: ['dom', 'inspect', 'element'],
      action: () => switchTab('dom')
    },
    {
      label: 'Open Network Monitor',
      keywords: ['network', 'requests', 'http'],
      action: () => switchTab('network')
    },
    {
      label: 'Open Performance',
      keywords: ['performance', 'metrics', 'speed'],
      action: () => switchTab('performance')
    },
    {
      label: 'Open Console',
      keywords: ['console', 'logs', 'debug'],
      action: () => switchTab('console')
    },
    {
      label: 'Open Storage',
      keywords: ['storage', 'localStorage', 'cookies'],
      action: () => switchTab('storage')
    },
    {
      label: 'Toggle Theme',
      keywords: ['theme', 'dark', 'light'],
      action: toggleTheme
    },
    {
      label: 'Export Data',
      keywords: ['export', 'download', 'save'],
      action: () => {
        const event = new CustomEvent('export-data');
        document.dispatchEvent(event);
      }
    },
    {
      label: 'Take Screenshot',
      keywords: ['screenshot', 'capture', 'image'],
      action: () => {
        const event = new CustomEvent('take-screenshot');
        document.dispatchEvent(event);
      }
    },
    {
      label: 'Take Element Screenshot',
      keywords: ['element', 'screenshot', 'capture'],
      action: () => {
        const selected = document.querySelector('[data-analyzer-selected]');
        if (selected) {
          const event = new CustomEvent('take-element-screenshot', { detail: { element: selected } });
          document.dispatchEvent(event);
        } else {
          alert('Please select an element first using the DOM Inspector');
        }
      }
    }
  ];
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

