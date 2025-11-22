const networkRequests = [];
let requestIdCounter = 0;

export function initNetworkMonitor(panel) {
  const originalFetch = window.fetch;
  const originalXHROpen = XMLHttpRequest.prototype.open;
  const originalXHRSend = XMLHttpRequest.prototype.send;

  window.fetch = function(...args) {
    const id = requestIdCounter++;
    const url = args[0];
    const options = args[1] || {};
    const startTime = performance.now();

    const request = {
      id,
      method: options.method || 'GET',
      url: typeof url === 'string' ? url : url.url,
      status: null,
      statusText: null,
      headers: options.headers || {},
      body: options.body || null,
      startTime,
      endTime: null,
      duration: null,
      size: 0,
      type: 'fetch'
    };

    networkRequests.push(request);
    updateNetworkTable();

    return originalFetch.apply(this, args)
      .then(response => {
        request.status = response.status;
        request.statusText = response.statusText;
        request.endTime = performance.now();
        request.duration = request.endTime - request.startTime;

        const clonedResponse = response.clone();
        clonedResponse.text().then(text => {
          request.size = new Blob([text]).size;
          updateNetworkTable();
        });

        return response;
      })
      .catch(error => {
        request.status = 0;
        request.statusText = 'Error';
        request.endTime = performance.now();
        request.duration = request.endTime - request.startTime;
        updateNetworkTable();
        throw error;
      });
  };

  XMLHttpRequest.prototype.open = function(method, url, ...rest) {
    this._analyzerMethod = method;
    this._analyzerUrl = url;
    this._analyzerStartTime = performance.now();
    return originalXHROpen.apply(this, [method, url, ...rest]);
  };

  XMLHttpRequest.prototype.send = function(...args) {
    const id = requestIdCounter++;
    const request = {
      id,
      method: this._analyzerMethod || 'GET',
      url: this._analyzerUrl || '',
      status: null,
      statusText: null,
      headers: {},
      body: args[0] || null,
      startTime: this._analyzerStartTime || performance.now(),
      endTime: null,
      duration: null,
      size: 0,
      type: 'xhr'
    };

    networkRequests.push(request);
    updateNetworkTable();

    this.addEventListener('load', function() {
      request.status = this.status;
      request.statusText = this.statusText;
      request.endTime = performance.now();
      request.duration = request.endTime - request.startTime;
      request.size = this.responseText ? new Blob([this.responseText]).size : 0;
      updateNetworkTable();
    });

    this.addEventListener('error', function() {
      request.status = 0;
      request.statusText = 'Error';
      request.endTime = performance.now();
      request.duration = request.endTime - request.startTime;
      updateNetworkTable();
    });

    return originalXHRSend.apply(this, args);
  };

  renderNetworkTable(panel);
}

function renderNetworkTable(panel) {
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
    networkRequests.length = 0;
    updateNetworkTable();
  });

  const exportBtn = document.createElement('button');
  exportBtn.textContent = 'Export HAR';
  exportBtn.style.cssText = clearBtn.style.cssText;
  exportBtn.addEventListener('click', () => {
    exportToHAR();
  });

  controls.appendChild(clearBtn);
  controls.appendChild(exportBtn);

  const table = document.createElement('analyzer-table');
  table.id = 'network-table';
  table.style.cssText = 'flex: 1; overflow: auto;';

  container.appendChild(controls);
  container.appendChild(table);
  panel.appendChild(container);

  updateNetworkTable();
}

