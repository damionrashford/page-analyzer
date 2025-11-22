export function initStorageInspector(panel) {
  const container = document.createElement('div');
  container.style.cssText = 'height: 100%; overflow-y: auto; padding: 16px;';

  const tabs = document.createElement('div');
  tabs.style.cssText = `
    display: flex;
    gap: 4px;
    margin-bottom: 16px;
    border-bottom: 1px solid var(--analyzer-border, rgba(0, 0, 0, 0.1));
  `;

  const tabButtons = [
    { id: 'localStorage', label: 'Local Storage' },
    { id: 'sessionStorage', label: 'Session Storage' },
    { id: 'cookies', label: 'Cookies' }
  ];

  let activeTab = 'localStorage';

  tabButtons.forEach(tab => {
    const btn = document.createElement('button');
    btn.textContent = tab.label;
    btn.style.cssText = `
      padding: 8px 16px;
      border: none;
      background: transparent;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      color: var(--analyzer-text-secondary, #666);
      font-size: 13px;
    `;

    if (tab.id === activeTab) {
      btn.style.borderBottomColor = 'var(--analyzer-primary, #0066cc)';
      btn.style.color = 'var(--analyzer-primary, #0066cc)';
    }

    btn.addEventListener('click', () => {
      activeTab = tab.id;
      tabButtons.forEach((t, i) => {
        const button = tabs.children[i];
        if (t.id === activeTab) {
          button.style.borderBottomColor = 'var(--analyzer-primary, #0066cc)';
          button.style.color = 'var(--analyzer-primary, #0066cc)';
        } else {
          button.style.borderBottomColor = 'transparent';
          button.style.color = 'var(--analyzer-text-secondary, #666)';
        }
      });
      updateStorageDisplay(content, activeTab);
    });

    tabs.appendChild(btn);
  });

  const content = document.createElement('div');
  content.id = 'storage-content';
  content.style.cssText = 'flex: 1;';

  container.appendChild(tabs);
  container.appendChild(content);
  panel.appendChild(container);

  updateStorageDisplay(content, activeTab);
}

function updateStorageDisplay(container, type) {
  container.innerHTML = '';

  if (type === 'localStorage') {
    renderLocalStorage(container);
  } else if (type === 'sessionStorage') {
    renderSessionStorage(container);
  } else if (type === 'cookies') {
    renderCookies(container);
  }
}

function renderLocalStorage(container) {
  const table = document.createElement('div');
  table.style.cssText = 'overflow-x: auto;';

  const header = document.createElement('div');
  header.style.cssText = `
    display: grid;
    grid-template-columns: 1fr 2fr 120px;
    gap: 8px;
    padding: 8px 12px;
    font-weight: 600;
    font-size: 12px;
    border-bottom: 1px solid var(--analyzer-border, rgba(0, 0, 0, 0.1));
    background: var(--analyzer-bg-secondary, rgba(0, 0, 0, 0.02));
  `;
  header.innerHTML = '<div>Key</div><div>Value</div><div>Actions</div>';
  table.appendChild(header);

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);

    const row = document.createElement('div');
    row.style.cssText = `
      display: grid;
      grid-template-columns: 1fr 2fr 120px;
      gap: 8px;
      padding: 8px 12px;
      font-size: 12px;
      border-bottom: 1px solid var(--analyzer-border, rgba(0, 0, 0, 0.05));
      align-items: center;
    `;

    const keyEl = document.createElement('div');
    keyEl.textContent = key;
    keyEl.style.cssText = 'font-weight: 600; color: var(--analyzer-text, #333);';

    const valueEl = document.createElement('div');
    valueEl.textContent = value;
    valueEl.style.cssText = 'overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--analyzer-text, #333);';

    const actions = document.createElement('div');
    actions.style.cssText = 'display: flex; gap: 4px;';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.style.cssText = `
      padding: 4px 8px;
      border: 1px solid var(--analyzer-border, rgba(0, 0, 0, 0.1));
      border-radius: 4px;
      background: var(--analyzer-bg, #fff);
      cursor: pointer;
      font-size: 11px;
    `;
    editBtn.addEventListener('click', () => editStorageItem('localStorage', key, value));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.style.cssText = editBtn.style.cssText;
    deleteBtn.addEventListener('click', () => {
      localStorage.removeItem(key);
      renderLocalStorage(container);
    });

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    row.appendChild(keyEl);
    row.appendChild(valueEl);
    row.appendChild(actions);
    table.appendChild(row);
  }

  if (localStorage.length === 0) {
    const empty = document.createElement('div');
    empty.textContent = 'No items in localStorage';
    empty.style.cssText = 'padding: 16px; text-align: center; color: var(--analyzer-text-secondary, #999);';
    table.appendChild(empty);
  }

  container.appendChild(table);
}

