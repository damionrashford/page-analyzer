const consoleLogs = [];
const maxLogs = 1000;

export function initConsoleCapture(panel) {
  const originalLog = console.log;
  const originalError = console.error;
  const originalWarn = console.warn;
  const originalInfo = console.info;
  const originalDebug = console.debug;

  function captureLog(level, args) {
    const log = {
      id: Date.now() + Math.random(),
      level,
      message: args.map(arg => {
        if (typeof arg === 'object') {
          try {
            return JSON.stringify(arg, null, 2);
          } catch {
            return String(arg);
          }
        }
        return String(arg);
      }).join(' '),
      timestamp: new Date().toISOString(),
      stack: new Error().stack
    };

    consoleLogs.push(log);
    if (consoleLogs.length > maxLogs) {
      consoleLogs.shift();
    }

    updateConsoleDisplay();
  }

  console.log = function(...args) {
    captureLog('log', args);
    originalLog.apply(console, args);
  };

  console.error = function(...args) {
    captureLog('error', args);
    originalError.apply(console, args);
  };

  console.warn = function(...args) {
    captureLog('warn', args);
    originalWarn.apply(console, args);
  };

  console.info = function(...args) {
    captureLog('info', args);
    originalInfo.apply(console, args);
  };

  console.debug = function(...args) {
    captureLog('debug', args);
    originalDebug.apply(console, args);
  };

  window.addEventListener('error', (e) => {
    captureLog('error', [`Uncaught Error: ${e.message}`, e.filename, e.lineno, e.colno]);
  });

  window.addEventListener('unhandledrejection', (e) => {
    captureLog('error', [`Unhandled Promise Rejection: ${e.reason}`]);
  });

  renderConsole(panel);
}

function renderConsole(panel) {
  const container = document.createElement('div');
  container.style.cssText = 'height: 100%; display: flex; flex-direction: column;';

  const controls = document.createElement('div');
  controls.style.cssText = `
    display: flex;
    gap: 8px;
    padding: 12px;
    border-bottom: 1px solid var(--analyzer-border, rgba(0, 0, 0, 0.1));
  `;

  const clearBtn = document.createElement('button');
  clearBtn.textContent = 'Clear';
  clearBtn.style.cssText = `
    padding: 6px 12px;
    border: 1px solid var(--analyzer-border, rgba(0, 0, 0, 0.1));
    border-radius: 4px;
    background: var(--analyzer-bg, #fff);
    cursor: pointer;
    font-size: 12px;
  `;
  clearBtn.addEventListener('click', () => {
    consoleLogs.length = 0;
    updateConsoleDisplay();
  });

  const exportBtn = document.createElement('button');
  exportBtn.textContent = 'Export';
  exportBtn.style.cssText = clearBtn.style.cssText;
  exportBtn.addEventListener('click', () => {
    exportLogs();
  });

  const filterSelect = document.createElement('select');
  filterSelect.style.cssText = clearBtn.style.cssText;
  filterSelect.innerHTML = '<option value="all">All</option><option value="log">Log</option><option value="error">Error</option><option value="warn">Warn</option><option value="info">Info</option><option value="debug">Debug</option>';
  filterSelect.addEventListener('change', () => {
    updateConsoleDisplay();
  });

  controls.appendChild(clearBtn);
  controls.appendChild(exportBtn);
  controls.appendChild(filterSelect);

  const logContainer = document.createElement('div');
  logContainer.id = 'console-logs';
  logContainer.style.cssText = `
    flex: 1;
    overflow-y: auto;
    padding: 8px;
    font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
    font-size: 12px;
  `;

  container.appendChild(controls);
  container.appendChild(logContainer);
  panel.appendChild(container);

  updateConsoleDisplay();
}

function updateConsoleDisplay() {
  const container = document.getElementById('console-logs');
  if (!container) return;

  const filter = document.querySelector('select')?.value || 'all';
  const filtered = filter === 'all' ? consoleLogs : consoleLogs.filter(log => log.level === filter);

  container.innerHTML = '';

  filtered.forEach(log => {
    const logEl = document.createElement('div');
    logEl.style.cssText = `
      padding: 4px 8px;
      margin-bottom: 2px;
      border-left: 3px solid ${getLogColor(log.level)};
      background: ${getLogBackground(log.level)};
      word-break: break-word;
    `;

    const timestamp = document.createElement('span');
    timestamp.textContent = new Date(log.timestamp).toLocaleTimeString();
    timestamp.style.cssText = 'color: var(--analyzer-text-secondary, #999); margin-right: 8px; font-size: 11px;';

    const level = document.createElement('span');
    level.textContent = `[${log.level.toUpperCase()}]`;
    level.style.cssText = `color: ${getLogColor(log.level)}; margin-right: 8px; font-weight: 600;`;

    const message = document.createElement('span');
    message.textContent = log.message;
    message.style.cssText = 'color: var(--analyzer-text, #333);';

    logEl.appendChild(timestamp);
    logEl.appendChild(level);
    logEl.appendChild(message);
    container.appendChild(logEl);
  });

  container.scrollTop = container.scrollHeight;
}

function getLogColor(level) {
  const colors = {
    log: '#2196F3',
    error: '#f44336',
    warn: '#ff9800',
    info: '#4caf50',
    debug: '#9e9e9e'
  };
  return colors[level] || '#666';
}

function getLogBackground(level) {
  const backgrounds = {
    log: 'rgba(33, 150, 243, 0.05)',
    error: 'rgba(244, 67, 54, 0.05)',
    warn: 'rgba(255, 152, 0, 0.05)',
    info: 'rgba(76, 175, 80, 0.05)',
    debug: 'rgba(158, 158, 158, 0.05)'
  };
  return backgrounds[level] || 'transparent';
}

function exportLogs() {
  const blob = new Blob([JSON.stringify(consoleLogs, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `console-logs-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