function updateNetworkTable() {
  const table = document.getElementById('network-table');
  if (!table) return;

  table.innerHTML = '';

  const header = document.createElement('div');
  header.style.cssText = `
    display: grid;
    grid-template-columns: 60px 80px 1fr 80px 100px 80px;
    gap: 8px;
    padding: 8px 12px;
    font-weight: 600;
    font-size: 12px;
    border-bottom: 1px solid var(--analyzer-border, rgba(0, 0, 0, 0.1));
    background: var(--analyzer-bg-secondary, rgba(0, 0, 0, 0.02));
    position: sticky;
    top: 0;
  `;

  header.innerHTML = '<div>Method</div><div>Status</div><div>URL</div><div>Type</div><div>Size</div><div>Time</div>';
  table.appendChild(header);

  networkRequests.forEach(req => {
    const row = document.createElement('div');
    row.style.cssText = `
      display: grid;
      grid-template-columns: 60px 80px 1fr 80px 100px 80px;
      gap: 8px;
      padding: 8px 12px;
      font-size: 12px;
      border-bottom: 1px solid var(--analyzer-border, rgba(0, 0, 0, 0.05));
      cursor: pointer;
    `;

    const statusColor = req.status >= 200 && req.status < 300 ? '#4caf50' : req.status >= 400 ? '#f44336' : '#ff9800';
    row.innerHTML = `
      <div style="font-weight: 600; color: var(--analyzer-text, #333);">${req.method}</div>
      <div style="color: ${statusColor};">${req.status || '-'}</div>
      <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${req.url}</div>
      <div>${req.type}</div>
      <div>${formatSize(req.size)}</div>
      <div>${req.duration ? req.duration.toFixed(2) + 'ms' : '-'}</div>
    `;

    row.addEventListener('click', () => {
      showRequestDetails(req);
    });

    table.appendChild(row);
  });
}

function formatSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function showRequestDetails(request) {
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80vw;
    max-width: 800px;
    max-height: 80vh;
    background: var(--analyzer-bg, #fff);
    border-radius: 8px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    z-index: 2147483648;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  `;

  const header = document.createElement('div');
  header.style.cssText = 'padding: 16px; border-bottom: 1px solid var(--analyzer-border, rgba(0, 0, 0, 0.1)); display: flex; justify-content: space-between; align-items: center;';

  const title = document.createElement('div');
  title.textContent = `${request.method} ${request.url}`;
  title.style.cssText = 'font-weight: 600; font-size: 14px;';

  const closeBtn = document.createElement('button');
  closeBtn.textContent = '×';
  closeBtn.style.cssText = 'border: none; background: transparent; font-size: 24px; cursor: pointer; width: 32px; height: 32px;';
  closeBtn.addEventListener('click', () => modal.remove());

  header.appendChild(title);
  header.appendChild(closeBtn);

  const content = document.createElement('div');
  content.style.cssText = 'padding: 16px; overflow-y: auto; flex: 1;';
  content.innerHTML = `
    <div style="margin-bottom: 16px;">
      <strong>Status:</strong> ${request.status} ${request.statusText || ''}
    </div>
    <div style="margin-bottom: 16px;">
      <strong>Duration:</strong> ${request.duration ? request.duration.toFixed(2) + 'ms' : 'N/A'}
    </div>
    <div style="margin-bottom: 16px;">
      <strong>Size:</strong> ${formatSize(request.size)}
    </div>
    <div style="margin-bottom: 16px;">
      <strong>Type:</strong> ${request.type}
    </div>
  `;

  modal.appendChild(header);
  modal.appendChild(content);
  document.body.appendChild(modal);
}

function exportToHAR() {
  const har = {
    log: {
      version: '1.2',
      creator: { name: 'Page Analyzer', version: '1.0.0' },
      entries: networkRequests.map(req => ({
        request: {
          method: req.method,
          url: req.url,
          headers: Object.entries(req.headers).map(([name, value]) => ({ name, value })),
          bodySize: req.body ? new Blob([req.body]).size : 0
        },
        response: {
          status: req.status || 0,
          statusText: req.statusText || '',
          headers: [],
          content: { size: req.size, mimeType: '' }
        },
        timings: {
          send: 0,
          wait: req.duration || 0,
          receive: 0
        }
      }))
    }
  };

  const blob = new Blob([JSON.stringify(har, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `network-${Date.now()}.har`;
  a.click();
  URL.revokeObjectURL(url);
}