function renderSessionStorage(container) {
  const table = document.createElement('div');
  table.style.cssText = 'overflow-x: auto;';

  const header = document.createElement('div');
  header.style.cssText = `
    display: grid;
    grid-template-columns: 1fr 2fr 120px;
    gap: 8px;
    padding: 8px 12px;
    font-weight: 600;
    font-size: 12px;
    border-bottom: 1px solid var(--analyzer-border, rgba(0, 0, 0, 0.1));
    background: var(--analyzer-bg-secondary, rgba(0, 0, 0, 0.02));
  `;
  header.innerHTML = '<div>Key</div><div>Value</div><div>Actions</div>';
  table.appendChild(header);

  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    const value = sessionStorage.getItem(key);

    const row = document.createElement('div');
    row.style.cssText = `
      display: grid;
      grid-template-columns: 1fr 2fr 120px;
      gap: 8px;
      padding: 8px 12px;
      font-size: 12px;
      border-bottom: 1px solid var(--analyzer-border, rgba(0, 0, 0, 0.05));
      align-items: center;
    `;

    const keyEl = document.createElement('div');
    keyEl.textContent = key;
    keyEl.style.cssText = 'font-weight: 600; color: var(--analyzer-text, #333);';

    const valueEl = document.createElement('div');
    valueEl.textContent = value;
    valueEl.style.cssText = 'overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--analyzer-text, #333);';

    const actions = document.createElement('div');
    actions.style.cssText = 'display: flex; gap: 4px;';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.style.cssText = `
      padding: 4px 8px;
      border: 1px solid var(--analyzer-border, rgba(0, 0, 0, 0.1));
      border-radius: 4px;
      background: var(--analyzer-bg, #fff);
      cursor: pointer;
      font-size: 11px;
    `;
    editBtn.addEventListener('click', () => editStorageItem('sessionStorage', key, value));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.style.cssText = editBtn.style.cssText;
    deleteBtn.addEventListener('click', () => {
      sessionStorage.removeItem(key);
      renderSessionStorage(container);
    });

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    row.appendChild(keyEl);
    row.appendChild(valueEl);
    row.appendChild(actions);
    table.appendChild(row);
  }

  if (sessionStorage.length === 0) {
    const empty = document.createElement('div');
    empty.textContent = 'No items in sessionStorage';
    empty.style.cssText = 'padding: 16px; text-align: center; color: var(--analyzer-text-secondary, #999);';
    table.appendChild(empty);
  }

  container.appendChild(table);
}

function renderCookies(container) {
  const cookies = document.cookie.split(';').map(c => {
    const [key, ...valueParts] = c.trim().split('=');
    return { key, value: valueParts.join('=') };
  }).filter(c => c.key);

  const table = document.createElement('div');
  table.style.cssText = 'overflow-x: auto;';

  const header = document.createElement('div');
  header.style.cssText = `
    display: grid;
    grid-template-columns: 1fr 2fr 120px;
    gap: 8px;
    padding: 8px 12px;
    font-weight: 600;
    font-size: 12px;
    border-bottom: 1px solid var(--analyzer-border, rgba(0, 0, 0, 0.1));
    background: var(--analyzer-bg-secondary, rgba(0, 0, 0, 0.02));
  `;
  header.innerHTML = '<div>Name</div><div>Value</div><div>Actions</div>';
  table.appendChild(header);

  cookies.forEach(cookie => {
    const row = document.createElement('div');
    row.style.cssText = `
      display: grid;
      grid-template-columns: 1fr 2fr 120px;
      gap: 8px;
      padding: 8px 12px;
      font-size: 12px;
      border-bottom: 1px solid var(--analyzer-border, rgba(0, 0, 0, 0.05));
      align-items: center;
    `;

    const keyEl = document.createElement('div');
    keyEl.textContent = cookie.key;
    keyEl.style.cssText = 'font-weight: 600; color: var(--analyzer-text, #333);';

    const valueEl = document.createElement('div');
    valueEl.textContent = cookie.value;
    valueEl.style.cssText = 'overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--analyzer-text, #333);';

    const actions = document.createElement('div');
    actions.style.cssText = 'display: flex; gap: 4px;';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.style.cssText = `
      padding: 4px 8px;
      border: 1px solid var(--analyzer-border, rgba(0, 0, 0, 0.1));
      border-radius: 4px;
      background: var(--analyzer-bg, #fff);
      cursor: pointer;
      font-size: 11px;
    `;
    deleteBtn.addEventListener('click', () => {
      document.cookie = `${cookie.key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      renderCookies(container);
    });

    actions.appendChild(deleteBtn);

    row.appendChild(keyEl);
    row.appendChild(valueEl);
    row.appendChild(actions);
    table.appendChild(row);
  });

  if (cookies.length === 0) {
    const empty = document.createElement('div');
    empty.textContent = 'No cookies';
    empty.style.cssText = 'padding: 16px; text-align: center; color: var(--analyzer-text-secondary, #999);';
    table.appendChild(empty);
  }

  container.appendChild(table);
}

function editStorageItem(type, key, currentValue) {
  const newValue = prompt(`Edit ${key}:`, currentValue);
  if (newValue !== null) {
    if (type === 'localStorage') {
      localStorage.setItem(key, newValue);
    } else if (type === 'sessionStorage') {
      sessionStorage.setItem(key, newValue);
    }
    const container = document.getElementById('storage-content');
    if (container) {
      updateStorageDisplay(container, type);
    }
  }
}

